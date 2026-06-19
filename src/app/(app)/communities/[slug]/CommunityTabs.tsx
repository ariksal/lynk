"use client";

import { useState } from "react";
import { avatarTint, type DemoPost } from "@/lib/demo-data";
import { useToast } from "@/components/Toast";
import { SendIcon } from "@/components/icons";

function PostRow({ p }: { p: DemoPost }) {
  return (
    <li className="border-b border-[var(--border)] px-4 py-4">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ background: avatarTint(p.author) }}
          aria-hidden
        >
          {p.author.charAt(0).toUpperCase()}
        </span>
        <span className="text-sm font-semibold">{p.author}</span>
        {p.ago && <span className="text-xs text-[var(--muted)]">· {p.ago}</span>}
      </div>
      <p className="mt-2 pl-[2.9rem] text-sm leading-relaxed">{p.body}</p>
    </li>
  );
}

export function CommunityTabs({
  news,
  wall,
  color,
}: {
  news: DemoPost[];
  wall: DemoPost[];
  color: string;
}) {
  const [tab, setTab] = useState<"noticias" | "muro">("noticias");
  const [posts, setPosts] = useState<DemoPost[]>(wall);
  const [draft, setDraft] = useState("");
  const toast = useToast();

  function publish() {
    const body = draft.trim();
    if (!body) return;
    setPosts((prev) => [
      { id: `me${Date.now()}`, author: "Tú", body, ago: "ahora" },
      ...prev,
    ]);
    setDraft("");
    toast("Publicaste en el muro");
  }

  return (
    <div className="mt-6">
      {/* Selector de sección */}
      <div className="flex border-y border-[var(--border)]">
        {(
          [
            { key: "noticias", label: "Noticias" },
            { key: "muro", label: "Muro" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="press relative flex-1 py-3 text-sm font-semibold transition-colors"
            style={{ color: tab === t.key ? color : "var(--text-muted)" }}
          >
            {t.label}
            {tab === t.key && (
              <span
                className="absolute inset-x-6 bottom-0 h-0.5 rounded-full"
                style={{ background: color }}
              />
            )}
          </button>
        ))}
      </div>

      {tab === "noticias" ? (
        <>
          <p className="bg-[var(--background)] px-4 py-2 text-xs text-[var(--muted)]">
            📢 Solo el equipo de la comunidad publica aquí.
          </p>
          <ul>
            {news.map((p) => (
              <PostRow key={p.id} p={p} />
            ))}
          </ul>
        </>
      ) : (
        <>
          {/* Todos pueden escribir su opinión */}
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && publish()}
              placeholder="Escribe tu opinión…"
              className="lynk-input !rounded-full"
            />
            <button
              onClick={publish}
              disabled={!draft.trim()}
              aria-label="Publicar"
              className="press flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-40"
              style={{ background: color }}
            >
              <SendIcon className="h-[18px] w-[18px]" />
            </button>
          </div>
          <ul>
            {posts.map((p) => (
              <PostRow key={p.id} p={p} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
