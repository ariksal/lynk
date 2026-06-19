import { UsersIcon } from "@/components/icons";

const CATEGORIES = [
  { value: "hobby", label: "Hobby & interests" },
  { value: "volunteering", label: "Volunteering" },
  { value: "support", label: "Support" },
  { value: "local", label: "Local & social" },
  { value: "identity", label: "Identity" },
];

export default function NewCommunityPage() {
  return (
    <div className="px-4 py-5">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
          <UsersIcon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">
            Start a community
          </h1>
          <p className="text-xs text-[var(--muted)]">
            A place for people to belong.
          </p>
        </div>
      </div>

      <form className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            name="name"
            placeholder="e.g. Sunday Morning Cyclists"
            className="lynk-input mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">What it&apos;s about</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Who is this for, and what do you do together?"
            className="lynk-input mt-1 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Category</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                className="cursor-pointer rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm transition-colors hover:border-[var(--primary)] hover:text-[var(--primary-hover)]"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Location</label>
          <input
            name="location"
            placeholder="City or 'Online'"
            className="lynk-input mt-1"
          />
        </div>

        <button type="button" className="lynk-btn w-full py-3" disabled>
          Create community
        </button>
        <p className="text-center text-xs text-[var(--muted)]">
          Connect Supabase to enable creating communities.
        </p>
      </form>
    </div>
  );
}
