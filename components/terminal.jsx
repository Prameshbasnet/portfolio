"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { TerminalIcon, User, Briefcase, Code, GraduationCap, Shield, FolderOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AboutSection } from "@/components/sections/about-section"
import { EducationSection } from "@/components/sections/education-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ImageAsciiLogo } from "@/components/image-ascii-logo"
import { ResumeGenerator } from "@/components/resume-generator"
import { MiniGame } from "@/components/mini-game"
import { ContactForm } from "@/components/contact-form"
import { TypingEffect } from "@/components/typing-effect"
import { ProjectModal } from "@/components/project-modal"

// Project details for the modal
const projectsData = [
  {
    id: "efcu",
    title: "Online Digital Member Onboarding Solution (EFCU)",
    description:
      "A comprehensive online platform enabling users to open accounts and apply for loans (individual and business).",
    technologies: [".NET", "Next.js", "AWS Cognito", "AWS S3", "Twilio", "DocuSign"],
    features: [
      "Secure authentication mechanism using AWS Cognito",
      "Seamless file storage via AWS S3",
      "OTP-based verification with Twilio",
      "Electronic document signatures with DocuSign",
      "Individual and business loan application workflows",
      "Responsive design for all devices",
    ],
    image: "/placeholder.svg?height=300&width=600",
    demoUrl: "https://example.com/efcu-demo",
    repoUrl: "https://github.com/prameshbasnet1/efcu-onboarding",
  },
  {
    id: "pbm",
    title: "Prabhu Budget Management System (PBM)",
    description:
      "Robust backend systems for budget tracking and financial management with an intuitive React dashboard.",
    technologies: [".NET", "React", "PostgreSQL", "RESTful API"],
    features: [
      "Budget tracking and visualization",
      "Financial reporting and analytics",
      "User role management",
      "Expense categorization",
      "Budget forecasting",
      "Data export capabilities",
    ],
    image: "/placeholder.svg?height=300&width=600",
    demoUrl: "https://example.com/pbm-demo",
    repoUrl: "https://github.com/prameshbasnet1/pbm-system",
  },
  {
    id: "kiosk",
    title: "Kiosk Application",
    description: "A self-service kiosk application for cheque deposit, account statements, and account management.",
    technologies: ["Flutter", "React", "Windows API"],
    features: [
      "Cheque deposit functionality",
      "Account statement generation",
      "Old-to-new account number migration",
      "Admin dashboard for system management",
      "Reporting functionalities",
      "User activity tracking",
    ],
    image: "/placeholder.svg?height=300&width=600",
    demoUrl: "https://example.com/kiosk-demo",
    repoUrl: "https://github.com/prameshbasnet1/kiosk-app",
  },
]

