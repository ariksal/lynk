import Link from "next/link";
import { ChevronLeftIcon, ShieldIcon } from "@/components/icons";

type Resource = {
  name: string;
  detail: string;
  action: string;
  href: string;
};

// Recursos de crisis reales de México. Se muestran desde el flujo de reportar y
// desde el perfil para que alguien en angustia esté a un toque de ayuda.
const RESOURCES: Resource[] = [
  {
    name: "SAPTEL — Consejo Ciudadano",
    detail: "Línea de crisis y apoyo psicológico, 24/7, gratuita y confidencial.",
    action: "Llamar al 55 5259 8121",
    href: "tel:5552598121",
  },
  {
    name: "Línea de la Vida (gobierno)",
    detail: "Apoyo emocional y prevención, todos los días.",
    action: "Llamar al 800 911 2000",
    href: "tel:8009112000",
  },
  {
    name: "Locatel (CDMX)",
    detail: "Orientación y apoyo psicológico para jóvenes en la Ciudad de México.",
    action: "Llamar al 55 5658 1111",
    href: "tel:5556581111",
  },
];

export default function SafetyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] bg-[var(--surface)] px-5 py-6">
      <Link
        href="/feed"
        className="press inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--primary)]"
      >
        <ChevronLeftIcon className="h-5 w-5" /> Atrás
      </Link>

      <div className="mt-5 flex items-center gap-2.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
          <ShieldIcon className="h-6 w-6" />
        </span>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          No estás solo
        </h1>
      </div>

      <p className="mt-4 leading-relaxed text-[var(--muted)]">
        Si estás pasando por algo difícil, pedir ayuda es de valientes — y aquí
        la hay. Estos servicios son gratuitos, confidenciales y están disponibles
        a cualquier hora.
      </p>

      <div className="mt-4 rounded-2xl bg-[var(--primary-soft)] p-4 text-sm text-[var(--primary-hover)]">
        También puedes hablar con tu <strong>madrij</strong> o con un adulto de
        confianza de tu comunidad. No tienes que cargarlo solo.
      </div>

      <ul className="mt-6 space-y-3">
        {RESOURCES.map((r) => (
          <li key={r.name} className="lynk-card p-4">
            <h2 className="font-bold">{r.name}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{r.detail}</p>
            <a href={r.href} className="lynk-btn mt-3 px-5 py-2 text-sm">
              {r.action}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-[var(--text-muted)]">
        Si tú o alguien más está en peligro inmediato, llama al 911.
      </p>
    </main>
  );
}
