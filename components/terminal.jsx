"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { TypingEffect } from "@/components/typing-effect"
import { ProjectModal } from "@/components/project-modal"
import { AboutSection } from "@/components/sections/about-section"
import { EducationSection } from "@/components/sections/education-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ResumeGenerator } from "@/components/resume-generator"
import { ContactForm } from "@/components/contact-form"
import { TerminalIcon, ChevronRight, X } from "lucide-react"
import { SecurityScanSection } from "@/components/sections/security-scan-section"

// Project details for the modal
const projectsData = [
  {
    id: "efcu",
    title: "Online Digital Member Onboarding Solution (EFCU)",
    description:
      "A comprehensive online platform enabling users to open accounts and apply for loans (individual and business).",
    technologies: [".NET", "Next.js", "AWS Cognito", "AWS S3", "Twilio", "DocuSign"],
    features: [
      "Secure authentication mechanism using AWS Cognito",
      "Seamless file storage via AWS S3",
      "OTP-based verification with Twilio",
      "Electronic document signatures with DocuSign",
      "Individual and business loan application workflows",
      "Responsive design for all devices",
    ],
    image: "/placeholder.svg?height=300&width=600",
    demoUrl: "https://example.com/efcu-demo",
    repoUrl: "https://github.com/prameshbasnet1/efcu-onboarding",
  },
  {
    id: "pbm",
    title: "Prabhu Budget Management System (PBM)",
    description:
      "Robust backend systems for budget tracking and financial management with an intuitive React dashboard.",
    technologies: [".NET", "React", "PostgreSQL", "RESTful API"],
    features: [
      "Budget tracking and visualization",
      "Financial reporting and analytics",
      "User role management",
      "Expense categorization",
      "Budget forecasting",
      "Data export capabilities",
    ],
    image: "/placeholder.svg?height=300&width=600",
    demoUrl: "https://example.com/pbm-demo",
    repoUrl: "https://github.com/prameshbasnet1/pbm-system",
  },
  {
    id: "kiosk",
    title: "Kiosk Application",
    description: "A self-service kiosk application for cheque deposit, account statements, and account management.",
    technologies: ["Flutter", "React", "Windows API"],
    features: [
      "Cheque deposit functionality",
      "Account statement generation",
      "Old-to-new account number migration",
      "Admin dashboard for system management",
      "Reporting functionalities",
      "User activity tracking",
    ],
    image: "/placeholder.svg?height=300&width=600",
    demoUrl: "https://example.com/kiosk-demo",
    repoUrl: "https://github.com/prameshbasnet1/kiosk-app",
  },
]

