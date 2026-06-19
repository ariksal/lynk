"use client";

import { useState } from "react";
import { ShieldIcon } from "@/components/icons";

// Verificación de pertenencia a la comunidad. El usuario eligió: "se sube una
// identificación y se verifica". Por ser MENORES y dato sensible (LFPDPPP),
// el flujo es de REVISIÓN por un admin — la imagen no se almacena de forma
// permanente — y ofrecemos como alternativa el código de tu tnuá/escuela.
// (Demo: nada se sube ni se guarda todavía.)
export function VerifyCard() {
  const [mode, setMode] = useState<"id" | "code">("id");
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState("");
  const [code, setCode] = useState("");

  if (done) {
    return (
      <div className="reward-pop rounded-2xl border border-[var(--success)]/40 bg-[var(--success)]/10 p-4">
        <p className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
          <ShieldIcon className="h-5 w-5 text-[var(--success)]" />
          Verificación enviada
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Un encargado de tu comunidad la revisará pronto. Mientras tanto,
          completa tu perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="flex items-center gap-2 font-semibold">
        <ShieldIcon className="h-5 w-5 text-[var(--primary)]" />
        Verifica tu pertenencia a la comunidad
      </p>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Para mantener LYNK seguro y solo para la comunidad, verifica que eres
        parte de ella.
      </p>

      {/* Selector de método */}
      <div className="mt-3 grid grid-cols-2 gap-1 rounded-full bg-[var(--background)] p-1">
        <button
          type="button"
          onClick={() => setMode("id")}
          className={`press rounded-full py-2 text-sm font-semibold transition-colors ${
            mode === "id" ? "bg-[var(--surface)] text-[var(--primary)] shadow-sm" : "text-[var(--muted)]"
          }`}
        >
          Subir identificación
        </button>
        <button
          type="button"
          onClick={() => setMode("code")}
          className={`press rounded-full py-2 text-sm font-semibold transition-colors ${
            mode === "code" ? "bg-[var(--surface)] text-[var(--primary)] shadow-sm" : "text-[var(--muted)]"
          }`}
        >
          Código de tu tnuá
        </button>
      </div>

      {mode === "id" ? (
        <div className="mt-3">
          <label className="press flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] px-4 py-6 text-center text-sm text-[var(--muted)] hover:border-[var(--primary)]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
            {fileName || "Toca para subir una foto de tu credencial (escuela/comunidad)"}
          </label>
          <p className="mt-2 text-[0.7rem] text-[var(--text-muted)]">
            🔒 Solo la revisa un encargado de tu comunidad. No se guarda de forma
            permanente.
          </p>
        </div>
      ) : (
        <div className="mt-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Código que te dio tu madrij o escuela"
            className="lynk-input"
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setDone(true)}
        disabled={mode === "id" ? !fileName : code.trim().length < 3}
        className="lynk-btn mt-3 w-full py-2.5 text-sm disabled:opacity-50"
      >
        Enviar verificación
      </button>
    </div>
  );
}
