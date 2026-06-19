"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMO_CONVERSATIONS, avatarTint, type Conversation } from "@/lib/demo-data";
import {
  PencilIcon,
  ShieldIcon,
  MessageIcon,
} from "@/components/icons";

function Avatar({ name, online }: { name: string; online: boolean }) {
  return (
    <span className="relative shrink-0">
      <span
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full text-lg font-bold text-white"
        style={{ background: avatarTint(name) }}
        aria-hidden
      >
        {name.charAt(0).toUpperCase()}
      </span>
      {online && (
        <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-[2.5px] border-[var(--surface)] bg-[var(--success)]" />
      )}
    </span>
  );
}

function Row({ c }: { c: Conversation }) {
  const unread = c.unreadCount > 0;
  return (
    <Link
      href={`/chat/${c.personId}`}
      className="flex cursor-pointer items-center gap-3.5 rounded-[18px] bg-[var(--surface)] px-4 py-3.5 shadow-sm transition-colors hover:bg-[var(--primary-soft)]/40"
    >
      <Avatar name={c.personName} online={c.isOnline} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className={`truncate ${
              unread ? "font-bold text-[var(--foreground)]" : "font-medium text-[var(--foreground)]"
            }`}
          >
            {c.personName}
          </p>
          {c.isPending && (
            <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[0.68rem] font-semibold text-[var(--accent)]">
              New
            </span>
          )}
        </div>
        <p
          className={`mt-0.5 truncate text-sm ${
            unread ? "text-[var(--foreground)]" : "text-[var(--muted)]"
          }`}
        >
          {c.lastMessage}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-xs text-[var(--text-muted)]">{c.timeAgo}</span>
        {unread ? (
          <span className="pulse flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[0.68rem] font-bold text-white">
            {c.unreadCount}
          </span>
        ) : (
          <span className="h-5" />
        )}
      </div>
    </Link>
  );
}

export default function MessagesPage() {
  const [tab, setTab] = useState<"all" | "requests">("all");

  const all = DEMO_CONVERSATIONS.filter((c) => !c.isPending);
  const pending = DEMO_CONVERSATIONS.filter((c) => c.isPending);
  const displayed = tab === "all" ? all : pending;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Messages
        </h1>
        <Link
          href="/discover"
          aria-label="New message"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-white"
        >
          <PencilIcon className="h-[18px] w-[18px]" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border)]">
        {([
          { key: "all", label: "All", count: 0 },
          { key: "requests", label: "Requests", count: pending.length },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 border-b-2 py-3 text-sm font-semibold transition-colors ${
              tab === t.key
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--text-muted)]"
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[0.6rem] font-bold text-white">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Privacy note on Requests */}
      {tab === "requests" && pending.length > 0 && (
        <div className="m-3.5 mb-0 flex items-start gap-2 rounded-2xl bg-[var(--primary-soft)] p-3.5">
          <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
          <p className="text-[13px] leading-5 text-[var(--primary)]">
            You decide who you talk to. No one knows if you ignore a message.
          </p>
        </div>
      )}

      {/* List */}
      {displayed.length > 0 ? (
        <ul className="space-y-2 p-3.5">
          {displayed.map((c) => (
            <li key={c.id}>
              <Row c={c} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
            <MessageIcon className="h-7 w-7" />
          </span>
          <p className="mt-4 font-semibold">
            {tab === "all" ? "No conversations yet" : "No requests"}
          </p>
          <p className="mt-1 max-w-xs text-sm text-[var(--muted)]">
            {tab === "all"
              ? "Find people who share your interests and say hello."
              : "Message requests from new people will show up here."}
          </p>
          {tab === "all" && (
            <Link href="/discover" className="lynk-btn mt-5 px-5 py-2.5 text-sm">
              Explore
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
