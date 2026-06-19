import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

// App shell: a centered, phone-width column with a sticky top bar and a fixed
// bottom tab bar — so LYNK reads as a native app, not a website.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-[var(--surface)] shadow-[0_0_60px_rgba(0,0,0,0.05)]">
      <TopBar />
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
