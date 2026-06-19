import Link from "next/link";
import {
  DEMO_COMMUNITIES,
  isSupabaseConfigured,
  type DemoCommunity,
  type CommunityKind,
} from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import { SearchIcon, UsersIcon, BuildingIcon } from "@/components/icons";

const TABS: { key: string; label: string; kind: CommunityKind | "todas" }[] = [
  { key: "todas", label: "Todas", kind: "todas" },
  { key: "tnuot", label: "Tnuot", kind: "tnua" },
  { key: "escuelas", label: "Escuelas", kind: "escuela" },
  { key: "grupos", label: "Grupos", kind: "grupo" },
];

const HINTS: Record<string, string> = {
  todas: "Toda tu comunidad en un solo lugar.",
  tnuot: "Movimientos juveniles — encuentra tu tnuá y tu kvutzá.",
  escuelas: "Colegios y su vida comunitaria.",
  grupos: "Grupos creados por la comunidad: voluntariado, juegos, liderazgo.",
};

async function getCommunities(): Promise<{
  communities: DemoCommunity[];
  live: boolean;
}> {
  if (!isSupabaseConfigured()) {
    return { communities: DEMO_COMMUNITIES, live: false };
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("communities")
      .select("slug, name, description, category, kind, color, tags, location")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) {
      return { communities: DEMO_COMMUNITIES, live: false };
    }
    return { communities: data as DemoCommunity[], live: true };
  } catch {
    return { communities: DEMO_COMMUNITIES, live: false };
  }
}

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const active = TABS.find((t) => t.key === view) ?? TABS[0];

  const { communities, live } = await getCommunities();
  const list =
    active.kind === "todas"
      ? communities
      : communities.filter((c) => c.kind === active.kind);

  return (
    <div className="px-4 py-4">
      <h1 className="font-display text-2xl font-bold tracking-tight">Explorar</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Encuentra a tu gente — por quién eres, no por seguidores.
      </p>

      {/* Búsqueda */}
      <div className="relative mt-4">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" />
        <input
          placeholder="Busca tnuot, escuelas, grupos…"
          className="lynk-input !rounded-full !pl-10"
          aria-label="Buscar"
        />
      </div>

      {/* Filtros por tipo */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => {
          const on = t.key === active.key;
          return (
            <Link
              key={t.key}
              href={`/discover?view=${t.key}`}
              className={`press shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                on
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary-hover)]"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-[var(--muted)]">{HINTS[active.key]}</p>

      {!live && (
        <p className="mt-3 rounded-xl bg-[var(--primary-soft)] px-4 py-2 text-xs text-[var(--primary-hover)]">
          Datos de ejemplo. Conecta Supabase para usar datos reales.
        </p>
      )}

      {/* Tarjetas — teñidas por el color de la tnuá/institución */}
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
                <div className="min-w-0">
                  <h2 className="truncate font-bold">{c.name}</h2>
                  <p className="mt-0.5 line-clamp-2 text-sm text-[var(--muted)]">
                    {c.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span
                      className="rounded-full px-2 py-0.5 font-semibold"
                      style={{ background: `${c.color}1a`, color: c.color }}
                    >
                      {c.category}
                    </span>
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
      </ul>
    </div>
  );
}
