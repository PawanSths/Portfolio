import { getPortfolioContent, publishedOnly } from "@/lib/content-store";
import { SkillOrbit } from "@/components/skill-orbit";
import { PageTransition } from "@/components/page-transition";

export const dynamic = "force-dynamic";

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = getKey(item);
    groups[key] ||= [];
    groups[key].push(item);
    return groups;
  }, {});
}

export default async function SkillsPage() {
  const content = publishedOnly(await getPortfolioContent());
  const skillGroups = groupBy(content.skills, (skill) => skill.category);

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">Skills</p>
        <h1>A focused toolkit for AI-ready software.</h1>
      </div>
      <SkillOrbit groups={skillGroups} />
    </PageTransition>
  );
}
