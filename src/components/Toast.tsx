"use client";

import { toast as sonnerToast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

type ToastKind = "success" | "info";

// API estable de LYNK (useToast) respaldada por Sonner — las llamadas
// existentes `const toast = useToast(); toast("...")` siguen funcionando.
export function useToast() {
  return (message: string, kind: ToastKind = "success") =>
    kind === "success"
      ? sonnerToast.success(message)
      : sonnerToast(message);
}

// Monta el Toaster de Sonner junto al contenido.
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
