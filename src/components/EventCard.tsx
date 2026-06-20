"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import { UsersIcon } from "@/components/icons";
import type { DemoEvent } from "@/lib/demo-data";

// Tarjeta de evento — inspirada en la app móvil: pill de fecha, título, hora,
// lugar, "X van" y botón "Me apunto" / "✓ Voy".
export function EventCard({ event }: { event: DemoEvent }) {
  const [going, setGoing] = useState(false);
  const toast = useToast();

  function toggle() {
    const next = !going;
    setGoing(next);
    toast(next ? `¡Te apuntaste a "${event.title}"!` : "Quitaste tu asistencia", next ? "success" : "info");
  }

  return (
    <div
      className="lynk-card flex w-56 shrink-0 flex-col gap-1.5 p-4 shadow-sm"
      style={{ borderTop: `3px solid ${event.color}` }}
    >
      <span
        className="self-start rounded-full px-2.5 py-1 text-[0.68rem] font-bold"
        style={{ background: `${event.color}1a`, color: event.color }}
      >
        {event.date}
      </span>
      <p className="font-display font-bold leading-tight">{event.title}</p>
      <p className="text-xs text-[var(--muted)]">
        {event.time} · {event.location}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
          <UsersIcon className="h-3.5 w-3.5" />
          {event.attendees + (going ? 1 : 0)} van
        </span>
        <button
          onClick={toggle}
          className="press rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
          style={
            going
              ? { background: `${event.color}1a`, color: event.color }
              : { background: event.color, color: "#fff" }
          }
        >
          {going ? "✓ Voy" : "Me apunto"}
        </button>
      </div>
    </div>
  );
}
