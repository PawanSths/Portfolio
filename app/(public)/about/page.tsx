import Image from "next/image";
import { MapPin, Sparkles } from "lucide-react";
import { getPortfolioContent, publishedOnly } from "@/services/content-store";
import { PageTransition } from "@/components/page-transition";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = publishedOnly(await getPortfolioContent());

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">About Me</p>
        <h1>Computer Engineering student building intelligent AI/ML systems, autonomous LLM agents, and modern full-stack web applications.</h1>
      </div>

      <div className="about-layout">
        <div className="about-image-wrapper">
          <div className="about-image-accent" />
          <Image
            src={content.profile.avatar}
            alt={`${content.profile.name} portrait`}
            width={520}
            height={520}
            className="about-image"
            unoptimized
          />
        </div>

        <div className="about-text">
          <p className="about-bio">{content.profile.bio}</p>
          <div className="about-details">
            <div className="about-detail">
              <MapPin size={16} />
              <span>{content.profile.location}</span>
            </div>
            <div className="about-detail">
              <Sparkles size={16} />
              <span>{content.profile.availability}</span>
            </div>
          </div>

          <div className="about-highlights">
            <div className="highlight-card">
              <strong>Built</strong>
              <span>U-Net for urban sprawl — 85% accuracy</span>
            </div>
            <div className="highlight-card">
              <strong>Languages</strong>
              <span>Python, TypeScript</span>
            </div>
            <div className="highlight-card">
              <strong>Pipeline</strong>
              <span>pandas → TensorFlow → deployed API</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
