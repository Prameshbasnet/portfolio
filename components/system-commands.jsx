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
        <div>
          <span className="text-yellow-500">version</span> - Show terminal version
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
        <div>
          <span className="text-yellow-500">create [file]</span> - Create a new file
        </div>
        <div>
          <span className="text-yellow-500">edit [file]</span> - Edit file contents
        </div>
        <div>
          <span className="text-yellow-500">remove [file]</span> - Remove a file
        </div>
        <div>
          <span className="text-yellow-500">makedir [dir]</span> - Create a directory
        </div>
        <div>
          <span className="text-yellow-500">move [src] [dest]</span> - Move a file
        </div>
        <div>
          <span className="text-yellow-500">find [pattern]</span> - Find files
        </div>
      </div>

      <p className="font-bold text-yellow-500 mt-4">AI-Powered Tools:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 ml-4">
        <div>
          <span className="text-yellow-500">weather [city]</span> - Show weather information
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
          <span className="text-yellow-500">fortune</span> - Show a random fortune
        </div>
        <div>
          <span className="text-yellow-500">calc [expression]</span> - Calculate expression
        </div>
        <div>
          <span className="text-yellow-500">ai [prompt]</span> - Ask AI a question
        </div>
        <div>
          <span className="text-yellow-500">search [query]</span> - Search for information
        </div>
        <div>
          <span className="text-yellow-500">translate [lang] [text]</span> - Translate text
        </div>
      </div>

      <p className="text-gray-500 mt-4 text-sm">
        Press Tab for command completion. Use arrow keys to navigate command history.
      </p>
    </div>
  );
