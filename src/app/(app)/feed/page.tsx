import Link from "next/link";
import {
  DEMO_FEED,
  DEMO_MY_COMMUNITIES,
  avatarTint,
} from "@/lib/demo-data";
import { MessageIcon, UsersIcon } from "@/components/icons";

function Avatar({
  name,
  size = 44,
}: {
  name: string;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        background: avatarTint(name),
        fontSize: size * 0.4,
      }}
      aria-hidden
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export default function FeedPage() {
  return (
    <div>
      {/* Stories row — the communities you belong to */}
      <section className="border-b border-[var(--border)] py-3">
        <ul className="flex gap-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {DEMO_MY_COMMUNITIES.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/communities/${c.slug}`}
                className="flex w-16 flex-col items-center gap-1"
              >
                <span
                  className="rounded-full p-[2.5px]"
                  style={{ background: c.color }}
                >
                  <span className="block rounded-full bg-[var(--surface)] p-[2px]">
                    <span
                      className="flex items-center justify-center rounded-full font-bold text-white"
                      style={{ width: 56, height: 56, background: c.color, fontSize: 22 }}
                      aria-hidden
                    >
                      {c.name.charAt(0)}
                    </span>
                  </span>
                </span>
                <span className="w-16 truncate text-center text-[0.68rem] text-[var(--muted)]">
                  {c.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Feed */}
      <ul>
        {DEMO_FEED.map((item) => (
          <li key={item.id} className="border-b border-[var(--border)]">
            <article className="px-4 py-4">
              <div className="flex items-center gap-3">
                <Avatar name={item.author} />
                <div className="min-w-0 leading-tight">
                  <p className="font-semibold">{item.author}</p>
                  <Link
                    href={`/communities/${item.communitySlug}`}
                    className="flex items-center gap-1 text-xs text-[var(--primary)]"
                  >
                    <UsersIcon className="h-3.5 w-3.5" />
                    <span className="truncate">{item.communityName}</span>
                  </Link>
                </div>
                <span className="ml-auto text-xs text-[var(--muted)]">
                  {item.ago}
                </span>
              </div>

              <p className="mt-3 leading-relaxed">{item.body}</p>

              {/* No likes, no shares. Conversation is the only signal. */}
              <Link
                href={`/communities/${item.communitySlug}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
              >
                <MessageIcon className="h-5 w-5" />
                {item.replies} respuestas — únete a la conversación
              </Link>
            </article>
          </li>
        ))}
      </ul>

      <p className="px-4 py-8 text-center text-sm text-[var(--muted)]">
        Estás al día. Ve a{" "}
        <Link href="/discover" className="font-semibold text-[var(--primary)]">
          explora más comunidades
        </Link>
        .
      </p>
    </div>
  );
}
