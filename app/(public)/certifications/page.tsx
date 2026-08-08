import { ExternalLink } from "lucide-react";
import { getPortfolioContent, publishedOnly } from "@/services/content-store";
import { PageTransition } from "@/components/page-transition";

export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  const content = publishedOnly(await getPortfolioContent());

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">Certifications</p>
        <h1>Courses that changed how I build.</h1>
      </div>
      <div className="cert-grid">
        {content.certifications.map((cert) => (
          <article className="cert-card" key={cert.id}>
            <div className="cert-header">
              <div className="cert-issuer">{cert.issuer}</div>
              <div className="cert-date">{cert.date}</div>
            </div>
            <h3>{cert.title}</h3>
            <p>{cert.summary}</p>
            {cert.credentialUrl && (
              <a className="cert-link" href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                Verify on {cert.issuer} <ExternalLink size={14} />
              </a>
            )}
          </article>
        ))}
      </div>
    </PageTransition>
  );
}
