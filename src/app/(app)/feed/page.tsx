import Link from "next/link";
import {
  DEMO_FEED,
  DEMO_SUGGESTED,
  DEMO_COMMUNITIES,
  DEMO_EVENTS,
  avatarTint,
} from "@/lib/demo-data";
import {
  MessageIcon,
  UsersIcon,
  SearchIcon,
  BellIcon,
  ChevronRightIcon,
  CalendarIcon,
} from "@/components/icons";
import { PersonCard } from "@/components/PersonCard";
import { EventCard } from "@/components/EventCard";

const FILTERS = [
  { label: "Todos", href: "/feed", active: true },
  { label: "Personas", href: "/friends", active: false },
  { label: "Tnuot", href: "/discover?view=tnuot", active: false },
  { label: "Grupos", href: "/discover?view=grupos", active: false },
  { label: "Instituciones", href: "/discover?view=instituciones", active: false },
];

function SectionHeader({
  title,
  href,
  cta,
}: {
  title: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between px-4">
      <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-sm font-semibold text-[var(--primary)]"
        >
          {cta} <ChevronRightIcon className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export default function FeedPage() {
  const grupos = DEMO_COMMUNITIES.filter((c) => c.kind === "grupo").slice(0, 3);

  return (
    <div className="pb-2">
      {/* Header con gradiente + saludo (inspirado en la app móvil) */}
      <section
        className="flex items-center gap-3 px-5 py-5 text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-hover), var(--primary))",
        }}
      >
        <div className="min-w-0 flex-1">
          <p className="font-display text-2xl font-bold">¡Hola! 👋</p>
          <p className="mt-0.5 text-sm text-white/85">
            Tu comunidad te está esperando.
          </p>
        </div>
        <Link
          href="/discover"
          aria-label="Buscar"
          className="press flex h-10 w-10 items-center justify-center rounded-full bg-white/20"
        >
          <SearchIcon className="h-5 w-5" />
        </Link>
        <Link
          href="/messages"
          aria-label="Notificaciones"
          className="press flex h-10 w-10 items-center justify-center rounded-full bg-white/20"
        >
          <BellIcon className="h-5 w-5" />
        </Link>
      </section>

      {/* Chips de filtro */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => (
          <Link
            key={f.label}
            href={f.href}
            className={`press shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              f.active
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--surface)] text-[var(--muted)] shadow-sm hover:bg-[var(--primary-soft)] hover:text-[var(--primary-hover)]"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Personas para ti */}
      <section className="mb-7 mt-1">
        <SectionHeader title="Personas para ti" href="/friends" cta="Ver más" />
        <div className="flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {DEMO_SUGGESTED.map((p) => (
            <PersonCard key={p.username} person={p} horizontal />
          ))}
        </div>
      </section>

      {/* En tu comunidad (posts — sin likes, solo conversación) */}
      <section className="mb-7">
        <SectionHeader title="En tu comunidad" />
        <ul className="space-y-3 px-4">
          {DEMO_FEED.map((item) => (
            <li key={item.id} className="lynk-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-white"
                  style={{ background: avatarTint(item.author) }}
                  aria-hidden
                >
                  {item.author.charAt(0)}
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="font-bold">{item.author}</p>
                  <Link
                    href={`/communities/${item.communitySlug}`}
                    className="flex items-center gap-1 text-xs text-[var(--primary)]"
                  >
                    <UsersIcon className="h-3.5 w-3.5" />
                    <span className="truncate">{item.communityName}</span>
                    <span className="text-[var(--text-muted)]">· {item.ago}</span>
                  </Link>
                </div>
              </div>
              <p className="mt-3 leading-relaxed">{item.body}</p>
              <Link
                href={`/communities/${item.communitySlug}`}
                className="mt-3 inline-flex items-center gap-1.5 border-t border-[var(--border)] pt-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
              >
                <MessageIcon className="h-5 w-5" />
                {item.replies} respuestas — únete a la conversación
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Grupos para ti */}
      <section className="mb-7">
        <SectionHeader title="Grupos para ti" href="/discover" cta="Ver todos" />
        <ul className="space-y-2.5 px-4">
          {grupos.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/communities/${g.slug}`}
                className="press lynk-card flex items-center gap-3 p-3.5 shadow-sm"
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white"
                  style={{ background: g.color }}
                  aria-hidden
                >
                  {g.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold"
                    style={{ background: `${g.color}1a`, color: g.color }}
                  >
                    {g.category}
                  </span>
                  <p className="mt-0.5 truncate font-bold">{g.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {g.mutualFriends > 0
                      ? `${g.mutualFriends} conocidos aquí`
                      : g.location}
                  </p>
                </div>
                <ChevronRightIcon className="h-5 w-5 shrink-0 text-[var(--text-muted)]" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Próximos eventos */}
      <section className="mb-6">
        <div className="mb-3 flex items-center gap-2 px-4">
          <CalendarIcon className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="font-display text-lg font-bold tracking-tight">
            Próximos eventos
          </h2>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {DEMO_EVENTS.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>
    </div>
  );
}
