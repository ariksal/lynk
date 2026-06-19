import Link from "next/link";
import { MessageIcon, HeartHandIcon } from "@/components/icons";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/95 px-4 backdrop-blur">
      <Link
        href="/feed"
        className="font-display text-2xl font-extrabold tracking-tight text-[var(--primary)]"
      >
        LYNK
      </Link>
      <div className="flex items-center gap-1 text-[var(--foreground)]">
        <button
          aria-label="Saved communities"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[var(--primary-soft)]"
        >
          <HeartHandIcon className="h-6 w-6" />
        </button>
        <Link
          href="/messages"
          aria-label="Messages"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[var(--primary-soft)]"
        >
          <MessageIcon className="h-6 w-6" />
        </Link>
      </div>
    </header>
  );
}
