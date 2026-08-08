"use client";

import { motion } from "framer-motion";
import { Code, Layers, Database, Wrench, Lightbulb } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Languages": <Code size={14} />,
  "Frameworks & Libraries": <Layers size={14} />,
  "Databases": <Database size={14} />,
  "Developer Tools": <Wrench size={14} />,
  "Concepts": <Lightbulb size={14} />
};

// Shades of the same ochre family — warm, but distinct enough per category
const categoryColors: Record<string, string> = {
  "Languages": "#d4a574",
  "Frameworks & Libraries": "#b8956a",
  "Databases": "#c49a6c",
  "Developer Tools": "#a67c52",
  "Concepts": "#e0b98a"
};

// Skill pills grow with proficiency — most-used tools physically stand out
const pillSizes: Record<string, { padding: string; fontSize: string }> = {
  high: { padding: "12px 24px", fontSize: "1rem" },
  medium: { padding: "10px 20px", fontSize: "0.95rem" },
  low: { padding: "8px 16px", fontSize: "0.88rem" }
};

function sizeForLevel(level: number) {
  if (level >= 85) return pillSizes.high;
  if (level >= 75) return pillSizes.medium;
  return pillSizes.low;
}

export function SkillOrbit({ groups }: { groups: Record<string, { id: string; name: string; category: string; level?: number }[]> }) {
  return (
    <div className="skill-orbit">
      {Object.entries(groups).map(([category, skills], gi) => (
        <motion.div
          className="skill-orbit-group"
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: gi * 0.1 }}
        >
          <div className="skill-orbit-label" style={{ color: categoryColors[category] || "var(--accent)" }}>
            {categoryIcons[category] || <Code size={14} />}
            <span>{category}</span>
          </div>
          <div className="skill-orbit-pills">
            {skills.map((skill, i) => {
              const size = sizeForLevel(skill.level ?? 75);
              return (
                <motion.span
                  className="skill-pill"
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: gi * 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  style={{
                    padding: size.padding,
                    fontSize: size.fontSize,
                    "--pill-color": categoryColors[category] || "var(--accent)"
                  } as React.CSSProperties}
                >
                  {skill.name}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
