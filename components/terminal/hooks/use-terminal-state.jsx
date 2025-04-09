"use client"

import { useState } from "react"

export function useTerminalState() {
  const [input, setInput] = useState("")
  const [currentSection, setCurrentSection] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [weatherData, setWeatherData] = useState(null)
  const [ipInfo, setIpInfo] = useState(null)
  const [cryptoData, setCryptoData] = useState(null)
  const [newsData, setNewsData] = useState(null)
  const [quoteData, setQuoteData] = useState(null)
  const [jokeData, setJokeData] = useState(null)
  const [lastAsciiArt, setLastAsciiArt] = useState(-1)
  const [lastFortune, setLastFortune] = useState(-1)
  const [lastQuote, setLastQuote] = useState(-1)
  const [lastJoke, setLastJoke] = useState(-1)
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)

  // New state for file system simulation
  const [currentDirectory, setCurrentDirectory] = useState("/home/pramesh")
  const [fileSystem, setFileSystem] = useState({
    "/": {
      type: "directory",
      children: ["home", "usr", "bin", "etc"],
    },
    "/home": {
      type: "directory",
      children: ["pramesh"],
    },
    "/home/pramesh": {
      type: "directory",
      children: ["projects", "documents", "images", "readme.txt"],
    },
    "/home/pramesh/projects": {
      type: "directory",
      children: ["portfolio", "efcu", "pbm", "kiosk"],
    },
    "/home/pramesh/documents": {
      type: "directory",
      children: ["resume.pdf", "notes.md"],
    },
    "/home/pramesh/images": {
      type: "directory",
      children: ["profile.jpg", "project-screenshot.png"],
    },
    "/home/pramesh/readme.txt": {
      type: "file",
      content: "Welcome to Pramesh Basnet's terminal portfolio!\nType 'help' to see available commands.",
    },
  })

  return {
    input,
    setInput,
    currentSection,
    setCurrentSection,
    selectedProject,
    setSelectedProject,
    isProjectModalOpen,
    setIsProjectModalOpen,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    setSuggestions,
    weatherData,
    setWeatherData,
    ipInfo,
    setIpInfo,
    cryptoData,
    setCryptoData,
    newsData,
    setNewsData,
    quoteData,
    setQuoteData,
    jokeData,
    setJokeData,
    lastAsciiArt,
    setLastAsciiArt,
    lastFortune,
    setLastFortune,
    lastQuote,
    setLastQuote,
    lastJoke,
    setLastJoke,
    timerActive,
    setTimerActive,
    timerSeconds,
    setTimerSeconds,
    currentDirectory,
    setCurrentDirectory,
    fileSystem,
    setFileSystem,
  }
}
