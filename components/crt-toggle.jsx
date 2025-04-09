"use client"

import { useState, useEffect } from "react"
import { Monitor } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function CRTToggle() {
  const [crtEnabled, setCrtEnabled] = useState(true)

  useEffect(() => {
    const body = document.body
    if (crtEnabled) {
      body.classList.add("crt")
    } else {
      body.classList.remove("crt")
    }

    // Save preference to localStorage
    localStorage.setItem("crt-effect", crtEnabled.toString())

    return () => {
      body.classList.remove("crt")
    }
  }, [crtEnabled])

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("crt-effect")
    if (savedPreference === "false") {
      setCrtEnabled(false)
    }
  }, [])

  return (
    <Toggle
      aria-label="Toggle CRT effect"
      pressed={crtEnabled}
      onPressedChange={setCrtEnabled}
      className="bg-black/50 hover:bg-black/70 border border-green-800 data-[state=on]:bg-green-900/30"
    >
      <Monitor className="h-4 w-4 mr-2 text-green-400" />
      <span className="text-green-400 text-sm">CRT</span>
    </Toggle>
  )
}
