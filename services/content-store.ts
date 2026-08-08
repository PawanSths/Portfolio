import { promises as fs } from "fs";
import path from "path";
import { portfolioSchema } from "@/lib/content-schema";
import { defaultContent } from "@/lib/default-content";
import { getCloudContent, saveCloudContent } from "@/services/cloud-store";
import type { PortfolioContent } from "@/types/content";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "portfolio.json");

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const cloud = await getCloudContent();
  if (cloud) return cloud;

  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf8");
  const parsed = portfolioSchema.safeParse(JSON.parse(raw));

  if (!parsed.success) {
    return defaultContent;
  }

  return parsed.data;
}

export async function savePortfolioContent(content: PortfolioContent) {
  const parsed = portfolioSchema.parse(content);

  await fs.mkdir(dataDir, { recursive: true });
  const tmpFile = `${dataFile}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(parsed, null, 2));
  await fs.rename(tmpFile, dataFile);

  await saveCloudContent(parsed);

  return parsed;
}

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(defaultContent, null, 2));
  }
}

export function publishedOnly(content: PortfolioContent): PortfolioContent {
  return {
    ...content,
    skills: content.skills.filter((item) => item.status === "published"),
    projects: content.projects.filter((item) => item.status === "published"),
    education: content.education.filter((item) => item.status === "published"),
    experience: content.experience.filter((item) => item.status === "published"),
    achievements: content.achievements.filter((item) => item.status === "published"),
    certifications: content.certifications.filter((item) => item.status === "published")
  };
}
