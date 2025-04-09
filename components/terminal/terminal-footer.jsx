"use client"

export function TerminalFooter() {
  return (
    <div className="bg-black border-t border-green-800 rounded-b-md p-2 flex items-center justify-between">
      <div className="text-xs text-gray-500">Type 'help' for available commands</div>
      <div className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</div>
    </div>
  )
}
