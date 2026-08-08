import { getPortfolioContent, publishedOnly } from "@/services/content-store";
import { PageTransition } from "@/components/page-transition";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const content = publishedOnly(await getPortfolioContent());

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">Experience</p>
        <h1>Where I have worked</h1>
      </div>
      <div className="timeline">
        {content.experience.map((entry) => (
          <article className="timeline-item" key={entry.id}>
            <div className="timeline-dot" />
            <div className="timeline-date">{entry.startDate} — {entry.endDate}</div>
            <div className="timeline-content">
              <h3>{entry.title}</h3>
              <p className="timeline-org">{entry.organization} · {entry.location}</p>
              <p>{entry.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </PageTransition>
  );
}
