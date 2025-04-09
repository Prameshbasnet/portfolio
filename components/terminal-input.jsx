"use client"

import { forwardRef } from "react"

export const TerminalInput = forwardRef(function TerminalInput({ input, setInput, handleSubmit, handleKeyDown }, ref) {
  return (
    <div className="sr-only">
      <form onSubmit={handleSubmit}>
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute"
          aria-label="Terminal input"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  )
})
