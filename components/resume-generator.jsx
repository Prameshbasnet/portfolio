"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export function ResumeGenerator() {
  const [generating, setGenerating] = useState(false)

  const generateResume = () => {
    setGenerating(true)

    // Simulate generation delay
    setTimeout(() => {
      // In a real implementation, this would generate a PDF
      // For now, we'll just link to a hypothetical resume file
      const link = document.createElement("a")
      link.href = "/pramesh-basnet-resume.pdf"
      link.download = "pramesh-basnet-resume.pdf"
      link.click()

      setGenerating(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="p-4 border border-primary/30 rounded bg-primary/5">
        <h3 className="text-primary font-bold mb-2">Download Resume</h3>
        <p className="text-sm mb-4">
          Generate a PDF version of my resume with all the information from this portfolio.
        </p>
        <Button
          onClick={generateResume}
          disabled={generating}
          className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
        >
          <FileDown className="h-4 w-4" />
          {generating ? "Generating..." : "Download Resume"}
        </Button>
      </div>
    </div>
  )
}

