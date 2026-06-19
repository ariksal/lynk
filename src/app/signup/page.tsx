import Link from "next/link";
import { signup } from "@/app/auth/actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="lynk-card w-full max-w-sm p-8">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-[var(--primary)]"
        >
          LYNK
        </Link>
        <h1 className="mt-6 text-2xl font-bold">Join LYNK</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Find the people, groups, and communities where you belong.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--accent)]">
            {error}
          </p>
        )}

        <form action={signup} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Your name</label>
            <input
              name="display_name"
              type="text"
              required
              placeholder="What should people call you?"
              className="lynk-input mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input name="email" type="email" required className="lynk-input mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="lynk-input mt-1"
            />
          </div>
          {/* 18+ attestation — LYNK encourages meeting strangers, so an adult
              gate is table-stakes. No DOB stored; just a yes/no signal. */}
          <label className="flex items-start gap-2.5 text-sm">
            <input
              name="age_ok"
              type="checkbox"
              required
              value="yes"
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
            />
            <span className="text-[var(--muted)]">
              I&apos;m 18 or older and I agree to LYNK&apos;s community
              guidelines.
            </span>
          </label>

          <button type="submit" className="lynk-btn w-full py-3">
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[var(--primary)]">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
