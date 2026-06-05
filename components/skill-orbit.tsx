"use client";

import { motion } from "framer-motion";
import { Code, Brain, Wrench, Cog } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Languages": <Code size={14} />,
  "AI & Data": <Brain size={14} />,
  "Tools": <Wrench size={14} />,
  "Engineering": <Cog size={14} />
};

const categoryColors: Record<string, string> = {
  "Languages": "var(--accent)",
  "AI & Data": "var(--accent-3)",
  "Tools": "var(--accent-2)",
  "Engineering": "#8b5cf6"
};

export function SkillOrbit({ groups }: { groups: Record<string, { id: string; name: string; category: string }[]> }) {
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
            {categoryIcons[category] || <Cog size={14} />}
            <span>{category}</span>
          </div>
          <div className="skill-orbit-pills">
            {skills.map((skill, i) => (
              <motion.span
                className="skill-pill"
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: gi * 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.08, y: -3 }}
                style={{ "--pill-color": categoryColors[category] || "var(--accent)" } as React.CSSProperties}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
