"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

let notify = () => {};

function getSnapshot() {
  return localStorage.getItem("theme") || "";
}

function getServerSnapshot() {
  return "";
}

function subscribe(callback: () => void) {
  notify = callback;
  return () => { notify = () => {}; };
}

export function ThemeToggle() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const theme: "light" | "dark" = stored === "dark" ? "dark" : "light";

  useEffect(() => {
    const applied = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = applied || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.dataset.theme = next;
    notify();
  }

  return (
    <button className="icon-button" onClick={toggle} aria-label="Toggle color theme" title="Toggle theme">
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
