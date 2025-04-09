"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Monitor, Palette } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("terminal")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (newTheme) => {
    const root = document.documentElement

    // Remove all theme classes
    root.classList.remove("theme-terminal", "theme-modern", "theme-retro", "theme-dark", "theme-light")

    // Add the new theme class
    root.classList.add(`theme-${newTheme}`)

    // Update CSS variables based on theme
    switch (newTheme) {
      case "terminal":
        document.documentElement.style.setProperty("--primary", "0 0% 100%")
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 0%")
        document.documentElement.style.setProperty("--background", "0 0% 0%")
        document.documentElement.style.setProperty("--foreground", "0 0% 100%")
        document.documentElement.style.setProperty("--muted", "0 0% 10%")
        document.documentElement.style.setProperty("--muted-foreground", "0 0% 70%")
        document.documentElement.style.setProperty("--accent", "0 0% 10%")
        break
      case "modern":
        document.documentElement.style.setProperty("--primary", "215 100% 50%")
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%")
        document.documentElement.style.setProperty("--background", "220 20% 97%")
        document.documentElement.style.setProperty("--foreground", "220 20% 10%")
        document.documentElement.style.setProperty("--muted", "220 20% 90%")
        document.documentElement.style.setProperty("--muted-foreground", "220 20% 40%")
        document.documentElement.style.setProperty("--accent", "215 100% 95%")
        break
      case "retro":
        document.documentElement.style.setProperty("--primary", "130 100% 40%")
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 0%")
        document.documentElement.style.setProperty("--background", "60 100% 97%")
        document.documentElement.style.setProperty("--foreground", "130 100% 15%")
        document.documentElement.style.setProperty("--muted", "130 50% 90%")
        document.documentElement.style.setProperty("--muted-foreground", "130 50% 30%")
        document.documentElement.style.setProperty("--accent", "130 100% 90%")
        break
      case "dark":
        document.documentElement.style.setProperty("--primary", "270 100% 60%")
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%")
        document.documentElement.style.setProperty("--background", "240 10% 10%")
        document.documentElement.style.setProperty("--foreground", "0 0% 100%")
        document.documentElement.style.setProperty("--muted", "240 10% 20%")
        document.documentElement.style.setProperty("--muted-foreground", "240 10% 70%")
        document.documentElement.style.setProperty("--accent", "270 100% 20%")
        break
      case "light":
        document.documentElement.style.setProperty("--primary", "270 100% 50%")
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%")
        document.documentElement.style.setProperty("--background", "0 0% 100%")
        document.documentElement.style.setProperty("--foreground", "240 10% 10%")
        document.documentElement.style.setProperty("--muted", "240 10% 95%")
        document.documentElement.style.setProperty("--muted-foreground", "240 10% 40%")
        document.documentElement.style.setProperty("--accent", "270 100% 95%")
        break
    }

    localStorage.setItem("portfolio-theme", newTheme)
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-black/50 hover:bg-black/70 border-white/30">
          <Palette className="h-4 w-4 text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 border-white/30">
        <DropdownMenuItem
          className={`flex items-center gap-2 ${theme === "terminal" ? "text-primary" : "text-white"}`}
          onClick={() => handleThemeChange("terminal")}
        >
          <Monitor className="h-4 w-4" />
          <span>Terminal</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex items-center gap-2 ${theme === "modern" ? "text-primary" : "text-white"}`}
          onClick={() => handleThemeChange("modern")}
        >
          <Sun className="h-4 w-4" />
          <span>Modern</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex items-center gap-2 ${theme === "retro" ? "text-primary" : "text-white"}`}
          onClick={() => handleThemeChange("retro")}
        >
          <Moon className="h-4 w-4" />
          <span>Retro</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex items-center gap-2 ${theme === "dark" ? "text-primary" : "text-white"}`}
          onClick={() => handleThemeChange("dark")}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex items-center gap-2 ${theme === "light" ? "text-primary" : "text-white"}`}
          onClick={() => handleThemeChange("light")}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
