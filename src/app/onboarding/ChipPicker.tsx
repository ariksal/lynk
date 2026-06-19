"use client";

import { useState } from "react";

export function ChipPicker({
  name,
  options,
  hint,
  initial = [],
}: {
  name: string;
  options: string[];
  hint: string;
  // Pre-selected values — lets the edit form start from the user's real data
  // instead of blank (which would wipe interests/values on save).
  initial?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(initial);

  function toggle(option: string) {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  }

  // Any custom values the user already had that aren't in the preset options,
  // so editing never silently drops them.
  const extras = selected.filter((s) => !options.includes(s));
  const allOptions = [...options, ...extras];

  return (
    <div>
      <p className="mb-2 text-xs text-[var(--muted)]">{hint}</p>
      <div className="flex flex-wrap gap-2">
        {allOptions.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              type="button"
              key={o}
              onClick={() => toggle(o)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                on
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={selected.join(",")} />
    </div>
  );
}
