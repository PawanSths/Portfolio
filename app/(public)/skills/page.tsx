import { getPortfolioContent, publishedOnly } from "@/services/content-store";
import { SkillOrbit } from "@/components/skill-orbit";
import { PageTransition } from "@/components/page-transition";
import { groupBy } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const content = publishedOnly(await getPortfolioContent());
  const skillGroups = groupBy(content.skills, (skill) => skill.category);

  return (
    <PageTransition className="page-content">
      <div className="page-header">
        <p className="eyebrow">Skills</p>
        <h1>Tools I reach for when the work is real.</h1>
      </div>
      <SkillOrbit groups={skillGroups} />
    </PageTransition>
  );
}
