"use client"

import { forwardRef } from "react"
import { ChevronRight } from "lucide-react"

export const TerminalBody = forwardRef(function TerminalBody(
  { commandHistory, input, showSuggestions, suggestions, applySuggestion, onClick },
  ref,
) {
  return (
    <div
      ref={ref}
      className="flex-1 bg-black border-x border-green-800 p-4 overflow-y-auto font-mono text-sm terminal-body"
      onClick={onClick}
      style={{ scrollBehavior: "smooth" }}
    >
      {commandHistory.map((cmd, index) => (
        <div key={index} className="mb-4">
          {cmd.input && (
            <div className="flex items-center text-white px-2 py-1">
              <span className="text-green-500 mr-2">pramesh@portfolio:~$</span>
              <span className="text-white">{cmd.input}</span>
            </div>
          )}
          <div className="mt-1">{cmd.output}</div>
        </div>
      ))}

      {/* Current input line */}
      <div className="flex items-center text-white px-2 py-1">
        <span className="text-green-500 mr-2">pramesh@portfolio:~$</span>
        <span className="text-white">{input}</span>
        <span className="cursor-blink text-white ml-0.5">_</span>
      </div>

      {/* Command suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="mt-2 ml-8 bg-black border border-green-800 p-2 rounded">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="text-left text-yellow-500 hover:text-green-500 hover:underline flex items-center"
                onClick={() => applySuggestion(suggestion)}
              >
                <ChevronRight className="h-3 w-3 mr-1" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})
