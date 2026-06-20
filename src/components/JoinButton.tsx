"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Unirse NO es automático: abre un diálogo de confirmación y envía una
// solicitud que los admins de la comunidad aprueban. Protege a los menores.
export function JoinButton({ communityName }: { communityName: string }) {
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);
  const toast = useToast();

  function confirm() {
    setPending(true);
    setOpen(false);
    toast(`Solicitud enviada a los admins de ${communityName}`);
  }

  if (pending) {
    return (
      <>
        <button
          onClick={() => {
            setPending(false);
            toast(`Cancelaste tu solicitud a ${communityName}`, "info");
          }}
          className="press mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] py-3 font-semibold text-[var(--foreground)]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          Solicitud pendiente
        </button>
        <p className="mt-1.5 text-center text-xs text-[var(--muted)]">
          Un admin revisará tu solicitud pronto.
        </p>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="press mt-4 w-full rounded-full bg-[var(--primary)] py-3 font-semibold text-white shadow-[var(--glow)] transition-colors hover:bg-[var(--primary-hover)]">
          Solicitar unirme
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Solicitar unirme
          </DialogTitle>
          <DialogDescription className="text-[var(--muted)]">
            Tu solicitud se enviará a los admins de{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {communityName}
            </span>
            . Te avisamos en cuanto la aprueben — así el espacio se mantiene
            seguro y solo para la comunidad.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-full">
              Cancelar
            </Button>
          </DialogClose>
          <Button onClick={confirm} className="rounded-full">
            Enviar solicitud
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
