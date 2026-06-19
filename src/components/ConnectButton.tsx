"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import { UserPlusIcon } from "@/components/icons";

export function ConnectButton({ name }: { name: string }) {
  const [requested, setRequested] = useState(false);
  const toast = useToast();

  return (
    <button
      onClick={() => {
        if (requested) return;
        setRequested(true);
        toast(`Request sent to ${name.split(" ")[0]}`);
      }}
      disabled={requested}
      className={`press flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
        requested
          ? "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"
          : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
      }`}
    >
      {requested ? (
        "Requested"
      ) : (
        <>
          <UserPlusIcon className="h-4 w-4" />
          Connect
        </>
      )}
    </button>
  );
}
