import Link from "next/link";
import { DEMO_MY_GROUPS } from "@/lib/demo-data";
import { GroupsIcon, BuildingIcon, UsersIcon, ShieldIcon } from "@/components/icons";

const KIND_LABEL: Record<string, string> = {
  tnua: "Tnuá",
  escuela: "Escuela",
  institucion: "Institución",
  grupo: "Grupo",
};

export default function MyGroupsPage() {
  const groups = DEMO_MY_GROUPS;

  return (
    <div className="px-4 py-4">
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Mis grupos
      </h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Las comunidades donde perteneces y tu nivel en cada una.
      </p>

      <ul className="mt-5 space-y-3">
        {groups.map((g) => {
          const isInstitution = g.kind !== "grupo";
          return (
            <li key={g.slug}>
              <Link
                href={`/communities/${g.slug}`}
                className="press lynk-card flex items-center gap-3 p-4 transition-colors hover:border-[var(--primary)]"
                style={{ borderLeft: `4px solid ${g.color}` }}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center font-bold text-white ${
                    isInstitution ? "rounded-xl" : "rounded-2xl"
                  }`}
                  style={{ background: g.color }}
                  aria-hidden
                >
                  {g.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate font-bold">{g.name}</h2>
                    {g.isAdmin && (
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[0.65rem] font-bold text-[var(--accent)]">
                        <ShieldIcon className="h-3 w-3" /> Admin
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      {isInstitution ? (
                        <BuildingIcon className="h-3.5 w-3.5" />
                      ) : (
                        <UsersIcon className="h-3.5 w-3.5" />
                      )}
                      {KIND_LABEL[g.kind]}
                    </span>
                    <span>·</span>
                    <span
                      className="rounded-full px-2 py-0.5 font-semibold"
                      style={{ background: `${g.color}1a`, color: g.color }}
                    >
                      {g.myTier}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/discover"
        className="press mt-5 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] py-4 text-sm font-semibold text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        <GroupsIcon className="h-5 w-5" /> Explorar más comunidades
      </Link>
    </div>
  );
}
