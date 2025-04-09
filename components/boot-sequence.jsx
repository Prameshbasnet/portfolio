"use client"

import { useEffect, useState } from "react"

const bootMessages = [
  "Initializing system...",
  "Loading kernel...",
  "Mounting file systems...",
  "Starting development environment...",
  "Loading dependencies...",
  "Initializing React components...",
  "Loading portfolio data...",
  "Initializing terminal interface...",
]

export default function BootSequence() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1)
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-2xl bg-black/70 p-8 rounded-md border border-green-800 font-mono text-green-500">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-green-500 mb-2">Pramesh Basnet</h1>
          <p className="text-green-400">Software Developer</p>
        </div>

        <div className="space-y-2">
          {bootMessages.slice(0, currentMessageIndex).map((message, index) => (
            <div key={index} className="flex">
              <span className="text-green-500 mr-2">&gt;</span>
              <span className="text-green-400/90">{message}</span>
              {index === currentMessageIndex - 1 && index !== bootMessages.length - 1 && (
                <span className="ml-1 cursor-blink">_</span>
              )}
            </div>
          ))}

          {currentMessageIndex === bootMessages.length && (
            <div className="flex mt-4">
              <span className="text-green-500 mr-2">&gt;</span>
              <span className="typing-animation text-green-400/90">
                Boot sequence complete. Welcome to Pramesh's developer terminal.
              </span>
              <span className="cursor-blink">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
