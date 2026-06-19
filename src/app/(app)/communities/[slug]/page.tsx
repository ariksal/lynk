import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabel } from "@/lib/categories";
import {
  DEMO_COMMUNITIES,
  DEMO_POSTS,
  DEMO_POSTS_FALLBACK,
  isSupabaseConfigured,
  avatarTint,
  type DemoCommunity,
  type DemoPost,
} from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeftIcon, UsersIcon, MessageIcon } from "@/components/icons";
import { JoinButton } from "@/components/JoinButton";

async function getCommunity(
  slug: string
): Promise<{ community: DemoCommunity; posts: DemoPost[]; live: boolean } | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: community } = await supabase
        .from("communities")
        .select("slug, name, description, category, tags, location")
        .eq("slug", slug)
        .single();
      if (community) {
        const { data: posts } = await supabase
          .from("posts")
          .select("id, body, created_at, profiles(display_name)")
          .order("created_at", { ascending: false });
        const mapped: DemoPost[] = (posts ?? []).map(
          (p: {
            id: string;
            body: string;
            profiles?: { display_name?: string } | null;
          }) => ({
            id: p.id,
            body: p.body,
            author: p.profiles?.display_name ?? "A member",
            ago: "",
          })
        );
        return { community: community as DemoCommunity, posts: mapped, live: true };
      }
    } catch {
      // fall through to demo
    }
  }

  const community = DEMO_COMMUNITIES.find((c) => c.slug === slug);
  if (!community) return null;
  return {
    community,
    posts: DEMO_POSTS[slug] ?? DEMO_POSTS_FALLBACK,
    live: false,
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getCommunity(slug);
  if (!result) notFound();
  const { community, posts } = result;
  const tint = avatarTint(community.name);

  return (
    <div>
      {/* Cover header */}
      <div
        className="relative h-32"
        style={{
          background: `linear-gradient(135deg, ${tint}, var(--primary-hover))`,
        }}
      >
        <Link
          href="/discover"
          aria-label="Back"
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/30"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
      </div>

      <div className="px-4">
        {/* Avatar overlapping the cover */}
        <span
          className="-mt-9 flex h-18 w-18 items-center justify-center rounded-3xl border-4 border-[var(--surface)] text-2xl font-bold text-white"
          style={{ width: 72, height: 72, background: tint }}
          aria-hidden
        >
          {community.name.charAt(0)}
        </span>

        <h1 className="mt-3 text-xl font-extrabold">{community.name}</h1>
        <div className="mt-1 flex items-center gap-2 text-xs text-[var(--muted)]">
          <span className="lynk-tag">{categoryLabel(community.category)}</span>
          <span className="flex items-center gap-1">
            <UsersIcon className="h-3.5 w-3.5" />
            {community.location}
          </span>
        </div>

        <p className="mt-3 leading-relaxed text-[var(--foreground)]">
          {community.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {community.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[var(--background)] px-2.5 py-0.5 text-xs text-[var(--muted)]"
            >
              #{t}
            </span>
          ))}
        </div>

        <JoinButton communityName={community.name} />
      </div>

      {/* Conversation */}
      <div className="mt-6 border-t border-[var(--border)]">
        <h2 className="flex items-center gap-2 px-4 pt-4 text-sm font-bold text-[var(--muted)]">
          <MessageIcon className="h-4 w-4" /> CONVERSATION
        </h2>
        <ul>
          {posts.map((p) => (
            <li key={p.id} className="border-b border-[var(--border)] px-4 py-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: avatarTint(p.author) }}
                  aria-hidden
                >
                  {p.author.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-semibold">{p.author}</span>
                {p.ago && (
                  <span className="text-xs text-[var(--muted)]">· {p.ago}</span>
                )}
              </div>
              <p className="mt-2 pl-[2.9rem] text-sm leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
