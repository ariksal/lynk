import { saveProfile } from "./actions";
import { ChipPicker } from "./ChipPicker";
import { INTERESTS, VALUES } from "./options";

export default function OnboardingPage() {
  return (
    <main className="mx-auto max-w-xl flex-1 px-5 py-12">
      <span className="font-display text-xl font-extrabold tracking-tight text-[var(--primary)]">
        LYNK
      </span>
      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight">
        Tell us who you are
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        This is how we&apos;ll match you with people and communities where you
        belong. No performance, no metrics — just you.
      </p>

      <form action={saveProfile} className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              name="username"
              required
              placeholder="yourname"
              className="lynk-input mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Display name</label>
            <input
              name="display_name"
              required
              placeholder="Your name"
              className="lynk-input mt-1"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">A short bio</label>
          <textarea
            name="bio"
            rows={3}
            placeholder="What makes you, you?"
            className="lynk-input mt-1 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">City</label>
          <input
            name="location"
            placeholder="City or 'Online'"
            className="lynk-input mt-1"
          />
          <p className="mt-1 text-xs text-[var(--muted)]">
            City only — never your address. It&apos;s visible to people and
            communities you join.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium">Your interests</label>
          <div className="mt-2">
            <ChipPicker
              name="interests"
              options={INTERESTS}
              hint="Pick a few — these help us find your people."
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">What you value</label>
          <div className="mt-2">
            <ChipPicker
              name="values"
              options={VALUES}
              hint="The things that matter to you."
            />
          </div>
        </div>

        <button type="submit" className="lynk-btn w-full py-3">
          Start finding my people
        </button>
      </form>
    </main>
  );
}
