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
        <h1 className="mt-6 text-2xl font-bold">Qué bueno verte de nuevo</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Qué gusto verte otra vez.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--accent)]">
            {error}
          </p>
        )}

        <form action={login} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Correo</label>
            <input name="email" type="email" required className="lynk-input mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              className="lynk-input mt-1"
            />
          </div>
          <button type="submit" className="lynk-btn w-full py-3">
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          ¿Nuevo en LYNK?{" "}
          <Link href="/signup" className="font-semibold text-[var(--primary)]">
            Crear cuenta
          </Link>
        </p>
      </div>
    </main>
  );
}
