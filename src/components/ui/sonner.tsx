"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

// Toaster de LYNK: claro, centrado abajo y por encima de la barra de pestañas.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="bottom-center"
      offset={88}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-full !border-[var(--border)] !bg-[var(--foreground)] !text-white !font-semibold",
          description: "!text-white/80",
        },
      }}
      style={
        {
          "--normal-bg": "var(--foreground)",
          "--normal-text": "#ffffff",
          "--normal-border": "var(--foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
