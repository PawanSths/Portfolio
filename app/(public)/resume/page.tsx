import { Download } from "lucide-react";
import { getPortfolioContent, publishedOnly } from "@/services/content-store";
import { PageTransition } from "@/components/page-transition";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const content = publishedOnly(await getPortfolioContent());

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">Resume</p>
        <h1>Download my resume.</h1>
      </div>
      <div className="resume-viewer">
        <div className="resume-actions">
          <a className="button primary lg" href={content.profile.resumeUrl} download>
            <Download size={18} /> Download PDF
          </a>
        </div>
        <div className="resume-embed">
          <iframe
            src={content.profile.resumeUrl}
            title="Pawan Shrestha Resume"
            className="resume-iframe"
          />
        </div>
      </div>
    </PageTransition>
  );
}
