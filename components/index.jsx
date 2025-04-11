"use client"

import { useEffect, useRef } from "react"
import { TerminalHeader } from "./terminal-header"
import { TerminalBody } from "./terminal-body"
import { TerminalFooter } from "./terminal-footer"
import { TerminalInput } from "./terminal-input"
import { ProjectModal } from "@/components/project-modal"
import { useTerminalCommands } from "./hooks/use-terminal-commands"
import { useCommandHistory } from "./hooks/use-command-history"
import { useTerminalState } from "./hooks/use-terminal-state"
import { useScrollToBottom } from "./hooks/use-scroll-to-bottom"

export default function Terminal() {
  const terminalRef = useRef(null)
  const inputRef = useRef(null)

  // Custom hooks for terminal functionality
  const {
    input,
    setInput,
    currentSection,
    setCurrentSection,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    setSuggestions,
    selectedProject,
    setSelectedProject,
    isProjectModalOpen,
    setIsProjectModalOpen,
  } = useTerminalState()

  const { commandHistory, setCommandHistory, historyIndex, setHistoryIndex, addToHistory, clearHistory } =
    useCommandHistory()

  const { handleCommand, handleTabCompletion, openProjectModal, commands } = useTerminalCommands({
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
  })

  const { scrollToBottom, setContentChanged } = useScrollToBottom(terminalRef)

  // Ensure scroll happens after command history changes
  useEffect(() => {
    setContentChanged()
  }, [commandHistory, currentSection, setContentChanged])

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
        input: null,
        output: (
          <div className="space-y-2">
            <pre className="text-green-500 font-mono">
              {`
██████╗ ██████╗  █████╗ ███╗   ███╗███████╗███████╗██╗  ██╗
██╔══██╗██╔══██╗██╔══██╗████╗ ████║██╔════╝██╔════╝██║  ██║
██████╔╝██████╔╝███████║██╔████╔██║█████╗  ███████╗███████║
██╔═══╝ ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗███████║██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
                                                        
██████╗  █████╗ ███████╗███╗   ██╗███████╗████████╗        
██╔══██╗██╔══██╗██╔════╝████╗  ██║██╔════╝╚══██╔══╝        
██████╔╝███████║███████╗██╔██╗ ██║█████╗     ██║           
██╔══██╗██╔══██║╚════██║██║╚██╗██║██╔══╝     ██║           
██████╔╝██║  ██║███████║██║ ╚████║███████╗   ██║           
╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝           
`}
            </pre>
            <p className="text-green-500 mb-4 font-mono">Software Developer</p>
            <p className="font-mono text-green-500">
              Welcome to Pramesh Basnet's terminal portfolio. Type 'help' to see available commands.
            </p>
            <p className="font-mono text-gray-500 text-sm">
              Portfolio OS [Version 2.0.0] - Last login: {new Date().toLocaleString()}
            </p>
          </div>
        ),
        timestamp: new Date(),
      },
    ])
    setContentChanged()

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [setCommandHistory, setContentChanged])

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuggestions(false)

    if (!input.trim()) return

    const command = input.trim()
    handleCommand(command)
    setContentChanged() // Trigger scroll after command execution
  }

  const handleKeyDown = (e) => {
    // Handle tab completion
    if (e.key === "Tab") {
      e.preventDefault()
      handleTabCompletion(input)
      return
    }

    // Hide suggestions on Escape
    if (e.key === "Escape") {
      setShowSuggestions(false)
      return
    }

    // Handle up/down arrows for command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.filter((cmd) => cmd.input).length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        const commands = commandHistory.filter((cmd) => cmd.input)
        setInput(commands[commands.length - 1 - newIndex].input)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        const commands = commandHistory.filter((cmd) => cmd.input)
        setInput(commands[commands.length - 1 - newIndex].input)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  const applySuggestion = (suggestion) => {
    const inputParts = input.split(" ")
    inputParts[inputParts.length - 1] = suggestion
    setInput(inputParts.join(" "))
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const clearTerminal = () => {
    clearHistory()
    setCurrentSection(null)
    setInput("")
    setContentChanged()
  }

  return (
    <div className="flex flex-col h-full">
      <TerminalHeader clearTerminal={clearTerminal} />

      <TerminalBody
        ref={terminalRef}
        commandHistory={commandHistory}
        input={input}
        showSuggestions={showSuggestions}
        suggestions={suggestions}
        applySuggestion={applySuggestion}
        onClick={() => inputRef.current?.focus()}
      />

      <TerminalFooter />

      <TerminalInput
        ref={inputRef}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
      />

      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  )
}
