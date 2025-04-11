"use client"

import { useState } from "react"

export function useTerminalState() {
  const [input, setInput] = useState("")
  const [currentSection, setCurrentSection] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  // File system simulation
  const [currentDirectory, setCurrentDirectory] = useState("/home/pramesh")
  const [fileSystem, setFileSystem] = useState({
    "/": {
      type: "directory",
      children: ["home", "usr", "bin", "etc"],
    },
    "/home": {
      type: "directory",
      children: ["pramesh"],
    },
    "/home/pramesh": {
      type: "directory",
      children: ["projects", "documents", "images", "readme.txt"],
    },
    "/home/pramesh/projects": {
      type: "directory",
      children: ["portfolio", "efcu", "pbm", "kiosk"],
    },
    "/home/pramesh/documents": {
      type: "directory",
      children: ["resume.pdf", "notes.md"],
    },
    "/home/pramesh/images": {
      type: "directory",
      children: ["profile.jpg", "project-screenshot.png"],
    },
    "/home/pramesh/readme.txt": {
      type: "file",
      content: "Welcome to Pramesh Basnet's terminal portfolio!\nType 'help' to see available commands.",
    },
  })

  return {
    input,
    setInput,
    currentSection,
    setCurrentSection,
    selectedProject,
    setSelectedProject,
    isProjectModalOpen,
    setIsProjectModalOpen,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    setSuggestions,
    currentDirectory,
    setCurrentDirectory,
    fileSystem,
    setFileSystem,
  }
}
