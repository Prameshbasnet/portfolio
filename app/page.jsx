"use client"

import { useEffect, useState } from "react"
import Terminal from "@/components/terminal"
import BootSequence from "@/components/boot-sequence"
import { TerminalProvider } from "@/components/terminal/context/terminal-context"

export default function Home() {
  const [booting, setBooting] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setBooting(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  // Prevent hydration issues
  if (!mounted) return null

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col relative z-10 terminal-container">
        {booting ? (
          <BootSequence />
        ) : (
          <TerminalProvider>
            <Terminal />
          </TerminalProvider>
        )}
      </div>
    </main>
  )
}
