import Link from "next/link";
import { saveProfile } from "@/app/onboarding/actions";
import { ChipPicker } from "@/app/onboarding/ChipPicker";
import { INTERESTS, VALUES } from "@/app/onboarding/options";
import { isSupabaseConfigured } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeftIcon } from "@/components/icons";

type Profile = {
  username: string;
  display_name: string;
  bio: string | null;
  location: string | null;
  interests: string[];
  values: string[];
};

// In demo mode there's no real account, so we pre-fill with the same sample
// profile the /profile page shows — editing never starts from blank.
const DEMO_PROFILE: Profile = {
  username: "you",
  display_name: "Your name",
  bio: "Connect Supabase and finish onboarding to see your real profile here.",
  location: "Austin, TX",
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

export default async function EditProfilePage() {
  const p = await getProfile();

  return (
    <div className="px-5 py-4">
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          aria-label="Back"
          className="press flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--primary-soft)]"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Edit profile
        </h1>
      </div>

      <form action={saveProfile} className="mt-6 space-y-6">
        <input type="hidden" name="redirect_to" value="/profile" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              name="username"
              required
              defaultValue={p.username}
              className="lynk-input mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Display name</label>
            <input
              name="display_name"
              required
              defaultValue={p.display_name}
              className="lynk-input mt-1"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">A short bio</label>
          <textarea
            name="bio"
            rows={3}
            defaultValue={p.bio ?? ""}
            className="lynk-input mt-1 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">City</label>
          <input
            name="location"
            defaultValue={p.location ?? ""}
            placeholder="City or 'Online'"
            className="lynk-input mt-1"
          />
          <p className="mt-1 text-xs text-[var(--muted)]">
            City only — never your address. Your city is visible to people and
            communities you join.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium">Your interests</label>
          <div className="mt-2">
            <ChipPicker
              name="interests"
              options={INTERESTS}
              initial={p.interests}
              hint="These help us find your people."
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">What you value</label>
          <div className="mt-2">
            <ChipPicker
              name="values"
              options={VALUES}
              initial={p.values}
              hint="The things that matter to you."
            />
          </div>
        </div>

        <button type="submit" className="lynk-btn w-full py-3">
          Save changes
        </button>
      </form>
    </div>
  );
}
