import {
  DEMO_COMMUNITIES,
  isSupabaseConfigured,
  type DemoCommunity,
} from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import { DiscoverBrowser } from "./DiscoverBrowser";

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
      .select(
        "slug, name, description, category, kind, color, tags, location, mutualFriends:mutual_friends, tiers"
      )
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
  return <DiscoverBrowser communities={communities} live={live} />;
}
