import { Mail, MapPin } from "lucide-react";
import { getPortfolioContent, publishedOnly } from "@/services/content-store";
import { PageTransition } from "@/components/page-transition";
import { ContactForm } from "@/components/contact-form";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = publishedOnly(await getPortfolioContent());

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">Contact</p>
        <h1>Let&rsquo;s build something together.</h1>
      </div>
      <div className="contact-layout">
        <div className="contact-info">
          <p className="lead">Have a project, a role, or an idea you&rsquo;d like to talk about? I&rsquo;d love to hear from you.</p>
          <div className="contact-details">
            <div className="contact-detail">
              <Mail size={18} />
              <a href={`mailto:${content.profile.email}`}>{content.profile.email}</a>
            </div>
            <div className="contact-detail">
              <MapPin size={18} />
              <span>{content.profile.location}</span>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </PageTransition>
  );
}
