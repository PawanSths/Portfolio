import { getPortfolioContent, publishedOnly } from "@/services/content-store";
import { PageTransition } from "@/components/page-transition";

export const dynamic = "force-dynamic";

export default async function EducationPage() {
  const content = publishedOnly(await getPortfolioContent());

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">Education</p>
        <h1>Four years of engineering, one thesis.</h1>
      </div>
      <div className="edu-grid">
        {content.education.map((entry) => (
          <article className="edu-card" key={entry.id}>
            <div className="edu-card-top">
              <span className="edu-degree">{entry.title}</span>
              <span className="edu-years">{entry.startDate} — {entry.endDate}</span>
            </div>
            <h3>{entry.organization}</h3>
            <p className="edu-loc">{entry.location}</p>
            <p>{entry.summary}</p>
          </article>
        ))}
      </div>
    </PageTransition>
  );
}
