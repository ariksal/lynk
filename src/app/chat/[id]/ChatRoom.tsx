"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  avatarTint,
  type Conversation,
  type ChatMessage,
} from "@/lib/demo-data";
import {
  ChevronLeftIcon,
  UserIcon,
  ImageIcon,
  SendIcon,
  MoreIcon,
  FlagIcon,
  NoEntryIcon,
  ShieldIcon,
} from "@/components/icons";
import { useToast } from "@/components/Toast";

// Until a request is accepted, the sender may send at most this many messages.
const MESSAGE_LIMIT = 2;

export function ChatRoom({ conversation }: { conversation: Conversation }) {
  const router = useRouter();
  const toast = useToast();
  const tint = avatarTint(conversation.personName);

  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(conversation.isPending);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sentCount = messages.filter((m) => m.type === "sent").length;
  // LYNK's consent rule: you may send at most MESSAGE_LIMIT messages to someone
  // who has NOT replied to you yet. Once they reply, the cap lifts. This
  // throttles unsolicited strangers; it never limits a real back-and-forth.
  // (Note: this UI cap is the demo behavior — when wired to Supabase it must be
  //  enforced in RLS, since client state resets on refresh.)
  const theyReplied = messages.some((m) => m.type === "received");
  const atLimit = !theyReplied && sentCount >= MESSAGE_LIMIT;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const firstName = conversation.personName.split(" ")[0];

  // Demo behavior — block/report give real, immediate feedback. When wired to
  // Supabase these must persist (blocks/reports tables) and enforce both-way
  // invisibility in RLS; the toast is the acknowledgement, not the enforcement.
  function handleReport() {
    setMenuOpen(false);
    toast(`Gracias — recibimos tu reporte sobre ${firstName}.`);
  }
  function handleBlock() {
    setMenuOpen(false);
    toast(`Bloqueaste a ${firstName}. Ya no podrá contactarte.`);
    router.push("/messages");
  }

  function handleSend() {
    const text = input.trim();
    if (!text || atLimit) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `s${Date.now()}`,
        type: "sent",
        content: text,
        timestamp: "Now",
      },
    ]);
    setInput("");
  }

  return (
    <>
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
        <button
          onClick={() => router.push("/messages")}
          aria-label="Atrás"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--primary-soft)]"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="relative shrink-0">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: tint }}
              aria-hidden
            >
              {conversation.personName.charAt(0).toUpperCase()}
            </span>
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--surface)] bg-[var(--success)]" />
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold leading-tight">
              {conversation.personName}
            </p>
            <p
              className={`text-xs ${
                conversation.isOnline
                  ? "text-[var(--success)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {conversation.isOnline ? "En línea" : "Última vez hace 3h"}
            </p>
          </div>
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Opciones de conversación"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="press flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground)] hover:bg-[var(--primary-soft)]"
          >
            <MoreIcon className="h-5 w-5" />
          </button>

          {menuOpen && (
            <>
              <button
                aria-hidden
                tabIndex={-1}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-10 cursor-default"
              />
              <div
                role="menu"
                className="animate-in absolute right-0 top-11 z-20 w-56 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-1 shadow-xl"
              >
                <span className="flex items-center gap-2 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  <UserIcon className="h-3.5 w-3.5" /> {conversation.personName}
                </span>
                <button
                  role="menuitem"
                  onClick={handleReport}
                  className="press flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-[var(--background)]"
                >
                  <FlagIcon className="h-5 w-5 text-[var(--muted)]" />
                  Reportar a esta persona
                </button>
                <button
                  role="menuitem"
                  onClick={handleBlock}
                  className="press flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  <NoEntryIcon className="h-5 w-5" />
                  Bloquear a {firstName}
                </button>
                <Link
                  role="menuitem"
                  href="/safety"
                  onClick={() => setMenuOpen(false)}
                  className="press flex w-full items-center gap-3 border-t border-[var(--border)] px-3 py-2.5 text-left text-sm hover:bg-[var(--background)]"
                >
                  <ShieldIcon className="h-5 w-5 text-[var(--primary)]" />
                  Recursos de seguridad
                </Link>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[var(--background)]">
        {/* Request bar */}
        {pending && (
          <div className="m-4 rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] p-4">
            <p className="text-sm leading-5 text-[var(--foreground)]">
              <span className="font-semibold">{conversation.personName}</span>{" "}
              quiere iniciar una conversación contigo.
            </p>
            <div className="mt-3 flex gap-2.5">
              <button
                onClick={() => setPending(false)}
                className="flex-1 cursor-pointer rounded-full bg-[var(--success)] py-2.5 text-sm font-semibold text-white"
              >
                Aceptar conversación
              </button>
              <button
                onClick={() => router.push("/messages")}
                className="flex-1 cursor-pointer rounded-full border border-[var(--border)] py-2.5 text-sm font-semibold text-[var(--muted)]"
              >
                Ignorar
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 p-4">
          {messages.map((m) => {
            const sent = m.type === "sent";
            return (
              <div
                key={m.id}
                className={`flex ${sent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 ${
                    sent
                      ? "rounded-2xl rounded-br-md bg-[var(--primary)] text-white"
                      : "rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
                  }`}
                >
                  <p className="text-[15px] leading-[21px]">{m.content}</p>
                  <p
                    className={`mt-1 text-[11px] ${
                      sent ? "text-white/70" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {m.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
        {atLimit ? (
          <p className="py-2 text-center text-[13px] text-[var(--accent)]">
            Enviaste {MESSAGE_LIMIT} mensajes. Espera a que {firstName}
            responda.
          </p>
        ) : (
          <div className="flex items-center gap-2.5">
            <button
              aria-label="Agregar imagen"
              className="flex h-9 w-9 shrink-0 items-center justify-center text-[var(--text-muted)]"
            >
              <ImageIcon className="h-[22px] w-[22px]" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe un mensaje…"
              className="flex-1 rounded-3xl bg-[var(--background)] px-4 py-2.5 text-[15px] outline-none placeholder:text-[var(--text-muted)]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Enviar"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                input.trim()
                  ? "cursor-pointer bg-[var(--primary)] text-white"
                  : "bg-[var(--background)] text-[var(--text-muted)]"
              }`}
            >
              <SendIcon className="h-[18px] w-[18px]" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
