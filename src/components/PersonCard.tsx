import Link from "next/link";
import { avatarTint, type Person } from "@/lib/demo-data";
import { ZapIcon, MessageIcon } from "@/components/icons";

// Tarjeta de persona — inspirada en el PersonCard de la app móvil: avatar,
// comunidad en común, badge "X en común" y chips de intereses compartidos.
export function PersonCard({
  person,
  horizontal = false,
}: {
  person: Person;
  horizontal?: boolean;
}) {
  const common = person.sharedInterests.length;
  const tint = avatarTint(person.name);

  return (
    <div
      className={`lynk-card flex flex-col gap-3 p-4 shadow-sm ${
        horizontal ? "w-52 shrink-0" : "w-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <Link href={`/chat/${person.username}`} className="shrink-0">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
            style={{ background: tint }}
            aria-hidden
          >
            {person.name.charAt(0)}
          </span>
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold leading-tight">{person.name}</p>
          {person.mutualCommunity && (
            <p className="truncate text-xs text-[var(--muted)]">
              {person.mutualCommunity}
            </p>
          )}
          {common > 0 && (
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[var(--primary-soft)] px-2 py-0.5 text-[0.68rem] font-semibold text-[var(--primary)]">
              <ZapIcon className="h-3 w-3" />
              {common} en común
            </span>
          )}
        </div>
        <Link
          href={`/chat/${person.username}`}
          aria-label={`Escribir a ${person.name}`}
          className="press flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white"
        >
          <MessageIcon className="h-[18px] w-[18px]" />
        </Link>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {person.sharedInterests.slice(0, 3).map((i) => (
          <span
            key={i}
            className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[0.7rem] font-medium text-[var(--accent)]"
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}
