"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/ui-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const resolved =
      theme === "system" ? (systemDark ? "dark" : "light") : theme;

    root.classList.remove("light", "dark");
    root.classList.add(resolved);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const currentTheme = useUiStore.getState().theme;
      if (currentTheme === "system") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(media.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return <>{children}</>;
}
