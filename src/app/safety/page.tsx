import Link from "next/link";
import { ChevronLeftIcon, ShieldIcon } from "@/components/icons";

type Resource = {
  name: string;
  detail: string;
  action: string;
  href: string;
};

// Real, free crisis resources. Surfaced from the report flow and profile so a
// person in acute distress is never more than a tap from help.
const RESOURCES: Resource[] = [
  {
    name: "988 Suicide & Crisis Lifeline (US)",
    detail: "24/7, free and confidential support for people in distress.",
    action: "Call or text 988",
    href: "tel:988",
  },
  {
    name: "Crisis Text Line",
    detail: "Text with a trained crisis counselor, 24/7.",
    action: "Text HOME to 741741",
    href: "sms:741741?&body=HOME",
  },
  {
    name: "Find a Helpline (international)",
    detail: "Free, confidential support lines in your country.",
    action: "findahelpline.com",
    href: "https://findahelpline.com",
  },
];

export default function SafetyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] bg-[var(--surface)] px-5 py-6">
      <Link
        href="/feed"
        className="press inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--primary)]"
      >
        <ChevronLeftIcon className="h-5 w-5" /> Back
      </Link>

      <div className="mt-5 flex items-center gap-2.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
          <ShieldIcon className="h-6 w-6" />
        </span>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          You&apos;re not alone
        </h1>
      </div>

      <p className="mt-4 leading-relaxed text-[var(--muted)]">
        If you&apos;re going through something heavy right now, reaching out
        takes courage — and help is here. These services are free, confidential,
        and available any time.
      </p>

      <ul className="mt-6 space-y-3">
        {RESOURCES.map((r) => (
          <li key={r.name} className="lynk-card p-4">
            <h2 className="font-bold">{r.name}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{r.detail}</p>
            <a
              href={r.href}
              target={r.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="lynk-btn mt-3 px-5 py-2 text-sm"
            >
              {r.action}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-[var(--text-muted)]">
        If you or someone else is in immediate danger, call your local emergency
        number.
      </p>
    </main>
  );
}
