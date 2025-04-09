"use client"

import { useState } from "react"
import { AsciiArt } from "@/components/ascii-art"
import { SkillFilter } from "@/components/skill-filter"

export function SkillsSection() {
  const allSkills = [
    { name: "C#", percentage: 85, category: "Programming Languages" },
    { name: ".NET", percentage: 85, category: "Frameworks" },
    { name: "JavaScript", percentage: 80, category: "Programming Languages" },
    { name: "React", percentage: 80, category: "Frameworks" },
    { name: "Next.js", percentage: 75, category: "Frameworks" },
    { name: "Flutter", percentage: 80, category: "Frameworks" },
    { name: "Dart", percentage: 75, category: "Programming Languages" },

    { name: "AWS Cognito", percentage: 80, category: "Cloud & DevOps" },
    { name: "AWS S3", percentage: 85, category: "Cloud & DevOps" },
    { name: "Git", percentage: 90, category: "Cloud & DevOps" },
    { name: "CI/CD", percentage: 75, category: "Cloud & DevOps" },
    { name: "Docker", percentage: 70, category: "Cloud & DevOps" },

    { name: "PostgreSQL", percentage: 85, category: "Databases" },
    { name: "SQL Server", percentage: 80, category: "Databases" },
    { name: "MongoDB", percentage: 70, category: "Databases" },

    { name: "Twilio", percentage: 85, category: "Integrations" },
    { name: "DocuSign", percentage: 80, category: "Integrations" },
    { name: "Payment Gateways", percentage: 75, category: "Integrations" },
    { name: "RESTful APIs", percentage: 90, category: "Integrations" },

    { name: "Visual Studio", percentage: 90, category: "Development Tools" },
    { name: "VS Code", percentage: 90, category: "Development Tools" },
    { name: "Jira", percentage: 85, category: "Development Tools" },
    { name: "Figma", percentage: 75, category: "Development Tools" },
    { name: "Postman", percentage: 85, category: "Development Tools" },

    { name: "Agile Development", percentage: 85, category: "Methodologies" },
    { name: "Test-Driven Development", percentage: 75, category: "Methodologies" },
    { name: "Responsive Design", percentage: 85, category: "Methodologies" },
    { name: "UI/UX Principles", percentage: 80, category: "Methodologies" },
  ]

  const [filteredSkills, setFilteredSkills] = useState(allSkills)

  return (
    <div className="space-y-4">
      <AsciiArt art="skills" />

      <SkillFilter skills={allSkills} onFilter={setFilteredSkills} />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="p-2 border border-primary/20 rounded bg-primary/5">
              <SkillBar name={skill.name} percentage={skill.percentage} category={skill.category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillBar({ name, percentage, category }) {
  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Programming Languages":
        return "text-blue-400"
      case "Frameworks":
        return "text-green-400"
      case "Cloud & DevOps":
        return "text-purple-400"
      case "Databases":
        return "text-yellow-400"
      case "Integrations":
        return "text-red-400"
      case "Development Tools":
        return "text-cyan-400"
      case "Methodologies":
        return "text-orange-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{name}</span>
        <span className={getCategoryColor(category)}>{category}</span>
      </div>
      <div className="flex justify-between text-xs mb-1">
        <span></span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} skill level: ${percentage}%`}
        />
      </div>
    </div>
  )
}
