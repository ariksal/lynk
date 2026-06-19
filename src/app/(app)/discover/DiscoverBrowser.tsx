"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { DemoCommunity, CommunityKind } from "@/lib/demo-data";
import { SearchIcon, UsersIcon, BuildingIcon } from "@/components/icons";

const TABS: { key: string; label: string; kind: CommunityKind | "todas" }[] = [
  { key: "todas", label: "Todas", kind: "todas" },
  { key: "tnuot", label: "Tnuot", kind: "tnua" },
  { key: "escuelas", label: "Escuelas", kind: "escuela" },
  { key: "instituciones", label: "Instituciones", kind: "institucion" },
  { key: "grupos", label: "Grupos", kind: "grupo" },
];

const HINTS: Record<string, string> = {
  todas: "Toda tu comunidad en un solo lugar.",
  tnuot: "Movimientos juveniles — encuentra tu tnuá y tu kvutzá.",
  escuelas: "Colegios y su vida comunitaria.",
  instituciones: "Kehilot y organizaciones de la comunidad.",
  grupos: "Grupos creados por la comunidad: voluntariado, juegos, liderazgo.",
};

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function DiscoverBrowser({
  communities,
  live,
}: {
  communities: DemoCommunity[];
  live: boolean;
}) {
  const [tab, setTab] = useState("todas");
  const [query, setQuery] = useState("");

  const active = TABS.find((t) => t.key === tab) ?? TABS[0];

  const list = useMemo(() => {
    const q = norm(query.trim());
    return communities.filter((c) => {
      const matchesKind = active.kind === "todas" || c.kind === active.kind;
      if (!matchesKind) return false;
      if (!q) return true;
      const haystack = norm(
        `${c.name} ${c.description} ${c.category} ${c.location} ${c.tags.join(" ")}`
      );
      return haystack.includes(q);
    });
  }, [communities, active.kind, query]);

  return (
    <div className="px-4 py-4">
      <h1 className="font-display text-2xl font-bold tracking-tight">Explorar</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Encuentra a tu gente — por quién eres, no por seguidores.
      </p>

      {/* Búsqueda funcional */}
      <div className="relative mt-4">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca tnuot, escuelas, grupos…"
          className="lynk-input !rounded-full !pl-10 !pr-9"
          aria-label="Buscar"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
            className="press absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros por tipo */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => {
          const on = t.key === tab;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`press shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                on
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary-hover)]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-[var(--muted)]">{HINTS[active.key]}</p>

      {!live && (
        <p className="mt-3 rounded-xl bg-[var(--primary-soft)] px-4 py-2 text-xs text-[var(--primary-hover)]">
          Datos de ejemplo. Conecta Supabase para usar datos reales.
        </p>
      )}

      {/* Resultados */}
      <ul className="mt-4 space-y-3">
        {list.map((c) => {
          const isInstitution = c.kind !== "grupo";
          return (
            <li key={c.slug}>
              <Link
                href={`/communities/${c.slug}`}
                className="press lynk-card flex gap-3 p-4 transition-colors hover:border-[var(--primary)]"
                style={{ borderLeft: `4px solid ${c.color}` }}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center font-bold text-white ${
                    isInstitution ? "rounded-xl" : "rounded-2xl"
                  }`}
                  style={{ background: c.color }}
                  aria-hidden
                >
                  {c.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-bold">{c.name}</h2>
                  <p className="mt-0.5 line-clamp-2 text-sm text-[var(--muted)]">
                    {c.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                    <span
                      className="rounded-full px-2 py-0.5 font-semibold"
                      style={{ background: `${c.color}1a`, color: c.color }}
                    >
                      {c.category}
                    </span>
                    {c.mutualFriends > 0 && (
                      <span className="flex items-center gap-1 font-semibold text-[var(--primary)]">
                        <UsersIcon className="h-3.5 w-3.5" />
                        {c.mutualFriends}{" "}
                        {c.mutualFriends === 1 ? "amigo aquí" : "amigos aquí"}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      {isInstitution ? (
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
          );
        })}
        {list.length === 0 && (
          <li className="py-12 text-center text-sm text-[var(--muted)]">
            No encontramos nada para “{query}”. Prueba otra búsqueda.
          </li>
        )}
      </ul>
    </div>
  );
}
