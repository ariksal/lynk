"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CompassIcon,
  GroupsIcon,
  UsersIcon,
  UserIcon,
} from "@/components/icons";

const TABS = [
  { href: "/feed", label: "Inicio", Icon: HomeIcon },
  { href: "/discover", label: "Explorar", Icon: CompassIcon },
  { href: "/my-groups", label: "Mis grupos", Icon: GroupsIcon },
  { href: "/friends", label: "Amigos", Icon: UsersIcon },
  { href: "/profile", label: "Perfil", Icon: UserIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 border-t border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <ul className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {TABS.map(({ href, label, Icon }) => {
          const active =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`press flex h-14 cursor-pointer flex-col items-center justify-center gap-0.5 transition-colors ${
                  active
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon className="h-6 w-6" filled={active} />
                <span className="whitespace-nowrap text-[0.6rem] font-medium">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
