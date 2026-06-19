"use client";

import { useEffect, useState } from "react";
import {
  ACCENTS,
  BODY_FONTS,
  DISPLAY_FONTS,
  DEFAULT_THEME,
  applyTheme,
  loadTheme,
  saveTheme,
  type Theme,
} from "@/lib/theme";
import { useToast } from "@/components/Toast";

export default function PersonalizarPage() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const toast = useToast();

  // Carga el tema actual al abrir.
  useEffect(() => {
    setTheme(loadTheme());
  }, []);

  // Aplica en vivo cada cambio. Usa actualización funcional para no perder
  // cambios cuando se tocan varios controles seguidos (stale closure).
  function update(patch: Partial<Theme>) {
    setTheme((prev) => {
      const next = { ...prev, ...patch };
      applyTheme(next);
      return next;
    });
  }

  function save() {
    saveTheme(theme);
    toast("¡Tu página quedó a tu estilo! ✨");
  }

  function reset() {
    setTheme(DEFAULT_THEME);
    applyTheme(DEFAULT_THEME);
    saveTheme(DEFAULT_THEME);
    toast("Volvimos al tema original");
  }

  return (
    <div className="px-4 py-4">
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Personaliza tu página
      </h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Hazla tuya — elige tu color y tus fuentes. Los cambios se ven al instante.
      </p>

      {/* Color de acento */}
      <section className="mt-6">
        <h2 className="text-sm font-bold text-[var(--muted)]">COLOR</h2>
        <div className="mt-2 flex flex-wrap gap-3">
          {ACCENTS.map((a) => {
            const on = theme.accent.toLowerCase() === a.hex.toLowerCase();
            return (
              <button
                key={a.hex}
                onClick={() => update({ accent: a.hex })}
                aria-label={a.name}
                className="press relative h-11 w-11 rounded-full"
                style={{
                  background: a.hex,
                  boxShadow: on ? `0 0 0 3px var(--surface), 0 0 0 5px ${a.hex}` : "none",
                }}
              >
                {on && (
                  <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 4.5 4.5L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
          {/* Color personalizado */}
          <label
            className="press flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-[var(--border)] text-lg text-[var(--muted)]"
            aria-label="Color personalizado"
          >
            +
            <input
              type="color"
              value={theme.accent}
              onChange={(e) => update({ accent: e.target.value })}
              className="absolute h-0 w-0 opacity-0"
            />
          </label>
        </div>
      </section>

      {/* Fuente de títulos */}
      <section className="mt-6">
        <h2 className="text-sm font-bold text-[var(--muted)]">FUENTE DE TÍTULOS</h2>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {DISPLAY_FONTS.map((f) => {
            const on = theme.display === f.key;
            return (
              <button
                key={f.key}
                onClick={() => update({ display: f.key })}
                className={`press rounded-xl border py-3 text-lg font-bold transition-colors ${
                  on
                    ? "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary-hover)]"
                    : "border-[var(--border)] bg-[var(--surface)]"
                }`}
                style={{ fontFamily: f.css }}
              >
                {f.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Fuente de texto */}
      <section className="mt-6">
        <h2 className="text-sm font-bold text-[var(--muted)]">FUENTE DE TEXTO</h2>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {BODY_FONTS.map((f) => {
            const on = theme.body === f.key;
            return (
              <button
                key={f.key}
                onClick={() => update({ body: f.key })}
                className={`press rounded-xl border py-3 text-sm font-semibold transition-colors ${
                  on
                    ? "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary-hover)]"
                    : "border-[var(--border)] bg-[var(--surface)]"
                }`}
                style={{ fontFamily: f.css }}
              >
                {f.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Preview */}
      <section className="mt-6">
        <h2 className="text-sm font-bold text-[var(--muted)]">VISTA PREVIA</h2>
        <div className="lynk-card mt-2 p-4">
          <p className="font-display text-xl font-bold">Tu tnuá te espera</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Así se verá tu LYNK con este estilo.
          </p>
          <button className="lynk-btn mt-3 px-5 py-2 text-sm">Botón de ejemplo</button>
        </div>
      </section>

      <div className="mt-6 flex gap-2">
        <button onClick={save} className="lynk-btn flex-1 py-3">
          Guardar
        </button>
        <button
          onClick={reset}
          className="press rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted)]"
        >
          Restablecer
        </button>
      </div>
    </div>
  );
}
