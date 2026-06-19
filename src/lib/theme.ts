// Personalización de la página: color de acento + fuentes. Se guarda en
// localStorage y se aplica como variables CSS, así cada quien hace suyo LYNK.

export const THEME_KEY = "lynk-theme";

export type Theme = {
  accent: string; // hex del color principal
  display: string; // key de fuente para títulos
  body: string; // key de fuente para texto
};

export const DEFAULT_THEME: Theme = {
  accent: "#2563eb",
  display: "fredoka",
  body: "nunito",
};

export const ACCENTS = [
  { name: "Azul comunidad", hex: "#2563eb" },
  { name: "Guinda", hex: "#7a1f3d" },
  { name: "Turquesa", hex: "#0891b2" },
  { name: "Verde", hex: "#15803d" },
  { name: "Morado", hex: "#7c3aed" },
  { name: "Naranja", hex: "#ea580c" },
  { name: "Rosa", hex: "#db2777" },
  { name: "Cielo", hex: "#0ea5e9" },
];

export const DISPLAY_FONTS = [
  { key: "fredoka", name: "Fredoka", css: "var(--font-fredoka)" },
  { key: "baloo", name: "Baloo", css: "var(--font-baloo)" },
  { key: "poppins", name: "Poppins", css: "var(--font-poppins)" },
];

export const BODY_FONTS = [
  { key: "nunito", name: "Nunito", css: "var(--font-nunito)" },
  { key: "quicksand", name: "Quicksand", css: "var(--font-quicksand)" },
  { key: "poppins", name: "Poppins", css: "var(--font-poppins)" },
];

function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function shift(hex: string, amount: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const f = (c: number) =>
    clamp(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount);
  return `#${[f(r), f(g), f(b)]
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement.style;
  root.setProperty("--primary", theme.accent);
  root.setProperty("--primary-hover", shift(theme.accent, -0.15));
  root.setProperty("--primary-soft", shift(theme.accent, 0.86));
  root.setProperty("--glow", `0 4px 18px -2px ${theme.accent}66`);

  const display = DISPLAY_FONTS.find((f) => f.key === theme.display);
  const body = BODY_FONTS.find((f) => f.key === theme.body);
  if (display) root.setProperty("--ui-display", display.css);
  if (body) root.setProperty("--ui-body", body.css);
}

export function loadTheme(): Theme {
  if (typeof localStorage === "undefined") return DEFAULT_THEME;
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw) return { ...DEFAULT_THEME, ...JSON.parse(raw) };
  } catch {
    // ignora
  }
  return DEFAULT_THEME;
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  } catch {
    // ignora
  }
}
