import Link from "next/link";

const PILLARS = [
  {
    title: "Authenticity over performance",
    body: "No follower counts. No likes. No popularity contests. You are valued for who you are, not for the attention you attract.",
  },
  {
    title: "Belonging over broadcasting",
    body: "LYNK connects you with people, groups, and communities that share your interests, values, and identity.",
  },
  {
    title: "Real relationships over reach",
    body: "Looking for friends, a social circle, a volunteering cause, or simply a place where you feel understood — start here.",
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
            Log in
          </Link>
          <Link href="/signup" className="lynk-btn px-4 py-2 text-sm">
            Join LYNK
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-12 pb-16 text-center">
        <span className="lynk-tag mb-6">A community platform, not a stage</span>
        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Find where you{" "}
          <span className="text-[var(--primary)]">belong</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--muted)]">
          We&apos;ve never been more connected, yet never felt more alone. LYNK
          exists to reduce loneliness — by helping you find your people.
        </p>
        <div className="mt-9 flex items-center justify-center gap-3">
          <Link href="/signup" className="lynk-btn px-6 py-3 text-base">
            Find your people
          </Link>
          <Link
            href="/discover"
            className="lynk-btn lynk-btn-ghost px-6 py-3 text-base"
          >
            Explore communities
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
            No one should miss out on friendship, community, or belonging simply
            because they didn&apos;t know where to start.
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 py-10 text-sm text-[var(--muted)]">
        <span className="font-bold text-[var(--primary)]">LYNK</span> — reduce
        loneliness by helping people find their people.
      </footer>
    </main>
  );
}
