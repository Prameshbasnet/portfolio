export function handleSystemCommands(command, { setCommandHistory, setCurrentSection, setInput, setHistoryIndex }) {
  const commandParts = command.split(" ")
  const mainCommand = commandParts[0].toLowerCase()

  switch (mainCommand) {
    case "clear":
      setCommandHistory([])
      setCurrentSection(null)
      setInput("")
      setHistoryIndex(-1)
      return null

    case "echo":
      if (commandParts.length < 2) {
        return <p className="text-green-500 font-mono"></p>
      } else {
        const text = commandParts.slice(1).join(" ")
        return <p className="text-green-500 font-mono">{text}</p>
      }

    case "pwd":
      return <p className="text-green-500 font-mono">/home/pramesh</p>

    case "whoami":
      return (
        <div className="text-green-500 font-mono">
          <p>pramesh</p>
          <p className="text-gray-500 text-sm">Software Developer</p>
        </div>
      )

    case "help":
      return (
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
          </div>

          <p className="font-bold text-yellow-500 mt-4">File System Commands:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 ml-4">
            <div>
              <span className="text-yellow-500">list</span> - List directory contents
            </div>
            <div>
              <span className="text-yellow-500">cd [dir]</span> - Change directory
            </div>
            <div>
              <span className="text-yellow-500">cat [file]</span> - Display file contents
            </div>
          </div>

          <p className="text-gray-500 mt-4 text-sm">
            Press Tab for command completion. Use arrow keys to navigate command history.
          </p>
        </div>
      )

    default:
      return null
  }
}
