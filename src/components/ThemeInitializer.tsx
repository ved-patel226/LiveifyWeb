"use client";

import { useLayoutEffect } from "react";

export default function ThemeInitializer() {
  useLayoutEffect(() => {
    try {
      if (
        localStorage.getItem("fumadocs-theme") === "dark" ||
        (!("fumadocs-theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      }
    } catch (e) {}
  }, []);

  return null;
}
