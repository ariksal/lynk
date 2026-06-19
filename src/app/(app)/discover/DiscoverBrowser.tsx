"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { categoryLabel } from "@/lib/categories";
import { avatarTint, type DemoCommunity } from "@/lib/demo-data";
import { SearchIcon, UsersIcon, BuildingIcon } from "@/components/icons";

export function DiscoverBrowser({
  communities,
}: {
  communities: DemoCommunity[];
}) {
  const [tab, setTab] = useState<"group" | "institution">("group");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return communities.filter((c) => {
      if (c.kind !== tab) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.location.toLowerCase().includes(q)
      );
    });
  }, [communities, tab, query]);

  return (
    <>
      {/* Search */}
      <div className="relative mt-4">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search groups, institutions, causes…"
          aria-label="Search"
          className="lynk-input !rounded-full !pl-10"
        />
      </div>

      {/* Segmented toggle */}
      <div className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-[var(--background)] p-1">
        {(
          [
            { key: "group", label: "Groups", Icon: UsersIcon },
            { key: "institution", label: "Institutions", Icon: BuildingIcon },
          ] as const
        ).map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`press flex items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition-colors ${
              tab === key
                ? "bg-[var(--surface)] text-[var(--primary)] shadow-sm"
                : "text-[var(--muted)]"
            }`}
          >
            <Icon className="h-4 w-4" filled={tab === key} />
            {label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-[var(--muted)]">
        {tab === "group"
          ? "Informal communities run by people like you."
          : "Organizations, nonprofits & civic spaces to get involved with."}
      </p>

      {/* Results */}
      {results.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {results.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/communities/${c.slug}`}
                className="press lynk-card flex gap-3 p-4 transition-colors hover:border-[var(--primary)]"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center font-bold text-white ${
                    tab === "institution" ? "rounded-xl" : "rounded-2xl"
                  }`}
                  style={{ background: avatarTint(c.name) }}
                  aria-hidden
                >
                  {c.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-bold">{c.name}</h2>
                  <p className="mt-0.5 line-clamp-2 text-sm text-[var(--muted)]">
                    {c.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span className="lynk-tag">{categoryLabel(c.category)}</span>
                    <span className="flex items-center gap-1">
                      {tab === "institution" ? (
                        <BuildingIcon className="h-3.5 w-3.5" />
                      ) : (
                        <UsersIcon className="h-3.5 w-3.5" />
                      )}
                      {c.location}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 text-center">
          <p className="font-semibold">No matches</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Try a different search, or switch tabs.
          </p>
        </div>
      )}
    </>
  );
}
