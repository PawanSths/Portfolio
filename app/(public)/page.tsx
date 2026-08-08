import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Sparkles, ExternalLink } from "lucide-react";
import { HeroActions } from "@/components/hero-actions";
import { CodeSnippet } from "@/components/code-snippet";
import { ProjectCarousel } from "@/components/project-carousel";
import { SkillOrbit } from "@/components/skill-orbit";
import { ContactForm } from "@/components/contact-form";
import { getPortfolioContent, publishedOnly } from "@/services/content-store";
import { FadeInStagger, FadeInItem } from "@/components/page-transition";
import { groupBy } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = publishedOnly(await getPortfolioContent());
  const skillGroups = groupBy(content.skills, (skill) => skill.category);

  return (
    <div className="page-home">
      <section id="home" className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-title">
            {content.profile.name.split(" ")[0]} <span>{content.profile.name.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="lead claim">Built a U-Net model predicting urban sprawl across 3 Nepali cities at 85% accuracy.</p>
          <p className="lead sub">{content.profile.shortBio}</p>
          <HeroActions resumeUrl={content.profile.resumeUrl} />
          <div className="social-row">
            {content.socials.map((social) => (
              <a className="button social" href={social.url} key={social.id} target={social.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {social.icon === "github" && <Github size={17} />}
                {social.icon === "linkedin" && <Linkedin size={17} />}
                {social.icon === "mail" && <Mail size={17} />}
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <div className="home-hero-visual">
          <CodeSnippet />
        </div>
      </section>

      <section id="about" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">About Me</p>
            <h1>I build machine learning models and turn them into full-stack applications.</h1>
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
              <div className="about-details">
                <div className="about-detail">
                  <MapPin size={13} />
                  <span>{content.profile.location}</span>
                </div>
                <div className="about-detail">
                  <Sparkles size={13} />
                  <span>{content.profile.availability}</span>
                </div>
              </div>
            </div>

            <div className="about-text">
              <p className="about-bio">{content.profile.bio}</p>
              <div className="about-highlights">
                <FadeInStagger delay={0.1}>
                  <FadeInItem>
                    <div className="highlight-card">
                      <strong>Built</strong>
                      <span>U-Net for urban sprawl — 85% accuracy</span>
                    </div>
                  </FadeInItem>
                  <FadeInItem>
                    <div className="highlight-card">
                      <strong>Languages</strong>
                      <span>Python, TypeScript</span>
                    </div>
                  </FadeInItem>
                  <FadeInItem>
                    <div className="highlight-card">
                      <strong>Pipeline</strong>
                      <span>pandas → TensorFlow → deployed API</span>
                    </div>
                  </FadeInItem>
                </FadeInStagger>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">Skills</p>
            <h1>Tools I reach for when the work is real.</h1>
          </div>
          <SkillOrbit groups={skillGroups} />
        </div>
      </section>

      <section id="projects" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">Projects</p>
            <h1>Some of my projects</h1>
          </div>
          <ProjectCarousel projects={content.projects} />
        </div>
      </section>

      <section id="experience" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">Experience</p>
            <h1>Where I have worked</h1>
          </div>
          <div className="timeline">
            {content.experience.map((entry) => (
              <FadeInItem key={entry.id}>
                <article className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-date">{entry.startDate} — {entry.endDate}</div>
                  <div className="timeline-content">
                    <h3>{entry.title}</h3>
                    <p className="timeline-org">{entry.organization} · {entry.location}</p>
                    <p>{entry.summary}</p>
                  </div>
                </article>
              </FadeInItem>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">Education</p>
            <h1>Four years of engineering, one thesis.</h1>
          </div>
          <div className="edu-grid">
            {content.education.map((entry) => (
              <FadeInItem key={entry.id}>
                <article className="edu-card">
                  <div className="edu-card-top">
                    <span className="edu-degree">{entry.title}</span>
                    <span className="edu-years">{entry.startDate} — {entry.endDate}</span>
                  </div>
                  <h3>{entry.organization}</h3>
                  <p className="edu-loc">{entry.location}</p>
                  <p>{entry.summary}</p>
                </article>
              </FadeInItem>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">Certifications</p>
            <h1>Courses that changed how I build.</h1>
          </div>
          <div className="cert-grid">
            {content.certifications.map((cert) => (
              <FadeInItem key={cert.id}>
                <article className="cert-card">
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
              </FadeInItem>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-reveal">
        <div className="page-content">
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
              <a className="button primary lg" href={`mailto:${content.profile.email}`}>
                Email me directly <ArrowUpRight size={18} />
              </a>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
