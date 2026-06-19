import Link from "next/link";
import { login } from "@/app/auth/actions";

export default async function LoginPage({
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
        <h1 className="mt-6 text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Good to see you again.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--accent)]">
            {error}
          </p>
        )}

        <form action={login} className="mt-6 space-y-4">
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
              className="lynk-input mt-1"
            />
          </div>
          <button type="submit" className="lynk-btn w-full py-3">
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          New to LYNK?{" "}
          <Link href="/signup" className="font-semibold text-[var(--primary)]">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
