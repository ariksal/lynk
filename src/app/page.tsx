import Link from "next/link";

const PILLARS = [
  {
    title: "Autenticidad sobre apariencia",
    body: "Sin número de seguidores. Sin likes. Sin concursos de popularidad. Vales por quien eres, no por la atención que atraes.",
  },
  {
    title: "Pertenencia, no exhibición",
    body: "LYNK te conecta con personas, grupos y comunidades que comparten tus intereses, valores e identidad.",
  },
  {
    title: "Relaciones reales sobre alcance",
    body: "¿Buscas amigos, un círculo social, una causa de jésed o simplemente un lugar donde te sientas comprendido? Empieza aquí.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Nav */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--primary)]">
          LYNK
        </span>
        <nav className="flex items-center gap-3">
          <Link href="/login" className="lynk-btn lynk-btn-ghost px-4 py-2 text-sm">
            Iniciar sesión
          </Link>
          <Link href="/signup" className="lynk-btn px-4 py-2 text-sm">
            Únete a LYNK
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-12 pb-16 text-center">
        <span className="lynk-tag mb-6">Una plataforma de comunidad, no un escenario</span>
        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Encuentra dónde{" "}
          <span className="text-[var(--primary)]">perteneces</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--muted)]">
          Nunca habíamos estado tan conectados y, sin embargo, nunca nos habíamos
          sentido tan solos. LYNK existe para reducir la soledad, ayudándote a
          encontrar a tu gente.
        </p>
        <div className="mt-9 flex items-center justify-center gap-3">
          <Link href="/signup" className="lynk-btn px-6 py-3 text-base">
            Encuentra a tu gente
          </Link>
          <Link
            href="/discover"
            className="lynk-btn lynk-btn-ghost px-6 py-3 text-base"
          >
            Explora comunidades
          </Link>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto grid max-w-5xl gap-5 px-6 pb-20 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="lynk-card p-6">
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {p.body}
            </p>
          </div>
        ))}
      </section>

      {/* Belief band */}
      <section className="bg-[var(--primary-soft)] py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xl font-semibold leading-relaxed text-[var(--primary-hover)] sm:text-2xl">
            Nadie debería quedarse sin amistad, comunidad o pertenencia
            simplemente porque no sabía por dónde empezar.
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 py-10 text-sm text-[var(--muted)]">
        <span className="font-bold text-[var(--primary)]">LYNK</span> — reduce la
        soledad ayudando a las personas a encontrar a su gente.
      </footer>
    </main>
  );
}
