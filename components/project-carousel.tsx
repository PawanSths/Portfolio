"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

type CarouselProject = {
  id: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  image: string;
  repoUrl?: string;
};

export function ProjectCarousel({ projects }: { projects: CarouselProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScroll(track.scrollWidth > track.clientWidth + 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".project-card");
    // Advance by one full card including its gap.
    const step = card ? card.offsetWidth + 20 : 380;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="project-carousel">
      <div className="project-track" ref={trackRef} tabIndex={0} aria-label="Project carousel, scroll horizontally">
        {projects.map((project) => (
          <article className="project-card tilt-card" key={project.id}>
            <div className="project-image-wrapper">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                width={720}
                height={450}
              />
              {project.repoUrl && (
                <a
                  className="project-link-badge"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source on GitHub`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <p className="project-desc">{project.description}</p>
              <div className="tag-row">
                {project.stack.map((tech) => (
                  <span className="tag" key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      {canScroll && (
        <div className="carousel-nav">
          <button
            className="carousel-arrow"
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous projects"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="carousel-arrow"
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next projects"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
