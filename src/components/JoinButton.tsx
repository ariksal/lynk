"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";

type Status = "idle" | "pending";

// Unirse NO es automático: se envía una solicitud que los admins de la
// comunidad aprueban. Protege a los menores (solo entra gente verificada) y
// deja el control en quienes cuidan el espacio.
export function JoinButton({ communityName }: { communityName: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const toast = useToast();

  function handleClick() {
    if (status === "pending") {
      setStatus("idle");
      toast(`Cancelaste tu solicitud a ${communityName}`);
      return;
    }
    setStatus("pending");
    toast(`Solicitud enviada a los admins de ${communityName}`);
  }

  const pending = status === "pending";

  return (
    <>
      <button
        onClick={handleClick}
        className={`press mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold transition-colors ${
          pending
            ? "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
            : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
        }`}
      >
        {pending ? (
          <>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-[var(--accent)]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            Solicitud pendiente
          </>
        ) : (
          "Solicitar unirme"
        )}
      </button>
      <p className="mt-1.5 text-center text-xs text-[var(--muted)]">
        {pending
          ? "Un admin revisará tu solicitud pronto."
          : "Un admin de la comunidad aprueba tu entrada."}
      </p>
    </>
  );
}
