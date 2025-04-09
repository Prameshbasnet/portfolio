"use client"

import { TerminalIcon, X } from "lucide-react"

export function TerminalHeader({ clearTerminal }) {
  return (
    <div className="bg-black border-b border-green-800 rounded-t-md p-2 flex items-center justify-between">
      <div className="flex items-center">
        <TerminalIcon className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-base font-mono font-bold text-green-500">Pramesh Basnet Terminal</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={clearTerminal}
          className="p-1 hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Clear terminal"
        >
          <X className="h-4 w-4 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  )
}
