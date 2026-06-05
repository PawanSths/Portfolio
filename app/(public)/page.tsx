import Image from "next/image";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Sparkles, ExternalLink } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";
import { SkillOrbit } from "@/components/skill-orbit";
import { ContactForm } from "@/components/contact-form";
import { getPortfolioContent, publishedOnly } from "@/lib/content-store";
import { FadeInStagger, FadeInItem } from "@/components/page-transition";

export const dynamic = "force-dynamic";

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = getKey(item);
    groups[key] ||= [];
    groups[key].push(item);
    return groups;
  }, {});
}

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
          <p className="lead">{content.profile.headline}</p>
          <p className="lead sub">{content.profile.shortBio}</p>
          <div className="hero-actions">
            <a className="button primary lg" href="#projects">
              View projects <ArrowUpRight size={18} />
            </a>
            <a className="button lg" href={content.profile.resumeUrl} download>
              <Download size={18} /> Resume
            </a>
          </div>
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
          <div className="hero-stats">
            <div className="stat"><strong>{content.projects.length}+</strong><span>Projects</span></div>
            <div className="stat"><strong>{content.skills.length}</strong><span>Skills</span></div>
            <div className="stat"><strong>B.E.</strong><span>Computer Eng.</span></div>
          </div>
        </div>
        <div className="home-hero-visual glow-pulse">
          <HeroScene />
        </div>
      </section>

      <section id="about" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">About Me</p>
            <h1>Engineering mindset, data curiosity, practical software taste.</h1>
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
                      <strong>Focus</strong>
                      <span>AI, ML, Data Science</span>
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
                      <strong>Tools</strong>
                      <span>Jupyter, Git, VS Code</span>
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
            <h1>A focused toolkit for AI-ready software.</h1>
          </div>
          <SkillOrbit groups={skillGroups} />
        </div>
      </section>

      <section id="projects" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">Projects</p>
            <h1>Selected project stories.</h1>
          </div>
          <div className="project-grid">
            {content.projects.map((project) => (
              <FadeInItem key={project.id}>
                <article className="project-card tilt-card">
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
              </FadeInItem>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">Experience</p>
            <h1>Professional experience.</h1>
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
            <h1>Academic background.</h1>
          </div>
          <div className="timeline">
            {content.education.map((entry) => (
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

      <section id="certifications" className="section-reveal">
        <div className="page-content">
          <div className="page-header">
            <p className="eyebrow">Certifications</p>
            <h1>Credentials & courses.</h1>
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
                      View credential <ExternalLink size={14} />
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
            <h1>Get in touch.</h1>
          </div>
          <div className="contact-layout">
            <div className="contact-info">
              <p className="lead">Reach out directly by email or drop a message below.</p>
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
                Send email <ArrowUpRight size={18} />
              </a>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
