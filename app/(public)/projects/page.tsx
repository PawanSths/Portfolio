import { getPortfolioContent, publishedOnly } from "@/services/content-store";
import { PageTransition } from "@/components/page-transition";
import { ProjectCarousel } from "@/components/project-carousel";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const content = publishedOnly(await getPortfolioContent());

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">Projects</p>
        <h1>Some of my projects</h1>
      </div>
      <ProjectCarousel projects={content.projects} />
    </PageTransition>
  );
}
