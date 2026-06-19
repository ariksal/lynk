import Link from "next/link";
import { isSupabaseConfigured, avatarTint } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import { signout } from "@/app/auth/actions";
import { ShieldIcon } from "@/components/icons";

type Profile = {
  username: string;
  display_name: string;
  bio: string | null;
  location: string | null;
  interests: string[];
  values: string[];
};

const DEMO_PROFILE: Profile = {
  username: "you",
  display_name: "Your name",
  bio: "Connect Supabase and finish onboarding to see your real profile here.",
  location: "Online",
  interests: ["Hiking", "Reading", "Board games"],
  values: ["Kindness", "Community", "Curiosity"],
};

async function getProfile(): Promise<Profile> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("username, display_name, bio, location, interests, values")
          .eq("id", user.id)
          .single();
        if (data) return data as Profile;
      }
    } catch {
      // fall through
    }
  }
  return DEMO_PROFILE;
}

function ChipList({ label, items }: { label: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-5">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => (
          <span key={i} className="lynk-tag">
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function ProfilePage() {
  const p = await getProfile();

  return (
    <div>
      {/* Cover */}
      <div
        className="h-28"
        style={{
          background: `linear-gradient(135deg, ${avatarTint(
            p.display_name
          )}, var(--primary-hover))`,
        }}
      />

      <div className="px-4">
        <span
          className="-mt-12 flex items-center justify-center rounded-full border-4 border-[var(--surface)] text-3xl font-bold text-white"
          style={{
            width: 88,
            height: 88,
            background: avatarTint(p.display_name),
          }}
          aria-hidden
        >
          {p.display_name.charAt(0).toUpperCase()}
        </span>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-extrabold">
              {p.display_name}
            </h1>
            <p className="text-sm text-[var(--muted)]">
              @{p.username}
              {p.location ? ` · ${p.location}` : ""}
            </p>
          </div>
          <Link
            href="/profile/edit"
            className="lynk-btn lynk-btn-ghost shrink-0 px-4 py-2 text-sm"
          >
            Edit
          </Link>
        </div>

        {p.bio && <p className="mt-4 leading-relaxed">{p.bio}</p>}

        <ChipList label="Interests" items={p.interests} />
        <ChipList label="Values" items={p.values} />

        <div className="mt-8 border-t border-[var(--border)] pt-4">
          <Link
            href="/safety"
            className="flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            <ShieldIcon className="h-4 w-4" /> Safety & crisis resources
          </Link>
          <form action={signout} className="mt-4">
            <button
              type="submit"
              className="cursor-pointer text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
