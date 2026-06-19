// Shown instantly while an app page loads — skeleton screens beat a frozen or
// blank UI. Sits inside the shell, so the top/bottom bars stay put.
export default function Loading() {
  return (
    <div className="px-4 py-5">
      <div className="skeleton h-7 w-40" />
      <div className="skeleton mt-2 h-4 w-64" />
      <div className="mt-5 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="skeleton h-12 w-12 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