export default function Terminal() {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
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

  // Organize commands by category
  const commandCategories = {
    portfolio: [
      "about",
      "education",
      "skills",
      "experience",
      "projects",
      "certifications",
      "contact",
      "resume",
      "message",
      "project:efcu",
      "project:pbm",
      "project:kiosk",
    ],
    system: ["clear", "echo", "pwd", "whoami", "date", "help", "man", "uname", "history", "neofetch", "banner"],
    tools: [
      "weather",
      "ip",
      "crypto",
      "news",
      "quote",
      "joke",
      "scan",
      "matrix",
      "fortune",
      "calc",
      "timer",
      "ascii-art",
      "colors",
      "figlet",
      "cowsay",
      "calendar",
      "todo",
      "encrypt",
      "decrypt",
      "qrcode",
      "morse",
      "binary",
      "hex",
      "uuid",
      "password",
    ],
  }

  // Flatten commands for autocomplete
  const commands = [...commandCategories.portfolio, ...commandCategories.system, ...commandCategories.tools]

  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  // Use useCallback to memoize the scrollToBottom function
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    // Focus input on mount and when clicking anywhere in the terminal
    inputRef.current?.focus()

    const handleClick = () => {
      inputRef.current?.focus()
    }

    document.addEventListener("click", handleClick)

    // Add welcome message
    setCommandHistory([
      {
        input: null,
        output: (
          <div className="space-y-2">
            <pre className="text-green-500 font-mono">
              {`
██████╗ ██████╗  █████╗ ███╗   ███╗███████╗███████╗██╗  ██╗
██╔══██╗██╔══██╗██╔══██╗████╗ ████║██╔════╝██╔════╝██║  ██║
██████╔╝██████╔╝███████║██╔████╔██║█████╗  ███████╗███████║
██╔═══╝ ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗███████║██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
                                                           
██████╗  █████╗ ███████╗███╗   ██╗███████╗████████╗        
██╔══██╗██╔══██╗██╔════╝████╗  ██║██╔════╝╚══██╔══╝        
██████╔╝███████║███████╗██╔██╗ ██║█████╗     ██║           
██╔══██╗██╔══██║╚════██║██║╚██╗██║██╔══╝     ██║           
██████╔╝██║  ██║███████║██║ ╚████║███████╗   ██║           
╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝           
`}
            </pre>
            <p className="text-green-500 mb-4 font-mono">Software Developer</p>
            <p className="font-mono text-green-500">
              <TypingEffect
                text="Welcome to Pramesh Basnet's terminal portfolio. Type 'help' to see available commands."
                speed={30}
              />
            </p>
            <p className="font-mono text-gray-500 text-sm">
              Portfolio OS [Version 1.0.0] - Last login: {new Date().toLocaleString()}
            </p>
          </div>
        ),
        timestamp: new Date(),
      },
    ])

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [commandHistory, currentSection, scrollToBottom])

  // Timer effect
  useEffect(() => {
    let interval
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1)
      }, 1000)
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false)
      setCommandHistory((prev) => [
        ...prev,
        {
          input: null,
          output: (
            <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
              <p className="font-bold text-white mb-2">⏰ Timer Complete!</p>
              <p>Your timer has finished.</p>
            </div>
          ),
          timestamp: new Date(),
        },
      ])
    }
    return () => clearInterval(interval)
  }, [timerActive, timerSeconds, setCommandHistory])

  const openProjectModal = (projectId) => {
    const project = projectsData.find((p) => p.id === projectId)
    if (project) {
      setSelectedProject(project)
      setIsProjectModalOpen(true)
    }
  }

  const handleTabCompletion = () => {
    if (!input) return

    const inputParts = input.split(" ")
    const lastPart = inputParts[inputParts.length - 1]

    // Command completion
    if (inputParts.length === 1) {
      const matchingCommands = commands.filter((cmd) => cmd.startsWith(lastPart))

      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
        setShowSuggestions(false)
      } else if (matchingCommands.length > 1) {
        setSuggestions(matchingCommands)
        setShowSuggestions(true)
      }
    }
  }

  // Mock data for new commands
  const fetchWeatherData = () => {
    return {
      location: "Lalitpur, Nepal",
      temperature: "24°C",
      condition: "Partly Cloudy",
      humidity: "65%",
      wind: "5 km/h",
      forecast: [
        { day: "Today", temp: "24°C", condition: "Partly Cloudy" },
        { day: "Tomorrow", temp: "26°C", condition: "Sunny" },
        { day: "Wednesday", temp: "25°C", condition: "Cloudy" },
      ],
    }
  }

  const fetchIpInfo = () => {
    return {
      ip: "192.168.1.1",
      city: "Lalitpur",
      region: "Bagmati Province",
      country: "Nepal",
      loc: "27.6588,85.3247",
      org: "AS45650 Vianet Communications Pvt. Ltd.",
      postal: "44600",
      timezone: "Asia/Kathmandu",
    }
  }

  const fetchCryptoData = () => {
    return [
      { name: "Bitcoin", symbol: "BTC", price: "$64,235.78", change: "+2.3%" },
      { name: "Ethereum", symbol: "ETH", price: "$3,456.92", change: "+1.7%" },
      { name: "Solana", symbol: "SOL", price: "$142.56", change: "+5.2%" },
      { name: "Cardano", symbol: "ADA", price: "$0.45", change: "-0.8%" },
      { name: "Dogecoin", symbol: "DOGE", price: "$0.12", change: "+10.5%" },
    ]
  }

  const fetchNewsData = () => {
    return [
      { title: "Nepal to Host International Tech Conference", source: "Kathmandu Post" },
      { title: "New Developments in AI Technology", source: "Tech Today" },
      { title: "Software Development Industry Growing in Nepal", source: "Nepal Times" },
      { title: "Flutter 3.0 Released with New Features", source: "Dev Weekly" },
      { title: "React 19 Announced with Performance Improvements", source: "Frontend News" },
    ]
  }

  const fetchQuote = () => {
    const quotes = [
      { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
      { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
      { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
      {
        text: "The most disastrous thing that you can ever learn is your first programming language.",
        author: "Alan Kay",
      },
      { text: "Software is a great combination of artistry and engineering.", author: "Bill Gates" },
      {
        text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler",
      },
      { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
      { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
      { text: "It's not a bug; it's an undocumented feature.", author: "Anonymous" },
      {
        text: "The only way to learn a new programming language is by writing programs in it.",
        author: "Dennis Ritchie",
      },
    ]

    let index
    do {
      index = Math.floor(Math.random() * quotes.length)
    } while (index === lastQuote && quotes.length > 1)

    setLastQuote(index)
    return quotes[index]
  }

  const fetchJoke = () => {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
      "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
      "Why did the developer go broke? Because he used up all his cache!",
      "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25!",
      "Why was the function sad after a party? It didn't get called.",
      "Why do Java developers wear glasses? Because they don't C#!",
      "What's a programmer's favorite place to hang out? The Foo Bar.",
      "What do you call a programmer from Finland? Nerdic.",
    ]

    let index
    do {
      index = Math.floor(Math.random() * jokes.length)
    } while (index === lastJoke && jokes.length > 1)

    setLastJoke(index)
    return jokes[index]
  }

  const calculateExpression = (expression) => {
    try {
      // Using Function constructor to evaluate mathematical expressions
      // This is safer than eval() for simple calculations
      const result = new Function(`return ${expression}`)()
      return isNaN(result) ? "Error: Invalid expression" : result.toString()
    } catch (error) {
      return "Error: Invalid expression"
    }
  }

  const generateAsciiArt = () => {
    const arts = [
      `
  /\\_/\\  
 ( o.o ) 
  > ^ <  
      `,
      `
   __      _
  / _|    | |
 | |_ ___ | | __
 |  _/ _ \\| |/ /
 | || (_) |   < 
 |_| \\___/|_|\\_\\
      `,
      `
   _____                      _     
  / ____|                    | |    
 | |     ___   ___  __ _  ___| |__  
 | |    / _ \\ / _ \\/ _\` |/ _ \\ '_ \\ 
 | |___| (_) |  __/ (_| |  __/ | | |
  \\_____\\___/ \\___|\\__, |\\___|_| |_|
                    __/ |          
                   |___/           
      `,
      `
 +-+-+-+-+-+
 |H|e|l|l|o|
 +-+-+-+-+-+
      `,
      `
    _    _      _ _       
   | |  | |    | | |      
   | |__| | ___| | | ___  
   |  __  |/ _ \\ | |/ _ \\ 
   | |  | |  __/ | | (_) |
   |_|  |_|\\___|_|_|\\___/ 
                         
      `,
      `
    ____  ____  ____  __  __ _____ ____  _   _ 
   |  _ \\|  _ \\/ ___||  \\/  | ____/ ___|| | | |
   | |_) | |_) \\___ \\| |\\/| |  _| \\___ \\| |_| |
   |  __/|  _ < ___) | |  | | |___ ___) |  _  |
   |_|   |_| \\_\\____/|_|  |_|_____|____/|_| |_|
                                              
      `,
      `
    _   _      _                 _ 
   | \\ | | ___| |__   __ _  __ _| |
   |  \\| |/ _ \\ '_ \\ / _\` |/ _\` | |
   | |\\  |  __/ |_) | (_| | (_| | |
   |_| \\_|\\___|_.__/ \\__,_|\\__,_|_|
                                  
      `,
      `
    _____ _   _ _   _ 
   |_   _| | | | | | |
     | | | |_| | |_| |
     | | |  _  |  _  |
     |_| |_| |_|_| |_|
                     
      `,
    ]

    let index
    do {
      index = Math.floor(Math.random() * arts.length)
    } while (index === lastAsciiArt && arts.length > 1)

    setLastAsciiArt(index)
    return arts[index]
  }

  const getFortune = () => {
    const fortunes = [
      "You will soon embark on a new coding adventure.",
      "A challenging bug will lead to an important discovery.",
      "Your next project will bring unexpected success.",
      "A mentor will appear when you need guidance most.",
      "Your persistence will pay off in solving a difficult problem.",
      "New technology you learn today will be valuable tomorrow.",
      "Your code will inspire others to create great things.",
      "A collaboration will lead to innovative solutions.",
      "Take time to refactor; future you will be grateful.",
      "Your attention to detail will prevent a critical issue.",
      "A new programming language will open doors for you.",
      "The solution you seek is simpler than you think.",
      "Your debugging skills will be tested, but you will prevail.",
      "An old project will find new purpose.",
      "Your documentation will save someone's day.",
      "A code review will reveal unexpected insights.",
      "Your GitHub contributions will be noticed by someone important.",
      "That side project you've been working on will lead to opportunity.",
      "The time you spend learning will pay dividends.",
      "Your clean code practices will make maintenance a breeze.",
    ]

    let index
    do {
      index = Math.floor(Math.random() * fortunes.length)
    } while (index === lastFortune && fortunes.length > 1)

    setLastFortune(index)
    return fortunes[index]
  }

  const generateQRCode = (text) => {
    return (
      <div className="text-green-500 font-mono">
        <p>QR Code for: {text}</p>
        <pre className="mt-2">
          {`
██████████████  ████  ██████████████
██          ██  ████  ██          ██
██  ██████  ██    ██  ██  ██████  ██
██  ██████  ██  ██    ██  ██████  ██
██  ██████  ██  ████  ██  ██████  ██
██          ██  ████  ██          ██
██████████████  ██  ██████████████
                ████              
██████  ██████  ████  ██  ██  ████
    ██████  ██  ████  ██  ██  ████
██  ██  ██  ██████  ██████████    
██  ██  ██  ██  ██  ██  ██  ██████
██  ██████  ██  ██  ██  ██  ██    
██████████████  ██████████████████
██          ██  ██  ██  ██  ██  ██
██  ██████  ██  ██  ██  ██  ██  ██
██  ██████  ██  ██████████████████
██  ██████  ██  ██  ██  ██  ██  ██
██          ██  ██  ██  ██  ██  ██
██████████████  ██████████████████
`}
        </pre>
        <p className="text-xs text-gray-500 mt-2">
          Note: This is a simulated QR code. In a real implementation, it would generate a scannable code.
        </p>
      </div>
    )
  }

  const generatePassword = (length = 12) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"
    let password = ""
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const textToBinary = (text) => {
    return text
      .split("")
      .map((char) => {
        return char.charCodeAt(0).toString(2).padStart(8, "0")
      })
      .join(" ")
  }

  const textToMorse = (text) => {
    const morseCode = {
      A: ".-",
      B: "-...",
      C: "-.-.",
      D: "-..",
      E: ".",
      F: "..-.",
      G: "--.",
      H: "....",
      I: "..",
      J: ".---",
      K: "-.-",
      L: ".-..",
      M: "--",
      N: "-.",
      O: "---",
      P: ".--.",
      Q: "--.-",
      R: ".-.",
      S: "...",
      T: "-",
      U: "..-",
      V: "...-",
      W: ".--",
      X: "-..-",
      Y: "-.--",
      Z: "--..",
      0: "-----",
      1: ".----",
      2: "..---",
      3: "...--",
      4: "....-",
      5: ".....",
      6: "-....",
      7: "--...",
      8: "---..",
      9: "----.",
      ".": ".-.-.-",
      ",": "--..--",
      "?": "..--..",
      "'": ".----.",
      "!": "-.-.--",
      "/": "-..-.",
      "(": "-.--.",
      ")": "-.--.-",
      "&": ".-...",
      ":": "---...",
      ";": "-.-.-.",
      "=": "-...-",
      "+": ".-.-.",
      "-": "-....-",
      _: "..--.-",
      '"': ".-..-.",
      $: "...-..-",
      "@": ".--.-.",
      " ": "/",
    }

    return text
      .toUpperCase()
      .split("")
      .map((char) => {
        return morseCode[char] || char
      })
      .join(" ")
  }

  const textToHex = (text) => {
    return text
      .split("")
      .map((char) => {
        return char.charCodeAt(0).toString(16).padStart(2, "0")
      })
      .join(" ")
  }

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const showCalendar = () => {
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()

    let calendarStr = `      ${monthNames[month]} ${year}\n`
    calendarStr += " Su Mo Tu We Th Fr Sa\n"

    // Add spacing for the first day
    let dayCount = 1
    let weekStr = "  ".repeat(firstDay)

    for (let i = firstDay; i < 7; i++) {
      weekStr += (dayCount < 10 ? " " : "") + dayCount + " "
      dayCount++
    }
    calendarStr += weekStr + "\n"

    // Add the rest of the days
    while (dayCount <= daysInMonth) {
      weekStr = ""
      for (let i = 0; i < 7 && dayCount <= daysInMonth; i++) {
        weekStr += (dayCount < 10 ? " " : "") + dayCount + " "
        dayCount++
      }
      calendarStr += weekStr + "\n"
    }

    return calendarStr
  }

  const cowsay = (text) => {
    const message = text || "Moo!"
    const line = "-".repeat(message.length + 2)

    return `
  ${line}
< ${message} >
  ${line}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
    `
  }

  const figlet = (text) => {
    // This is a simplified version - a real figlet would use a proper library
    const styles = [
      // Style 1 - Standard
      `
 _____${text
   .split("")
   .map(() => "_")
   .join("")}
|  ___|${text
        .split("")
        .map(() => "_")
        .join("")}
| |_ ${text
        .split("")
        .map(() => " ")
        .join("")} ${text}
|  _|${text
        .split("")
        .map(() => " ")
        .join("")}
|_|  ${text
        .split("")
        .map(() => " ")
        .join("")}
      `,

      // Style 2 - Block
      `
 _${text
   .split("")
   .map(() => "_")
   .join("")}_
| |${text
        .split("")
        .map(() => " ")
        .join("")}| |
| |${text
        .split("")
        .map(() => "_")
        .join("")}| |
|${text
        .split("")
        .map(() => " ")
        .join("")}${text}${text
        .split("")
        .map(() => " ")
        .join("")}|
|_${text
        .split("")
        .map(() => "_")
        .join("")}_|
      `,

      // Style 3 - Simple
      `
 /${text
   .split("")
   .map(() => "-")
   .join("")}\\
( ${text} )
 \\${text
   .split("")
   .map(() => "-")
   .join("")}/
      `,
    ]

    return styles[Math.floor(Math.random() * styles.length)]
  }

  const showColors = () => {
    return (
      <div className="text-green-500 font-mono">
        <p className="font-bold text-white mb-2">Terminal Color Palette</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black p-2 border border-gray-800">Black</div>
          <div className="bg-red-900 p-2 border border-gray-800">Red</div>
          <div className="bg-green-900 p-2 border border-gray-800">Green</div>
          <div className="bg-yellow-900 p-2 border border-gray-800">Yellow</div>
          <div className="bg-blue-900 p-2 border border-gray-800">Blue</div>
          <div className="bg-purple-900 p-2 border border-gray-800">Purple</div>
          <div className="bg-cyan-900 p-2 border border-gray-800">Cyan</div>
          <div className="bg-gray-700 p-2 border border-gray-800">White</div>
          <div className="bg-gray-900 p-2 border border-gray-800">Bright Black</div>
          <div className="bg-red-600 p-2 border border-gray-800">Bright Red</div>
          <div className="bg-green-600 p-2 border border-gray-800">Bright Green</div>
          <div className="bg-yellow-600 p-2 border border-gray-800">Bright Yellow</div>
          <div className="bg-blue-600 p-2 border border-gray-800">Bright Blue</div>
          <div className="bg-purple-600 p-2 border border-gray-800">Bright Purple</div>
          <div className="bg-cyan-600 p-2 border border-gray-800">Bright Cyan</div>
          <div className="bg-white p-2 border border-gray-800 text-black">Bright White</div>
        </div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuggestions(false)

    if (!input.trim()) return

    const command = input.trim()
    let output
    const commandParts = command.split(" ")
    const mainCommand = commandParts[0].toLowerCase()

    // Process command
    switch (mainCommand) {
      case "help":
        output = (
          <div className="space-y-2 text-green-500 font-mono">
            <p className="font-bold text-white mb-2">Available commands:</p>

            <p className="font-bold text-yellow-500 mt-4">Portfolio Information:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 ml-4">
              <div>
                <span className="text-yellow-500">about</span> - Learn about Pramesh
              </div>
              <div>
                <span className="text-yellow-500">education</span> - View educational background
              </div>
              <div>
                <span className="text-yellow-500">skills</span> - See technical skills
              </div>
              <div>
                <span className="text-yellow-500">experience</span> - View work experience
              </div>
              <div>
                <span className="text-yellow-500">projects</span> - View projects
              </div>
              <div>
                <span className="text-yellow-500">certifications</span> - View additional skills
              </div>
              <div>
                <span className="text-yellow-500">contact</span> - Get contact information
              </div>
              <div>
                <span className="text-yellow-500">resume</span> - Download my resume
              </div>
              <div>
                <span className="text-yellow-500">message</span> - Send me a message
              </div>
              <div>
                <span className="text-yellow-500">project:efcu</span> - View EFCU project details
              </div>
              <div>
                <span className="text-yellow-500">project:pbm</span> - View PBM project details
              </div>
              <div>
                <span className="text-yellow-500">project:kiosk</span> - View Kiosk project details
              </div>
            </div>

            <p className="font-bold text-yellow-500 mt-4">System Commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 ml-4">
              <div>
                <span className="text-yellow-500">clear</span> - Clear the terminal
              </div>
              <div>
                <span className="text-yellow-500">echo [text]</span> - Display text
              </div>
              <div>
                <span className="text-yellow-500">pwd</span> - Print working directory
              </div>
              <div>
                <span className="text-yellow-500">whoami</span> - Display user information
              </div>
              <div>
                <span className="text-yellow-500">date</span> - Display current date and time
              </div>
              <div>
                <span className="text-yellow-500">history</span> - View command history
              </div>
              <div>
                <span className="text-yellow-500">uname</span> - Display system information
              </div>
              <div>
                <span className="text-yellow-500">man [command]</span> - Display command manual
              </div>
              <div>
                <span className="text-yellow-500">neofetch</span> - Show system info
              </div>
              <div>
                <span className="text-yellow-500">banner</span> - Display ASCII banner
              </div>
            </div>

            <p className="font-bold text-yellow-500 mt-4">Tools & Utilities:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 ml-4">
              <div>
                <span className="text-yellow-500">weather</span> - Show weather information
              </div>
              <div>
                <span className="text-yellow-500">ip</span> - Show IP information
              </div>
              <div>
                <span className="text-yellow-500">crypto</span> - Show cryptocurrency prices
              </div>
              <div>
                <span className="text-yellow-500">news</span> - Show latest news
              </div>
              <div>
                <span className="text-yellow-500">quote</span> - Show a random quote
              </div>
              <div>
                <span className="text-yellow-500">joke</span> - Tell a programming joke
              </div>
              <div>
                <span className="text-yellow-500">scan</span> - Run a security scan
              </div>
              <div>
                <span className="text-yellow-500">matrix</span> - Display matrix effect
              </div>
              <div>
                <span className="text-yellow-500">fortune</span> - Show a random fortune
              </div>
              <div>
                <span className="text-yellow-500">calc [expression]</span> - Calculate expression
              </div>
              <div>
                <span className="text-yellow-500">timer [seconds]</span> - Set a countdown timer
              </div>
              <div>
                <span className="text-yellow-500">ascii-art</span> - Display random ASCII art
              </div>
              <div>
                <span className="text-yellow-500">colors</span> - Show terminal colors
              </div>
              <div>
                <span className="text-yellow-500">figlet [text]</span> - ASCII text art
              </div>
              <div>
                <span className="text-yellow-500">cowsay [text]</span> - ASCII cow says text
              </div>
              <div>
                <span className="text-yellow-500">calendar</span> - Show current month calendar
              </div>
              <div>
                <span className="text-yellow-500">qrcode [text]</span> - Generate QR code
              </div>
              <div>
                <span className="text-yellow-500">morse [text]</span> - Convert text to Morse code
              </div>
              <div>
                <span className="text-yellow-500">binary [text]</span> - Convert text to binary
              </div>
              <div>
                <span className="text-yellow-500">hex [text]</span> - Convert text to hexadecimal
              </div>
              <div>
                <span className="text-yellow-500">uuid</span> - Generate a UUID
              </div>
              <div>
                <span className="text-yellow-500">password [length]</span> - Generate a password
              </div>
            </div>

            <p className="text-gray-500 mt-4 text-sm">
              Press Tab for command completion. Use arrow keys to navigate command history.
            </p>
          </div>
        )
        setCurrentSection(null)
        break

      case "about":
        output = <AboutSection />
        setCurrentSection("about")
        break

      case "education":
        output = <EducationSection />
        setCurrentSection("education")
        break

      case "skills":
        output = <SkillsSection />
        setCurrentSection("skills")
        break

      case "experience":
        output = <ExperienceSection />
        setCurrentSection("experience")
        break

      case "projects":
        output = <ProjectsSection />
        setCurrentSection("projects")
        break

      case "certifications":
        output = <CertificationsSection />
        setCurrentSection("certifications")
        break

      case "contact":
        output = <ContactSection />
        setCurrentSection("contact")
        break

      case "resume":
        output = <ResumeGenerator />
        setCurrentSection("resume")
        break

      case "message":
        output = <ContactForm />
        setCurrentSection("message")
        break

      case "project:efcu":
        output = (
          <div className="text-green-500 font-mono">
            <p>Opening project details for Online Digital Member Onboarding Solution (EFCU)...</p>
          </div>
        )
        openProjectModal("efcu")
        setCurrentSection(null)
        break

      case "project:pbm":
        output = (
          <div className="text-green-500 font-mono">
            <p>Opening project details for Prabhu Budget Management System...</p>
          </div>
        )
        openProjectModal("pbm")
        setCurrentSection(null)
        break

      case "project:kiosk":
        output = (
          <div className="text-green-500 font-mono">
            <p>Opening project details for Kiosk Application...</p>
          </div>
        )
        openProjectModal("kiosk")
        setCurrentSection(null)
        break

      case "clear":
        setCommandHistory([])
        setCurrentSection(null)
        setInput("")
        return

      case "echo":
        if (commandParts.length < 2) {
          output = <p className="text-green-500 font-mono"></p>
        } else {
          const text = commandParts.slice(1).join(" ")
          output = <p className="text-green-500 font-mono">{text}</p>
        }
        setCurrentSection(null)
        break

      case "pwd":
        output = <p className="text-green-500 font-mono">/home/pramesh</p>
        setCurrentSection(null)
        break

      case "whoami":
        output = (
          <div className="text-green-500 font-mono">
            <p>pramesh</p>
            <p className="text-gray-500 text-sm">Software Developer</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "date":
        output = <p className="text-green-500 font-mono">{new Date().toString()}</p>
        setCurrentSection(null)
        break

      case "history":
        output = (
          <div className="text-green-500 font-mono">
            <div className="space-y-1">
              {commandHistory.map(
                (cmd, idx) =>
                  cmd.input && (
                    <div key={idx} className="flex">
                      <span className="text-gray-500 w-8 text-right mr-2">{idx + 1}</span>
                      <span>{cmd.input}</span>
                    </div>
                  ),
              )}
            </div>
          </div>
        )
        setCurrentSection(null)
        break

      case "uname":
        output = (
          <div className="text-green-500 font-mono">
            <p>Portfolio OS 1.0.0 pramesh-terminal x86_64</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "man":
        if (commandParts.length < 2) {
          output = <p className="text-red-500 font-mono">man: Missing command name</p>
        } else {
          const cmdName = commandParts[1]
          const manPages = {
            about: "Display information about Pramesh Basnet",
            skills: "List technical skills and proficiency levels",
            projects: "Show portfolio projects with details",
            contact: "Display contact information",
            clear: "Clear the terminal screen",
            help: "Display available commands",
            weather: "Show current weather information",
            crypto: "Display cryptocurrency prices",
            scan: "Run a simulated security vulnerability scan",
            matrix: "Display a Matrix-like animation in the terminal",
            calc: "Calculate mathematical expressions",
            "ascii-art": "Display random ASCII art",
            cowsay: "Display an ASCII cow saying the provided text",
            figlet: "Display text as ASCII art",
            morse: "Convert text to Morse code",
            binary: "Convert text to binary",
            hex: "Convert text to hexadecimal",
            uuid: "Generate a random UUID",
            password: "Generate a random secure password",
          }

          if (manPages[cmdName]) {
            output = (
              <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
                <p className="font-bold text-white uppercase mb-2">Manual: {cmdName}</p>
                <p className="mb-2">NAME</p>
                <p className="ml-4 mb-2">
                  {cmdName} - {manPages[cmdName]}
                </p>
                <p className="mb-2">SYNOPSIS</p>
                <p className="ml-4 mb-2 font-mono">
                  {cmdName}{" "}
                  {cmdName === "calc"
                    ? "[expression]"
                    : cmdName === "cowsay" ||
                        cmdName === "figlet" ||
                        cmdName === "morse" ||
                        cmdName === "binary" ||
                        cmdName === "hex"
                      ? "[text]"
                      : cmdName === "password"
                        ? "[length]"
                        : ""}
                </p>
                <p className="mb-2">DESCRIPTION</p>
                <p className="ml-4">{manPages[cmdName]}</p>
              </div>
            )
          } else {
            output = <p className="text-red-500 font-mono">man: No manual entry for {cmdName}</p>
          }
        }
        setCurrentSection(null)
        break

      case "weather":
        const weather = fetchWeatherData()
        setWeatherData(weather)
        output = (
          <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
            <p className="font-bold text-white mb-2">Weather for {weather.location}</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p>Temperature: {weather.temperature}</p>
                <p>Condition: {weather.condition}</p>
                <p>Humidity: {weather.humidity}</p>
                <p>Wind: {weather.wind}</p>
              </div>
              <div>
                <p className="font-bold">Forecast:</p>
                {weather.forecast.map((day, index) => (
                  <p key={index}>
                    {day.day}: {day.temp} - {day.condition}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )
        setCurrentSection(null)
        break

      case "ip":
        const ip = fetchIpInfo()
        setIpInfo(ip)
        output = (
          <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
            <p className="font-bold text-white mb-2">IP Information</p>
            <p>IP: {ip.ip}</p>
            <p>
              Location: {ip.city}, {ip.region}, {ip.country}
            </p>
            <p>Coordinates: {ip.loc}</p>
            <p>ISP: {ip.org}</p>
            <p>Postal Code: {ip.postal}</p>
            <p>Timezone: {ip.timezone}</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "crypto":
        const crypto = fetchCryptoData()
        setCryptoData(crypto)
        output = (
          <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
            <p className="font-bold text-white mb-2">Cryptocurrency Prices</p>
            <div className="space-y-1">
              {crypto.map((coin, index) => (
                <p key={index}>
                  {coin.name} ({coin.symbol}): {coin.price}{" "}
                  <span className={coin.change.startsWith("+") ? "text-green-500" : "text-red-500"}>{coin.change}</span>
                </p>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-2">Last updated: {new Date().toLocaleString()}</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "news":
        const news = fetchNewsData()
        setNewsData(news)
        output = (
          <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
            <p className="font-bold text-white mb-2">Latest News</p>
            <div className="space-y-1">
              {news.map((item, index) => (
                <p key={index}>
                  • {item.title} <span className="text-gray-500">({item.source})</span>
                </p>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-2">Last updated: {new Date().toLocaleString()}</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "quote":
        const quote = fetchQuote()
        setQuoteData(quote)
        output = (
          <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
            <p className="font-bold text-white mb-2">Quote of the Day</p>
            <p>"{quote.text}"</p>
            <p className="text-gray-500 text-right">— {quote.author}</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "joke":
        const joke = fetchJoke()
        setJokeData(joke)
        output = (
          <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
            <p className="font-bold text-white mb-2">Programming Joke</p>
            <p>{joke}</p>
            <p className="text-gray-500 text-xs mt-2">😄</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "scan":
        output = <SecurityScanSection />
        setCurrentSection("scan")
        break

      case "matrix":
        output = (
          <div className="text-green-500 font-mono">
            <p>Initializing Matrix sequence...</p>
            <div className="h-40 overflow-hidden border border-green-800 p-2 bg-black mt-2">
              <div className="matrix-animation">
                {Array.from({ length: 10 }).map((_, i) => (
                  <p key={i} className="matrix-line">
                    {Array.from({ length: 40 }).map((_, j) => (
                      <span key={j} className="matrix-char" style={{ animationDelay: `${i * 0.1 + j * 0.05}s` }}>
                        {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
            <p className="mt-2">Wake up, Neo...</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "neofetch":
        output = (
          <div className="text-green-500 font-mono flex gap-4">
            <div className="text-blue-500">
              <pre>
                {`
   _______
  |       |
  |  ___  |
  | |   | |
  | |___| |
  |_______|
`}
              </pre>
            </div>
            <div>
              <p className="text-yellow-500 font-bold">pramesh@portfolio</p>
              <p>-----------------</p>
              <p>
                <span className="text-yellow-500">OS:</span> Portfolio OS 1.0.0
              </p>
              <p>
                <span className="text-yellow-500">Host:</span> Vercel Cloud
              </p>
              <p>
                <span className="text-yellow-500">Kernel:</span> Next.js 14.1.0
              </p>
              <p>
                <span className="text-yellow-500">Uptime:</span> {Math.floor(Math.random() * 100)} days
              </p>
              <p>
                <span className="text-yellow-500">Packages:</span> npm 42
              </p>
              <p>
                <span className="text-yellow-500">Shell:</span> terminal.jsx
              </p>
              <p>
                <span className="text-yellow-500">Resolution:</span> Responsive x Adaptive
              </p>
              <p>
                <span className="text-yellow-500">DE:</span> React 18
              </p>
              <p>
                <span className="text-yellow-500">WM:</span> TailwindCSS
              </p>
              <p>
                <span className="text-yellow-500">Terminal:</span> Portfolio Terminal
              </p>
              <p>
                <span className="text-yellow-500">CPU:</span> JavaScript V8 @ 3.0GHz
              </p>
              <p>
                <span className="text-yellow-500">Memory:</span> 128MB / 512MB
              </p>
            </div>
          </div>
        )
        setCurrentSection(null)
        break

      case "banner":
        output = (
          <div className="text-green-500 font-mono">
            <pre>
              {`
██████╗ ██████╗  █████╗ ███╗   ███╗███████╗███████╗██╗  ██╗
██╔══██╗██╔══██╗██╔══██╗████╗ ████║██╔════╝██╔════╝██║  ██║
██████╔╝██████╔╝███████║██╔████╔██║█████╗  ███████╗███████║
██╔═══╝ ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗███████║██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
                                                           
██████╗  █████╗ ███████╗███╗   ██╗███████╗████████╗        
██╔══██╗██╔══██╗██╔════╝████╗  ██║██╔════╝╚══██╔══╝        
██████╔╝███████║███████╗██╔██╗ ██║█████╗     ██║           
██╔══██╗██╔══██║╚════██║██║╚██╗██║██╔══╝     ██║           
██████╔╝██║  ██║███████║██║ ╚████║███████╗   ██║           
╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝           
`}
            </pre>
            <p className="text-center">Software Developer | Full Stack Engineer</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "fortune":
        output = (
          <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
            <p className="font-bold text-white mb-2">Your Fortune:</p>
            <p>{getFortune()}</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "calc":
        if (commandParts.length < 2) {
          output = <p className="text-red-500 font-mono">calc: Missing expression</p>
        } else {
          const expression = commandParts.slice(1).join(" ")
          const result = calculateExpression(expression)
          output = (
            <div className="text-green-500 font-mono">
              <p>Expression: {expression}</p>
              <p>Result: {result}</p>
            </div>
          )
        }
        setCurrentSection(null)
        break

      case "timer":
        if (commandParts.length < 2 || isNaN(Number.parseInt(commandParts[1]))) {
          output = <p className="text-red-500 font-mono">timer: Please specify a valid number of seconds</p>
        } else {
          const seconds = Number.parseInt(commandParts[1])
          if (seconds <= 0 || seconds > 3600) {
            output = <p className="text-red-500 font-mono">timer: Please specify a time between 1 and 3600 seconds</p>
          } else {
            setTimerActive(true)
            setTimerSeconds(seconds)
            output = (
              <div className="text-green-500 font-mono">
                <p>Timer set for {seconds} seconds.</p>
                <div className="mt-2 p-2 border border-green-800 inline-block">
                  <span className="font-bold">{seconds}</span> seconds remaining
                </div>
              </div>
            )
          }
        }
        setCurrentSection(null)
        break

      case "ascii-art":
        const ascii = generateAsciiArt()
        output = (
          <div className="text-green-500 font-mono">
            <pre>{ascii}</pre>
          </div>
        )
        setCurrentSection(null)
        break

      case "colors":
        output = showColors()
        setCurrentSection(null)
        break

      case "figlet":
        if (commandParts.length < 2) {
          output = <p className="text-red-500 font-mono">figlet: Missing text</p>
        } else {
          const text = commandParts.slice(1).join(" ")
          output = (
            <div className="text-green-500 font-mono">
              <pre>{figlet(text)}</pre>
            </div>
          )
        }
        setCurrentSection(null)
        break

      case "cowsay":
        const cowText = commandParts.length < 2 ? "Moo!" : commandParts.slice(1).join(" ")
        output = (
          <div className="text-green-500 font-mono">
            <pre>{cowsay(cowText)}</pre>
          </div>
        )
        setCurrentSection(null)
        break

      case "calendar":
        output = (
          <div className="text-green-500 font-mono">
            <pre>{showCalendar()}</pre>
          </div>
        )
        setCurrentSection(null)
        break

      case "qrcode":
        if (commandParts.length < 2) {
          output = <p className="text-red-500 font-mono">qrcode: Missing text</p>
        } else {
          const text = commandParts.slice(1).join(" ")
          output = generateQRCode(text)
        }
        setCurrentSection(null)
        break

      case "morse":
        if (commandParts.length < 2) {
          output = <p className="text-red-500 font-mono">morse: Missing text</p>
        } else {
          const text = commandParts.slice(1).join(" ")
          output = (
            <div className="text-green-500 font-mono">
              <p>Text: {text}</p>
              <p>Morse: {textToMorse(text)}</p>
            </div>
          )
        }
        setCurrentSection(null)
        break

      case "binary":
        if (commandParts.length < 2) {
          output = <p className="text-red-500 font-mono">binary: Missing text</p>
        } else {
          const text = commandParts.slice(1).join(" ")
          output = (
            <div className="text-green-500 font-mono">
              <p>Text: {text}</p>
              <p>Binary: {textToBinary(text)}</p>
            </div>
          )
        }
        setCurrentSection(null)
        break

      case "hex":
        if (commandParts.length < 2) {
          output = <p className="text-red-500 font-mono">hex: Missing text</p>
        } else {
          const text = commandParts.slice(1).join(" ")
          output = (
            <div className="text-green-500 font-mono">
              <p>Text: {text}</p>
              <p>Hex: {textToHex(text)}</p>
            </div>
          )
        }
        setCurrentSection(null)
        break

      case "uuid":
        output = (
          <div className="text-green-500 font-mono">
            <p>Generated UUID:</p>
            <p className="mt-1 p-2 border border-green-800 bg-black/30">{generateUUID()}</p>
          </div>
        )
        setCurrentSection(null)
        break

      case "password":
        const length =
          commandParts.length > 1 && !isNaN(Number.parseInt(commandParts[1])) ? Number.parseInt(commandParts[1]) : 12

        output = (
          <div className="text-green-500 font-mono">
            <p>Generated Password ({length} characters):</p>
            <p className="mt-1 p-2 border border-green-800 bg-black/30 font-bold">{generatePassword(length)}</p>
            <p className="text-xs text-gray-500 mt-2">Copy this password and store it securely.</p>
          </div>
        )
        setCurrentSection(null)
        break

      default:
        output = (
          <p className="text-red-500 font-mono">{command}: command not found. Type 'help' to see available commands.</p>
        )
        setCurrentSection(null)
    }

    // Add command to history
    setCommandHistory((prev) => [
      ...prev,
      {
        input: command,
        output,
        timestamp: new Date(),
      },
    ])

    // Reset input and history index
    setInput("")
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e) => {
    // Handle tab completion
    if (e.key === "Tab") {
      e.preventDefault()
      handleTabCompletion()
      return
    }

    // Hide suggestions on Escape
    if (e.key === "Escape") {
      setShowSuggestions(false)
      return
    }

    // Handle up/down arrows for command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.filter((cmd) => cmd.input).length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        const commands = commandHistory.filter((cmd) => cmd.input)
        setInput(commands[commands.length - 1 - newIndex].input)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        const commands = commandHistory.filter((cmd) => cmd.input)
        setInput(commands[commands.length - 1 - newIndex].input)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  const applySuggestion = (suggestion) => {
    const inputParts = input.split(" ")
    inputParts[inputParts.length - 1] = suggestion
    setInput(inputParts.join(" "))
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const clearTerminal = () => {
    setCommandHistory([])
    setCurrentSection(null)
    setInput("")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Terminal Header */}
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

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="flex-1 bg-black border-x border-green-800 p-4 overflow-y-auto font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
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

        {/* Active timer display */}
        {timerActive && timerSeconds > 0 && (
          <div className="mt-4 p-2 border border-green-800 bg-black/30 inline-block">
            <p className="text-green-500 font-mono">
              ⏰ Timer: <span className="font-bold">{timerSeconds}</span> seconds remaining
            </p>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="bg-black border-t border-green-800 rounded-b-md p-2 flex items-center justify-between">
        <div className="text-xs text-gray-500">Type 'help' for available commands</div>
        <div className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</div>
      </div>

      {/* Hidden input for keyboard handling */}
      <div className="sr-only">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
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

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  )
}
