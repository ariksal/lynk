import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DEMO_COMMUNITIES,
  DEMO_POSTS,
  DEMO_POSTS_FALLBACK,
  DEMO_NEWS,
  DEMO_NEWS_FALLBACK,
  isSupabaseConfigured,
  type DemoCommunity,
  type DemoPost,
} from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeftIcon, UsersIcon, BuildingIcon } from "@/components/icons";
import { JoinButton } from "@/components/JoinButton";
import { CommunityTabs } from "./CommunityTabs";

async function getCommunity(slug: string): Promise<{
  community: DemoCommunity;
  news: DemoPost[];
  wall: DemoPost[];
} | null> {
  // (Modo demo — cuando se conecte Supabase, leer posts/news reales.)
  const community = DEMO_COMMUNITIES.find((c) => c.slug === slug);
  if (community) {
    return {
      community,
      news: DEMO_NEWS[slug] ?? DEMO_NEWS_FALLBACK,
      wall: DEMO_POSTS[slug] ?? DEMO_POSTS_FALLBACK,
    };
  }
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("communities")
        .select("slug, name, description, category, kind, color, tags, location, mutualFriends:mutual_friends, tiers")
        .eq("slug", slug)
        .single();
      if (data) {
        return {
          community: data as DemoCommunity,
          news: DEMO_NEWS_FALLBACK,
          wall: DEMO_POSTS_FALLBACK,
        };
      }
    } catch {
      // continúa
    }
  }
  return null;
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getCommunity(slug);
  if (!result) notFound();
  const { community, news, wall } = result;
  const color = community.color;
  const isInstitution = community.kind !== "grupo";

  return (
    <div>
      {/* Portada con el color del movimiento */}
      <div
        className="relative h-32"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
      >
        <Link
          href="/discover"
          aria-label="Atrás"
          className="press absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur hover:bg-black/30"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
      </div>

      <div className="px-4">
        <span
          className={`-mt-9 flex items-center justify-center border-4 border-[var(--surface)] text-2xl font-bold text-white ${
            isInstitution ? "rounded-2xl" : "rounded-3xl"
          }`}
          style={{ width: 72, height: 72, background: color }}
          aria-hidden
        >
          {community.name.charAt(0)}
        </span>

        <h1 className="mt-3 font-display text-xl font-bold">{community.name}</h1>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
          <span
            className="rounded-full px-2 py-0.5 font-semibold"
            style={{ background: `${color}1a`, color }}
          >
            {community.category}
          </span>
          <span className="flex items-center gap-1">
            {isInstitution ? (
              <BuildingIcon className="h-3.5 w-3.5" />
            ) : (
              <UsersIcon className="h-3.5 w-3.5" />
            )}
            {community.location}
          </span>
        </div>

        {/* Amigos mutuos — solo el número, NO quiénes (para dar curiosidad) */}
        {community.mutualFriends > 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--primary-soft)] px-3 py-2 text-sm font-semibold text-[var(--primary-hover)]">
            <UsersIcon className="h-4 w-4" />
            {community.mutualFriends} de tus amigos ya están aquí
          </div>
        )}

        <p className="mt-3 leading-relaxed text-[var(--foreground)]">
          {community.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {community.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[var(--surface)] px-2.5 py-0.5 text-xs text-[var(--muted)]"
              style={{ border: `1px solid ${color}33` }}
            >
              #{t}
            </span>
          ))}
        </div>

        <JoinButton communityName={community.name} />

        {/* Niveles (tiers) dentro de la comunidad */}
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[var(--muted)]">NIVELES</h2>
          <ul className="mt-2 space-y-2">
            {community.tiers.map((tier, i) => (
              <li
                key={tier.name}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] px-3 py-2"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: color, opacity: 0.5 + i * 0.25 }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{tier.name}</p>
                  <p className="truncate text-xs text-[var(--muted)]">
                    {tier.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Secciones: Noticias (solo admin) y Muro (todos) */}
      <CommunityTabs news={news} wall={wall} color={color} />
    </div>
  );
}
