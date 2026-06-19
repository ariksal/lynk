"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";

export function JoinButton({ communityName }: { communityName: string }) {
  const [joined, setJoined] = useState(false);
  const toast = useToast();

  return (
    <button
      onClick={() => {
        const next = !joined;
        setJoined(next);
        toast(
          next ? `You joined ${communityName}` : `You left ${communityName}`
        );
      }}
      className={`press mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold transition-colors ${
        joined
          ? "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
          : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
      }`}
    >
      {joined ? (
        <>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-[var(--success)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 4.5 4.5L19 7" />
          </svg>
          Joined
        </>
      ) : (
        "Join community"
      )}
    </button>
  );
}
