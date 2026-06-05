import { z } from "zod";

const publishState = z.enum(["published", "draft"]);

export const portfolioSchema = z.object({
  profile: z.object({
    name: z.string().min(2),
    headline: z.string().min(5),
    shortBio: z.string().min(10),
    bio: z.string().min(10),
    avatar: z.string(),
    resumeUrl: z.string(),
    email: z.string().email(),
    location: z.string().min(2),
    availability: z.string()
  }),
  settings: z.object({
    siteTitle: z.string().min(2),
    metaDescription: z.string().min(10),
    theme: z.enum(["system", "light", "dark"]),
    sectionOrder: z.array(z.string())
  }),
  socials: z.array(
    z.object({
      id: z.string(),
      label: z.string().min(1),
      url: z.string().url(),
      icon: z.string()
    })
  ),
  skills: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1),
      category: z.enum(["Languages", "AI & Data", "Engineering", "Tools"]),
      level: z.number().min(1).max(100),
      featured: z.boolean(),
      status: publishState
    })
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1),
      summary: z.string().min(10),
      description: z.string().min(10),
      stack: z.array(z.string()),
      image: z.string(),
      liveUrl: z.string().url().optional().or(z.literal("")),
      repoUrl: z.string().url().optional().or(z.literal("")),
      featured: z.boolean(),
      status: publishState
    })
  ),
  education: z.array(timelineSchema()),
  experience: z.array(timelineSchema()),
  achievements: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1),
      summary: z.string().min(5),
      year: z.string(),
      status: publishState
    })
  ),
  certifications: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1),
      issuer: z.string().min(1),
      date: z.string(),
      credentialUrl: z.string(),
      summary: z.string().min(5),
      status: publishState
    })
  ),
  media: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
      type: z.string(),
      size: z.number(),
      uploadedAt: z.string()
    })
  )
});

function timelineSchema() {
  return z.object({
    id: z.string(),
    title: z.string().min(1),
    organization: z.string().min(1),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    summary: z.string().min(5),
    status: publishState
  });
}
