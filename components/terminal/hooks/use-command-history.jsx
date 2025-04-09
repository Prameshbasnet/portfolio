"use client"

import { useState, useEffect } from "react"

export function useCommandHistory() {
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Load command history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("terminal-command-history")
      if (savedHistory) {
        // Only load the text of commands, not the full objects with React elements
        const parsedHistory = JSON.parse(savedHistory)
        // We don't set this directly to state because it only contains the text
        // and we need the full objects with React elements
      }
    } catch (error) {
      console.error("Failed to load command history:", error)
    }
  }, [])

  // Save command history to localStorage when it changes
  useEffect(() => {
    try {
      // Only save the text of commands, not the full objects with React elements
      const historyToSave = commandHistory
        .filter((cmd) => cmd.input) // Only save commands with input
        .map((cmd) => cmd.input) // Only save the text
        .slice(-50) // Only save the last 50 commands

      localStorage.setItem("terminal-command-history", JSON.stringify(historyToSave))
    } catch (error) {
      console.error("Failed to save command history:", error)
    }
  }, [commandHistory])

  const addToHistory = (command, output) => {
    setCommandHistory((prev) => [
      ...prev,
      {
        input: command,
        output,
        timestamp: new Date(),
      },
    ])
  }

  const clearHistory = () => {
    setCommandHistory([])
    setHistoryIndex(-1)
  }

  return {
    commandHistory,
    setCommandHistory,
    historyIndex,
    setHistoryIndex,
    addToHistory,
    clearHistory,
  }
}
