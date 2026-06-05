import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getPortfolioContent, publishedOnly } from "@/lib/content-store";
import { PageTransition } from "@/components/page-transition";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const content = publishedOnly(await getPortfolioContent());

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">Projects</p>
        <h1>Selected project stories.</h1>
      </div>
      <div className="project-grid">
        {content.projects.map((project) => (
          <article className="project-card tilt-card" key={project.id}>
            <div className="project-image-wrapper">
              <Image src={project.image} alt={`${project.title} visual`} width={720} height={450} />
              {project.repoUrl && (
                <a className="project-link-badge" href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="View source">
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
    </PageTransition>
  );
}
