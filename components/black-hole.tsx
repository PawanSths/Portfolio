"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const SECTIONS = ["about", "skills", "projects", "experience", "education", "certifications", "contact"];
const APPEAR_CHANCE = 0.4; // 40% chance per session — keep it a surprise
const MIN_DELAY = 15000; // 15 seconds
const MAX_DELAY = 45000; // 45 seconds

export function BlackHole() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sucking, setSucking] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const prefersReducedMotion = useRef(false);
  const hasSections = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Only meaningful on pages that actually have the section anchors
    // (the single-page home route). Standalone pages like /about have none.
    hasSections.current = SECTIONS.some((id) => document.getElementById(id));
    if (!hasSections.current) return;

    if (Math.random() > APPEAR_CHANCE) return;

    // Random delay between 15–45 seconds after load.
    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);

    const timeout = setTimeout(() => {
      const margin = 48;
      const x = margin + Math.random() * (window.innerWidth - 96 - margin * 2);
      const y = margin + Math.random() * (window.innerHeight - 96 - margin * 2);
      setPosition({ x, y });
      setVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const getRandomSection = useCallback(() => {
    // Identify which section currently owns the viewport.
    const current =
      SECTIONS.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
      }) || SECTIONS[0];

    const candidates = SECTIONS.filter((s) => s !== current);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, []);

  const handleActivate = useCallback(() => {
    if (sucking || !visible || !hasSections.current) return;

    const target = getRandomSection();
    const el = document.getElementById(target);
    setSucking(true);
    setShowOverlay(true);

    const finish = () => {
      setVisible(false);
      setShowOverlay(false);
      // Fade the toast out after a moment; it self-animates via CSS anyway.
      setTimeout(() => setToastMessage(null), 3600);
    };

    if (prefersReducedMotion.current) {
      el?.scrollIntoView({ behavior: "auto" });
      setToastMessage(`Pulled into ${target}`);
      setTimeout(finish, 300);
      return;
    }

    // Wait for the suck-in animation, then scroll and confirm.
    setTimeout(() => {
      el?.scrollIntoView({ behavior: "smooth" });
      setToastMessage(`Pulled into ${target}`);
      setTimeout(finish, 900);
    }, 800);
  }, [sucking, visible, getRandomSection]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleActivate();
      }
    },
    [handleActivate]
  );

  if (!visible) return null;

  return (
    <>
      {/* Full-viewport distortion — the gravity well that pulls the page in */}
      <div
        className={`black-hole-overlay ${showOverlay ? "active" : ""}`}
        aria-hidden="true"
        style={{
          background:
            showOverlay
              ? `radial-gradient(circle at ${position.x}px ${position.y}px, transparent 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.98) 100%)`
              : undefined
        }}
      />

      <button
        className={`black-hole ${visible ? "visible" : ""} ${sucking ? "sucking" : ""}`}
        style={{ left: position.x, top: position.y }}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        aria-label="Hidden easter egg — click to teleport"
        role="button"
        type="button"
      />

      {toastMessage && (
        <div className="black-hole-toast" role="status">
          You got pulled into <strong>{toastMessage}</strong>
        </div>
      )}
    </>
  );
}
