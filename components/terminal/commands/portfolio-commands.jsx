import { AboutSection } from "@/components/sections/about-section"
import { EducationSection } from "@/components/sections/education-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ResumeGenerator } from "@/components/resume-generator"
import { ContactForm } from "@/components/contact-form"

export function handlePortfolioCommands(command, { setCurrentSection, openProjectModal }) {
  const commandParts = command.split(" ")
  const mainCommand = commandParts[0].toLowerCase()

  switch (mainCommand) {
    case "about":
      setCurrentSection("about")
      return <AboutSection />

    case "education":
      setCurrentSection("education")
      return <EducationSection />

    case "skills":
      setCurrentSection("skills")
      return <SkillsSection />

    case "experience":
      setCurrentSection("experience")
      return <ExperienceSection />

    case "projects":
      setCurrentSection("projects")
      return <ProjectsSection />

    case "certifications":
      setCurrentSection("certifications")
      return <CertificationsSection />

    case "contact":
      setCurrentSection("contact")
      return <ContactSection />

    case "resume":
      setCurrentSection("resume")
      return <ResumeGenerator />

    case "message":
      setCurrentSection("message")
      return <ContactForm />

    case "project:efcu":
    case "project:pbm":
    case "project:kiosk":
      const projectId = mainCommand.split(":")[1]
      openProjectModal(projectId)
      return (
        <div className="text-green-500 font-mono">
          <p>Opening project details for {projectId.toUpperCase()}...</p>
        </div>
      )

    default:
      return null
  }
}
