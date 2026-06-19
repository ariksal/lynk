import Link from "next/link";
import { signup } from "@/app/auth/actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12">
      <div className="lynk-card w-full max-w-sm p-8">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-[var(--primary)]"
        >
          LYNK
        </Link>
        <h1 className="mt-6 font-display text-2xl font-bold">Únete a LYNK</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Conecta con tu tnuá, tu escuela y tus grupos.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--accent)]">
            {error}
          </p>
        )}

        <form action={signup} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Tu nombre</label>
            <input
              name="display_name"
              type="text"
              required
              placeholder="¿Cómo te dicen?"
              className="lynk-input mt-1"
            />
          </div>
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
              minLength={6}
              className="lynk-input mt-1"
            />
          </div>

          {/* Esta es una comunidad para MENORES — por eso pedimos correo del
              padre/madre/tutor para su consentimiento, en vez de una verja 18+.
              (Demo: no se almacena nada todavía.) */}
          <div>
            <label className="text-sm font-medium">
              Correo de tu papá/mamá o tutor
            </label>
            <input
              name="guardian_email"
              type="email"
              required
              placeholder="Para el consentimiento del tutor"
              className="lynk-input mt-1"
            />
          </div>

          <label className="flex items-start gap-2.5 text-sm">
            <input
              name="consent"
              type="checkbox"
              required
              value="yes"
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
            />
            <span className="text-[var(--muted)]">
              Mi tutor autoriza mi cuenta y acepto las normas de la comunidad.
            </span>
          </label>

          <button type="submit" className="lynk-btn w-full py-3">
            Crear cuenta
          </button>

          <p className="rounded-xl bg-[var(--primary-soft)] px-3 py-2 text-xs text-[var(--primary-hover)]">
            Tu cuenta pasa por una verificación de pertenencia a la comunidad
            antes de activarse.
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-[var(--primary)]">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
