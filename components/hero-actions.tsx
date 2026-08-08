"use client";

import { Download } from "lucide-react";

export function HeroActions({ resumeUrl }: { resumeUrl: string }) {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero-actions">
      <a className="button lg" href="#projects" onClick={scrollToProjects}>
        View Projects
      </a>
      <a className="button primary lg" href={resumeUrl} download>
        <Download size={18} /> Resume
      </a>
    </div>
  );
}
