"use client";

import { useEffect } from "react";
import { applyTheme, loadTheme } from "@/lib/theme";

// Aplica el tema guardado del usuario al cargar cualquier página.
export function ThemeApplier() {
  useEffect(() => {
    applyTheme(loadTheme());
  }, []);
  return null;
}