export default function Terminal() {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentSection, setCurrentSection] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [currentDirectory, setCurrentDirectory] = useState("C:\\Users\\pramesh")
  const [fileSystem, setFileSystem] = useState({
    "C:": {
      Users: {
        pramesh: {
          Documents: {
            projects: {
              "efcu.txt": "Online Digital Member Onboarding Solution for EFCU",
              "pbm.txt": "Prabhu Budget Management System",
              "kiosk.txt": "Kiosk Application for self-service banking",
            },
          },
          Desktop: {},
          Downloads: {},
        },
      },
      "Program Files": {
        dev: {
          tools: {
            vscode: "Visual Studio Code",
            git: "Git version control",
            node: "Node.js runtime",
          },
        },
      },
    },
  })

  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  // Use useCallback to memoize the scrollToBottom function
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    // Focus input on mount and when clicking anywhere in the terminal
    inputRef.current?.focus()

    const handleClick = () => {
      inputRef.current?.focus()
    }

    document.addEventListener("click", handleClick)

    // Add welcome message
    setCommandHistory([
      {
        input: "welcome",
        output: (
          <div className="space-y-2">
            <ImageAsciiLogo />
            <p className="font-mono text-white">
              <TypingEffect
                text="Welcome to Pramesh Basnet's software developer portfolio! Type help to see available commands."
                speed={30}
              />
            </p>
          </div>
        ),
        timestamp: new Date(),
      },
    ])

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [commandHistory, currentSection, scrollToBottom])

  const openProjectModal = (projectId) => {
    const project = projectsData.find((p) => p.id === projectId)
    if (project) {
      setSelectedProject(project)
      setIsProjectModalOpen(true)
    }
  }

  const getPathContent = (path) => {
    const parts = path.split("\\").filter((p) => p)
    let current = fileSystem

    for (const part of parts) {
      if (current[part]) {
        current = current[part]
      } else {
        return null
      }
    }

    return current
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const command = input.trim().toLowerCase()
    let output
    const commandParts = command.split(" ")
    const mainCommand = commandParts[0]

    // Process command
    switch (mainCommand) {
      case "help":
        output = (
          <div className="space-y-2 text-white">
            <p className="font-bold">Available commands:</p>
            <ul className="space-y-1">
              <li>
                <span className="text-white font-bold">about</span> - Learn about Pramesh
              </li>
              <li>
                <span className="text-white font-bold">education</span> - View educational background
              </li>
              <li>
                <span className="text-white font-bold">skills</span> - See technical skills
              </li>
              <li>
                <span className="text-white font-bold">experience</span> - View work experience
              </li>
              <li>
                <span className="text-white font-bold">projects</span> - View projects
              </li>
              <li>
                <span className="text-white font-bold">certifications</span> - View additional skills and interests
              </li>
              <li>
                <span className="text-white font-bold">contact</span> - Get contact information
              </li>
              <li>
                <span className="text-white font-bold">resume</span> - Download my resume
              </li>
              <li>
                <span className="text-white font-bold">message</span> - Send me a message
              </li>
              <li>
                <span className="text-white font-bold">game</span> - Play a mini-game
              </li>
              <li>
                <span className="text-white font-bold">project:efcu</span> - View EFCU project details
              </li>
              <li>
                <span className="text-white font-bold">project:pbm</span> - View PBM project details
              </li>
              <li>
                <span className="text-white font-bold">project:kiosk</span> - View Kiosk project details
              </li>
              <li>
                <span className="text-white font-bold">clear</span> - Clear the terminal
              </li>
              <li>
                <span className="text-white font-bold">dir</span> - List directory contents
              </li>
              <li>
                <span className="text-white font-bold">cd [path]</span> - Change directory
              </li>
              <li>
                <span className="text-white font-bold">type [file]</span> - Display file contents
              </li>
              <li>
                <span className="text-white font-bold">echo [text]</span> - Display text
              </li>
              <li>
                <span className="text-white font-bold">systeminfo</span> - Display system information
              </li>
              <li>
                <span className="text-white font-bold">ver</span> - Display system version
              </li>
            </ul>
          </div>
        )
        setCurrentSection(null)
        break

      case "about":
        output = <AboutSection />
        setCurrentSection("about")
        break

      case "education":
        output = <EducationSection />
        setCurrentSection("education")
        break

      case "skills":
        output = <SkillsSection />
        setCurrentSection("skills")
        break

      case "experience":
        output = <ExperienceSection />
        setCurrentSection("experience")
        break

      case "projects":
        output = <ProjectsSection />
        setCurrentSection("projects")
        break

      case "certifications":
        output = <CertificationsSection />
        setCurrentSection("certifications")
        break

      case "contact":
        output = <ContactSection />
        setCurrentSection("contact")
        break

      case "resume":
        output = <ResumeGenerator />
        setCurrentSection("resume")
        break

      case "message":
        output = <ContactForm />
        setCurrentSection("message")
        break

      case "game":
        output = <MiniGame />
        setCurrentSection("game")
        break

      case "project:efcu":
        output = (
          <div className="text-white">
            <p>Opening project details for Online Digital Member Onboarding Solution (EFCU)...</p>
          </div>
        )
        openProjectModal("efcu")
        setCurrentSection(null)
        break

      case "project:pbm":
        output = (
          <div className="text-white">
            <p>Opening project details for Prabhu Budget Management System...</p>
          </div>
        )
        openProjectModal("pbm")
        setCurrentSection(null)
        break

      case "project:kiosk":
        output = (
          <div className="text-white">
            <p>Opening project details for Kiosk Application...</p>
          </div>
        )
        openProjectModal("kiosk")
        setCurrentSection(null)
        break

      case "clear":
        setCommandHistory([])
        setCurrentSection(null)
        setInput("")
        return

      case "dir":
        const currentContent = getPathContent(currentDirectory)
        if (currentContent) {
          output = (
            <div className="text-white">
              <p>Directory of {currentDirectory}</p>
              <p className="text-muted-foreground text-xs">
                {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
              </p>
              <div className="mt-2 grid grid-cols-1 gap-1">
                {Object.keys(currentContent).map((item, index) => (
                  <div key={index} className="flex items-center">
                    {typeof currentContent[item] === "object" ? (
                      <FolderOpen className="h-4 w-4 mr-2 text-yellow-400" />
                    ) : (
                      <FileText className="h-4 w-4 mr-2 text-blue-400" />
                    )}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2">{Object.keys(currentContent).length} File(s)</p>
            </div>
          )
        } else {
          output = <p className="text-white">Invalid directory path.</p>
        }
        setCurrentSection(null)
        break

      case "cd":
        if (commandParts.length === 1) {
          output = <p className="text-white">{currentDirectory}</p>
        } else {
          const targetDir = commandParts.slice(1).join(" ")
          if (targetDir === "..") {
            const dirParts = currentDirectory.split("\\")
            if (dirParts.length > 1) {
              const newDir = dirParts.slice(0, -1).join("\\")
              setCurrentDirectory(newDir)
              output = <p className="text-white">{newDir}</p>
            } else {
              output = <p className="text-white">Cannot go up from root directory.</p>
            }
          } else if (targetDir === "\\") {
            setCurrentDirectory("C:")
            output = <p className="text-white">C:</p>
          } else {
            const currentContent = getPathContent(currentDirectory)
            if (currentContent && currentContent[targetDir] && typeof currentContent[targetDir] === "object") {
              const newDir = `${currentDirectory}\\${targetDir}`
              setCurrentDirectory(newDir)
              output = <p className="text-white">{newDir}</p>
            } else {
              output = <p className="text-white">The system cannot find the path specified.</p>
            }
          }
        }
        setCurrentSection(null)
        break

      case "type":
        if (commandParts.length < 2) {
          output = <p className="text-white">The syntax of the command is incorrect.</p>
        } else {
          const fileName = commandParts[1]
          const currentContent = getPathContent(currentDirectory)
          if (currentContent && currentContent[fileName] && typeof currentContent[fileName] === "string") {
            output = <p className="text-white">{currentContent[fileName]}</p>
          } else {
            output = <p className="text-white">The system cannot find the file specified.</p>
          }
        }
        setCurrentSection(null)
        break

      case "echo":
        if (commandParts.length < 2) {
          output = <p className="text-white"></p>
        } else {
          const text = commandParts.slice(1).join(" ")
          output = <p className="text-white">{text}</p>
        }
        setCurrentSection(null)
        break

      case "systeminfo":
        output = (
          <div className="text-white space-y-1">
            <p>Host Name: PRAMESH-PC</p>
            <p>OS Name: Portfolio OS</p>
            <p>OS Version: 1.0.0</p>
            <p>OS Manufacturer: Pramesh Basnet</p>
            <p>System Type: Web-based x64-based PC</p>
            <p>Processor(s): 1 Processor(s) Installed.</p>
            <p>System Directory: C:\Windows\system32</p>
            <p>Domain: prameshbasnet.com.np</p>
            <p>Total Physical Memory: 16,384 MB</p>
            <p>Available Physical Memory: 8,192 MB</p>
            <p>Virtual Memory: Max Size: 32,768 MB</p>
            <p>Network Card(s): 1 NIC(s) Installed.</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "ver":
        output = (
          <p className="text-white">
            Portfolio OS [Version 1.0.0]
            <br />
            (c) 2024 Pramesh Basnet. All rights reserved.
          </p>
        )
        setCurrentSection(null)
        break

      default:
        output = (
          <p className="text-white">
            '{command}' is not recognized as an internal or external command, operable program or batch file. Type{" "}
            <span className="text-white font-bold">help</span> to see available commands.
          </p>
        )
        setCurrentSection(null)
    }

    // Add command to history
    setCommandHistory((prev) => [
      ...prev,
      {
        input: command,
        output,
        timestamp: new Date(),
      },
    ])

    // Reset input and history index
    setInput("")
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e) => {
    // Handle up/down arrows for command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-black border border-white/30 rounded-t-md p-2 flex items-center">
        <TerminalIcon className="h-4 w-4 text-white mr-2" />
        <span className="text-sm font-mono text-white">
          {currentDirectory}
          {">"} {currentSection ? `/${currentSection}` : ""}
        </span>
      </div>

      <div ref={terminalRef} className="flex-1 bg-black border-x border-white/30 p-4 overflow-y-auto font-mono text-sm">
        {commandHistory.map((cmd, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center text-white/70">
              <span className="text-white mr-2">
                {currentDirectory}
                {">"}
              </span>
              <span>{cmd.input}</span>
            </div>
            <div className="mt-1 ml-4">{cmd.output}</div>
          </div>
        ))}
      </div>

      <div className="bg-black border border-white/30 rounded-b-md p-2">
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-white mr-2">
            {currentDirectory}
            {">"}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none font-mono text-white"
            aria-label="Terminal input"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>

      <nav className="mt-4 flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setInput("about")
            handleSubmit({ preventDefault: () => {} })
          }}
          className="text-xs bg-black/50 hover:bg-black/70 text-white border-white/30"
        >
          <User className="h-3 w-3 mr-1" />
          About
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setInput("education")
            handleSubmit({ preventDefault: () => {} })
          }}
          className="text-xs bg-black/50 hover:bg-black/70 text-white border-white/30"
        >
          <GraduationCap className="h-3 w-3 mr-1" />
          Education
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setInput("skills")
            handleSubmit({ preventDefault: () => {} })
          }}
          className="text-xs bg-black/50 hover:bg-black/70 text-white border-white/30"
        >
          <Shield className="h-3 w-3 mr-1" />
          Skills
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setInput("experience")
            handleSubmit({ preventDefault: () => {} })
          }}
          className="text-xs bg-black/50 hover:bg-black/70 text-white border-white/30"
        >
          <Briefcase className="h-3 w-3 mr-1" />
          Experience
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setInput("projects")
            handleSubmit({ preventDefault: () => {} })
          }}
          className="text-xs bg-black/50 hover:bg-black/70 text-white border-white/30"
        >
          <Code className="h-3 w-3 mr-1" />
          Projects
        </Button>
      </nav>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  )
}

