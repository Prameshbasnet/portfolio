"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function SkillFilter({ skills, onFilter }) {
  const [activeFilter, setActiveFilter] = useState(null)

  const categories = Array.from(new Set(skills.map((skill) => skill.category)))

  const handleFilter = (category) => {
    setActiveFilter(category)

    if (category === null) {
      onFilter(skills)
    } else {
      const filtered = skills.filter((skill) => skill.category === category)
      onFilter(filtered)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleFilter(null)}
        className={`text-xs ${
          activeFilter === null
            ? "bg-primary/20 text-primary border-primary/30"
            : "bg-black/50 hover:bg-black/70 text-white border-white/30"
        }`}
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          onClick={() => handleFilter(category)}
          className={`text-xs ${
            activeFilter === category
              ? "bg-primary/20 text-primary border-primary/30"
              : "bg-black/50 hover:bg-black/70 text-white border-white/30"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
