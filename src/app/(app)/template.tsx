// A template re-mounts on every navigation, so each routed page gets a gentle
// fade-up entrance — a small thing that makes the app feel alive. The
// animation is disabled automatically under prefers-reduced-motion.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-in">{children}</div>;
}
