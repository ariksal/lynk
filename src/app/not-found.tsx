import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-1 flex-col items-center justify-center bg-[var(--surface)] px-8 text-center">
      <span className="font-display text-5xl font-extrabold text-[var(--primary)]">
        LYNK
      </span>
      <p className="mt-6 text-lg font-bold">We couldn&apos;t find that page</p>
      <p className="mt-1 text-sm text-[var(--muted)]">
        The link may be broken, or the page may have moved.
      </p>
      <Link href="/feed" className="lynk-btn press mt-6 px-6 py-3">
        Back home
      </Link>
    </main>
  );
}
