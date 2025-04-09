"use client"

import { createContext, useState, useEffect } from "react"

export const TerminalContext = createContext({
  currentDirectory: "/home/pramesh",
  setCurrentDirectory: () => {},
  fileSystem: {},
  setFileSystem: () => {},
  apiState: {},
  setApiState: () => {},
})

export function TerminalProvider({ children }) {
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

  // API state for caching API responses
  const [apiState, setApiState] = useState({
    weather: null,
    ip: null,
    crypto: null,
    news: null,
    quote: null,
    joke: null,
    fortune: null,
    lastUpdated: {},
  })

  // Load file system from localStorage on mount
  useEffect(() => {
    try {
      const savedFileSystem = localStorage.getItem("terminal-file-system")
      if (savedFileSystem) {
        setFileSystem(JSON.parse(savedFileSystem))
      }

      const savedDirectory = localStorage.getItem("terminal-current-directory")
      if (savedDirectory) {
        setCurrentDirectory(savedDirectory)
      }

      const savedApiState = localStorage.getItem("terminal-api-state")
      if (savedApiState) {
        setApiState(JSON.parse(savedApiState))
      }
    } catch (error) {
      console.error("Failed to load terminal state:", error)
    }
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("terminal-file-system", JSON.stringify(fileSystem))
      localStorage.setItem("terminal-current-directory", currentDirectory)
      localStorage.setItem("terminal-api-state", JSON.stringify(apiState))
    } catch (error) {
      console.error("Failed to save terminal state:", error)
    }
  }, [fileSystem, currentDirectory, apiState])

  return (
    <TerminalContext.Provider
      value={{
        currentDirectory,
        setCurrentDirectory,
        fileSystem,
        setFileSystem,
        apiState,
        setApiState,
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}
