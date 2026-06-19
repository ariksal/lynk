import Link from "next/link";
import {
  DEMO_CIRCLE,
  DEMO_SUGGESTED,
  avatarTint,
  type Person,
} from "@/lib/demo-data";
import { UsersIcon, UserPlusIcon, MessageIcon } from "@/components/icons";
import { ConnectButton } from "@/components/ConnectButton";

function PersonAvatar({ name }: { name: string }) {
  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
      style={{ background: avatarTint(name) }}
      aria-hidden
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function PersonRow({
  person,
  action,
}: {
  person: Person;
  action: "message" | "connect";
}) {
  return (
    <li className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
      <PersonAvatar name={person.name} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-tight">{person.name}</p>
        <p className="truncate text-sm text-[var(--muted)]">{person.bio}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {person.sharedInterests.map((i) => (
            <span key={i} className="lynk-tag !py-0 text-[0.68rem]">
              {i}
            </span>
          ))}
          {person.mutualCommunity && (
            <span className="text-[0.68rem] text-[var(--muted)]">
              · in {person.mutualCommunity}
            </span>
          )}
        </div>
      </div>
      {action === "message" ? (
        <Link
          href={`/chat/${person.username}`}
          aria-label={`Message ${person.name}`}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--primary)] transition-colors hover:bg-[var(--primary-soft)]"
        >
          <MessageIcon className="h-5 w-5" />
        </Link>
      ) : (
        <ConnectButton name={person.name} />
      )}
    </li>
  );
}

export default function FriendsPage() {
  return (
    <div>
      <div className="px-4 py-4">
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Friends
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          The people you&apos;ve connected with — and the ones you might click
          with next.
        </p>
      </div>

      {/* Your circle */}
      <h2 className="flex items-center gap-2 px-4 pb-1 pt-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
        <UsersIcon className="h-4 w-4" /> Your circle
      </h2>
      <ul>
        {DEMO_CIRCLE.map((p) => (
          <PersonRow key={p.username} person={p} action="message" />
        ))}
      </ul>

      {/* Suggestions */}
      <h2 className="flex items-center gap-2 px-4 pb-1 pt-6 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
        <UserPlusIcon className="h-4 w-4" /> People you might click with
      </h2>
      <p className="px-4 pb-2 text-xs text-[var(--muted)]">
        Matched on shared interests and communities — never on popularity.
      </p>
      <ul>
        {DEMO_SUGGESTED.map((p) => (
          <PersonRow key={p.username} person={p} action="connect" />
        ))}
      </ul>

      <div className="h-6" />
    </div>
  );
}
