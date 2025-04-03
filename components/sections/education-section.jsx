import { AsciiArt } from "@/components/ascii-art"

export function EducationSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="education" />

      <div className="space-y-6">
        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Tribhuvan University, Nepal</h3>
          <p className="text-sm">Bachelor in Computer Application</p>
          <p className="text-xs text-muted-foreground">August 2021 - Expected Completion: 2025</p>
          <div className="mt-2">
            <h4 className="text-sm font-semibold">Relevant Coursework:</h4>
            <ul className="text-xs mt-1 space-y-1 list-disc pl-4">
              <li>Software Engineering</li>
              <li>Database Management Systems</li>
              <li>Web Development</li>
              <li>Mobile Application Development</li>
              <li>Object-Oriented Programming</li>
              <li>Data Structures and Algorithms</li>
              <li>Cloud Computing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

