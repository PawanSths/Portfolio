"use client";

import { useEffect, useRef } from "react";

export function TiltCards() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".tilt-card");

    function handleMove(e: MouseEvent, card: HTMLElement) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    }

    function handleLeave(card: HTMLElement) {
      card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    }

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => handleMove(e, card));
      card.addEventListener("mouseleave", () => handleLeave(card));
    });

    return () => {
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true));
      });
    };
  }, []);

  return null;
}
