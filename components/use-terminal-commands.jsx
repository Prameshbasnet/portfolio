"use client"

import { useEffect } from "react"
import { projectsData } from "../data/projects-data"
import { commandCategories } from "../data/command-categories"
import {
  handlePortfolioCommands,
  handleSystemCommands,
  handleToolCommands,
  handleFileSystemCommands,
} from "../commands"

export function useTerminalCommands({
  input,
  setInput,
  setCommandHistory,
  setCurrentSection,
  setHistoryIndex,
  setShowSuggestions,
  setSuggestions,
  setSelectedProject,
  setIsProjectModalOpen,
  addToHistory,
}) {
  // Flatten commands for autocomplete
  const commands = [
    ...commandCategories.portfolio,
    ...commandCategories.system,
    ...commandCategories.tools,
    ...commandCategories.fileSystem,
  ]

  // Add command aliases
  const commandAliases = {
    ls: "list",
    dir: "list",
    cls: "clear",
    exit: "logout",
    quit: "logout",
    "?": "help",
    time: "date",
    hello: "echo Hello, how can I help you today?",
    hi: "echo Hi there! Type 'help' to see what I can do.",
    rm: "remove",
    touch: "create",
    mkdir: "makedir",
    mv: "move",
  }

  // Timer effect
  useEffect(() => {
    let timerInterval

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    }
  }, [])

  const handleCommand = (command) => {
    // Check for aliases and replace with actual command
    const commandParts = command.split(" ")
    const mainCommand = commandParts[0].toLowerCase()

    // Replace alias with actual command if it exists
    if (commandAliases[mainCommand]) {
      const actualCommand = commandAliases[mainCommand]
      commandParts[0] = actualCommand
      command = commandParts.join(" ")
    }

    // Process command by category
    let output

    // Portfolio commands
    const portfolioOutput = handlePortfolioCommands(command, {
      setCurrentSection,
      openProjectModal,
    })

    if (portfolioOutput) {
      output = portfolioOutput
    }
    // System commands
    else {
      const systemOutput = handleSystemCommands(command, {
        setCommandHistory,
        setCurrentSection,
        setInput,
        setHistoryIndex,
      })

      if (systemOutput) {
        output = systemOutput
      }
      // Tool commands
      else {
        const toolOutput = handleToolCommands(command)

        if (toolOutput) {
          output = toolOutput
        }
        // File system commands
        else {
          const fileSystemOutput = handleFileSystemCommands(command)

          if (fileSystemOutput) {
            output = fileSystemOutput
          }
          // Unknown command
          else {
            output = (
              <p className="text-red-500 font-mono">
                {command.split(" ")[0]}: command not found. Type 'help' to see available commands.
              </p>
            )
          }
        }
      }
    }

    // Add command to history
    addToHistory(command, output)

    // Reset input and history index
    setInput("")
    setHistoryIndex(-1)
  }

  const handleTabCompletion = (inputValue) => {
    if (!inputValue) return

    const inputParts = inputValue.split(" ")
    const lastPart = inputParts[inputParts.length - 1]

    // Command completion
    if (inputParts.length === 1) {
      const matchingCommands = commands.filter((cmd) => cmd.startsWith(lastPart))

      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
        setShowSuggestions(false)
      } else if (matchingCommands.length > 1) {
        setSuggestions(matchingCommands)
        setShowSuggestions(true)
      }
    }
  }

  const openProjectModal = (projectId) => {
    const project = projectsData.find((p) => p.id === projectId)
    if (project) {
      setSelectedProject(project)
      setIsProjectModalOpen(true)
    }
  }

  return {
    handleCommand,
    handleTabCompletion,
    openProjectModal,
    commands,
  }
}
