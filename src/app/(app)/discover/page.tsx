import { DiscoverBrowser } from "./DiscoverBrowser";
import {
  DEMO_COMMUNITIES,
  isSupabaseConfigured,
  type DemoCommunity,
} from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";

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
      .select("slug, name, description, category, kind, tags, location")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) {
      return { communities: DEMO_COMMUNITIES, live: false };
    }
    return { communities: data as DemoCommunity[], live: true };
  } catch {
    return { communities: DEMO_COMMUNITIES, live: false };
  }
}

export default async function DiscoverPage() {
  const { communities, live } = await getCommunities();

  return (
    <div className="px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">
        Discover
      </h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Find your people — by who you are, not your follower count.
      </p>

      {!live && (
        <p className="mt-3 rounded-xl bg-[var(--primary-soft)] px-4 py-2 text-xs text-[var(--primary-hover)]">
          Sample data. Connect Supabase to go live.
        </p>
      )}

      <DiscoverBrowser communities={communities} />
    </div>
  );
}
