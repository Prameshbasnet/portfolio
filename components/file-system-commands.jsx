"use client"

import { useContext } from "react"
import { TerminalContext } from "../context/terminal-context"

export function handleFileSystemCommands(command) {
  const { currentDirectory, setCurrentDirectory, fileSystem, setFileSystem } = useContext(TerminalContext)

  const commandParts = command.split(" ")
  const mainCommand = commandParts[0].toLowerCase()

  const getAbsolutePath = (path) => {
    if (path.startsWith("/")) {
      return path
    } else if (path.startsWith("./")) {
      return `${currentDirectory}/${path.slice(2)}`
    } else if (path.startsWith("../")) {
      const parentDir = currentDirectory.split("/").slice(0, -1).join("/") || "/"
      return `${parentDir}/${path.slice(3)}`
    } else {
      return `${currentDirectory}/${path}`
    }
  }

  const normalizePath = (path) => {
    // Handle . and .. in paths
    const parts = path.split("/").filter(Boolean)
    const result = []

    for (const part of parts) {
      if (part === ".") {
        continue
      } else if (part === "..") {
        result.pop()
      } else {
        result.push(part)
      }
    }

    return "/" + result.join("/")
  }

  const fileExists = (path) => {
    return fileSystem[path] !== undefined
  }

  const isDirectory = (path) => {
    return fileSystem[path]?.type === "directory"
  }

  switch (mainCommand) {
    case "list":
    case "ls":
      const targetDir = commandParts.length > 1 ? getAbsolutePath(commandParts[1]) : currentDirectory

      if (!fileExists(targetDir)) {
        return <p className="text-red-500 font-mono">list: {targetDir}: No such directory</p>
      }

      if (!isDirectory(targetDir)) {
        return <p className="text-red-500 font-mono">list: {targetDir}: Not a directory</p>
      }

      const contents = fileSystem[targetDir].children

      return (
        <div className="text-green-500 font-mono">
          <p>Contents of {targetDir}:</p>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {contents.map((item, index) => {
              const itemPath = `${targetDir === "/" ? "" : targetDir}/${item}`
              const isDir = fileSystem[itemPath]?.type === "directory"

              return (
                <div key={index} className={`${isDir ? "text-blue-400" : "text-green-300"}`}>
                  {item}
                  {isDir ? "/" : ""}
                </div>
              )
            })}
          </div>
        </div>
      )

    case "cd":
      if (commandParts.length < 2) {
        // cd without arguments goes to home directory
        setCurrentDirectory("/home/pramesh")
        return <p className="text-green-500 font-mono">Changed directory to /home/pramesh</p>
      }

      const newDir = getAbsolutePath(commandParts[1])
      const normalizedDir = normalizePath(newDir)

      if (!fileExists(normalizedDir)) {
        return <p className="text-red-500 font-mono">cd: {normalizedDir}: No such directory</p>
      }

      if (!isDirectory(normalizedDir)) {
        return <p className="text-red-500 font-mono">cd: {normalizedDir}: Not a directory</p>
      }

      setCurrentDirectory(normalizedDir)
      return <p className="text-green-500 font-mono">Changed directory to {normalizedDir}</p>

    case "cat":
      if (commandParts.length < 2) {
        return <p className="text-red-500 font-mono">cat: Missing file operand</p>
      }

      const filePath = getAbsolutePath(commandParts[1])

      if (!fileExists(filePath)) {
        return <p className="text-red-500 font-mono">cat: {filePath}: No such file</p>
      }

      if (isDirectory(filePath)) {
        return <p className="text-red-500 font-mono">cat: {filePath}: Is a directory</p>
      }

      return (
        <div className="text-green-500 font-mono">
          <pre className="whitespace-pre-wrap">{fileSystem[filePath].content}</pre>
        </div>
      )

    case "create":
    case "touch":
      if (commandParts.length < 2) {
        return <p className="text-red-500 font-mono">create: Missing file operand</p>
      }

      const newFilePath = getAbsolutePath(commandParts[1])
      const newFileContent = commandParts.length > 2 ? commandParts.slice(2).join(" ") : ""

      if (fileExists(newFilePath)) {
        return <p className="text-red-500 font-mono">create: {newFilePath}: File already exists</p>
      }

      // Create the file
      const newFileSystem = { ...fileSystem }
      newFileSystem[newFilePath] = {
        type: "file",
        content: newFileContent,
      }

      // Add to parent directory
      const parentDir = newFilePath.split("/").slice(0, -1).join("/") || "/"
      const fileName = newFilePath.split("/").pop()

      if (!fileExists(parentDir) || !isDirectory(parentDir)) {
        return <p className="text-red-500 font-mono">create: {parentDir}: No such directory</p>
      }

      newFileSystem[parentDir].children = [...newFileSystem[parentDir].children, fileName]

      setFileSystem(newFileSystem)
      return <p className="text-green-500 font-mono">Created file: {newFilePath}</p>

    case "edit":
      if (commandParts.length < 3) {
        return <p className="text-red-500 font-mono">edit: Usage: edit [file] [content]</p>
      }

      const editFilePath = getAbsolutePath(commandParts[1])
      const editContent = commandParts.slice(2).join(" ")

      if (!fileExists(editFilePath)) {
        return <p className="text-red-500 font-mono">edit: {editFilePath}: No such file</p>
      }

      if (isDirectory(editFilePath)) {
        return <p className="text-red-500 font-mono">edit: {editFilePath}: Is a directory</p>
      }

      // Edit the file
      const editedFileSystem = { ...fileSystem }
      editedFileSystem[editFilePath].content = editContent

      setFileSystem(editedFileSystem)
      return <p className="text-green-500 font-mono">File edited: {editFilePath}</p>

    case "remove":
    case "rm":
      if (commandParts.length < 2) {
        return <p className="text-red-500 font-mono">remove: Missing file operand</p>
      }

      const removePath = getAbsolutePath(commandParts[1])

      if (!fileExists(removePath)) {
        return <p className="text-red-500 font-mono">remove: {removePath}: No such file or directory</p>
      }

      // Remove from parent directory
      const removeParentDir = removePath.split("/").slice(0, -1).join("/") || "/"
      const removeFileName = removePath.split("/").pop()

      const removedFileSystem = { ...fileSystem }

      // Remove from parent's children
      removedFileSystem[removeParentDir].children = removedFileSystem[removeParentDir].children.filter(
        (child) => child !== removeFileName,
      )

      // Remove the file/directory itself
      delete removedFileSystem[removePath]

      // If it's a directory, remove all children recursively
      if (isDirectory(removePath)) {
        Object.keys(removedFileSystem).forEach((path) => {
          if (path.startsWith(`${removePath}/`)) {
            delete removedFileSystem[path]
          }
        })
      }

      setFileSystem(removedFileSystem)
      return <p className="text-green-500 font-mono">Removed: {removePath}</p>

    case "makedir":
    case "mkdir":
      if (commandParts.length < 2) {
        return <p className="text-red-500 font-mono">makedir: Missing directory operand</p>
      }

      const newDirPath = getAbsolutePath(commandParts[1])

      if (fileExists(newDirPath)) {
        return <p className="text-red-500 font-mono">makedir: {newDirPath}: File or directory already exists</p>
      }

      // Create the directory
      const newDirSystem = { ...fileSystem }
      newDirSystem[newDirPath] = {
        type: "directory",
        children: [],
      }

      // Add to parent directory
      const newDirParent = newDirPath.split("/").slice(0, -1).join("/") || "/"
      const newDirName = newDirPath.split("/").pop()

      if (!fileExists(newDirParent) || !isDirectory(newDirParent)) {
        return <p className="text-red-500 font-mono">makedir: {newDirParent}: No such directory</p>
      }

      newDirSystem[newDirParent].children = [...newDirSystem[newDirParent].children, newDirName]

      setFileSystem(newDirSystem)
      return <p className="text-green-500 font-mono">Created directory: {newDirPath}</p>

    case "move":
    case "mv":
      if (commandParts.length < 3) {
        return <p className="text-red-500 font-mono">move: Usage: move [source] [destination]</p>
      }

      const sourcePath = getAbsolutePath(commandParts[1])
      const destPath = getAbsolutePath(commandParts[2])

      if (!fileExists(sourcePath)) {
        return <p className="text-red-500 font-mono">move: {sourcePath}: No such file or directory</p>
      }

      if (fileExists(destPath) && isDirectory(destPath)) {
        // If destination is a directory, move source into it
        const sourceFileName = sourcePath.split("/").pop()
        const actualDestPath = `${destPath}/${sourceFileName}`

        if (fileExists(actualDestPath)) {
          return <p className="text-red-500 font-mono">move: {actualDestPath}: File or directory already exists</p>
        }

        // Move the file/directory
        const movedFileSystem = { ...fileSystem }

        // Add to destination directory
        movedFileSystem[destPath].children = [...movedFileSystem[destPath].children, sourceFileName]

        // Copy the source to the new location
        movedFileSystem[actualDestPath] = { ...movedFileSystem[sourcePath] }

        // Remove from source parent directory
        const sourceParentDir = sourcePath.split("/").slice(0, -1).join("/") || "/"
        movedFileSystem[sourceParentDir].children = movedFileSystem[sourceParentDir].children.filter(
          (child) => child !== sourceFileName,
        )

        // Remove the source
        delete movedFileSystem[sourcePath]

        // If it's a directory, move all children recursively
        if (isDirectory(sourcePath)) {
          Object.keys(movedFileSystem).forEach((path) => {
            if (path.startsWith(`${sourcePath}/`)) {
              const relativePath = path.slice(sourcePath.length)
              const newPath = `${actualDestPath}${relativePath}`
              movedFileSystem[newPath] = { ...movedFileSystem[path] }
              delete movedFileSystem[path]
            }
          })
        }

        setFileSystem(movedFileSystem)
        return (
          <p className="text-green-500 font-mono">
            Moved: {sourcePath} to {actualDestPath}
          </p>
        )
      } else {
        // Move/rename source to destination
        if (fileExists(destPath)) {
          return <p className="text-red-500 font-mono">move: {destPath}: File or directory already exists</p>
        }

        // Move the file/directory
        const movedFileSystem = { ...fileSystem }

        // Add to destination parent directory
        const destParentDir = destPath.split("/").slice(0, -1).join("/") || "/"
        const destFileName = destPath.split("/").pop()

        if (!fileExists(destParentDir) || !isDirectory(destParentDir)) {
          return <p className="text-red-500 font-mono">move: {destParentDir}: No such directory</p>
        }

        movedFileSystem[destParentDir].children = [...movedFileSystem[destParentDir].children, destFileName]

        // Copy the source to the new location
        movedFileSystem[destPath] = { ...movedFileSystem[sourcePath] }

        // Remove from source parent directory
        const sourceParentDir = sourcePath.split("/").slice(0, -1).join("/") || "/"
        const sourceFileName = sourcePath.split("/").pop()
        movedFileSystem[sourceParentDir].children = movedFileSystem[sourceParentDir].children.filter(
          (child) => child !== sourceFileName,
        )

        // Remove the source
        delete movedFileSystem[sourcePath]

        // If it's a directory, move all children recursively
        if (isDirectory(sourcePath)) {
          Object.keys(movedFileSystem).forEach((path) => {
            if (path.startsWith(`${sourcePath}/`)) {
              const relativePath = path.slice(sourcePath.length)
              const newPath = `${destPath}${relativePath}`
              movedFileSystem[newPath] = { ...movedFileSystem[path] }
              delete movedFileSystem[path]
            }
          })
        }

        setFileSystem(movedFileSystem)
        return (
          <p className="text-green-500 font-mono">
            Moved: {sourcePath} to {destPath}
          </p>
        )
      }

    case "find":
      if (commandParts.length < 2) {
        return <p className="text-red-500 font-mono">find: Missing pattern</p>
      }

      const pattern = commandParts[1].toLowerCase()
      const searchDir = commandParts.length > 2 ? getAbsolutePath(commandParts[2]) : currentDirectory

      if (!fileExists(searchDir)) {
        return <p className="text-red-500 font-mono">find: {searchDir}: No such directory</p>
      }

      if (!isDirectory(searchDir)) {
        return <p className="text-red-500 font-mono">find: {searchDir}: Not a directory</p>
      }

      // Find files/directories that match the pattern
      const matches = []

      Object.keys(fileSystem).forEach((path) => {
        if (path.startsWith(searchDir === "/" ? "/" : `${searchDir}/`) || path === searchDir) {
          const name = path.split("/").pop()
          if (name.toLowerCase().includes(pattern)) {
            matches.push(path)
          }
        }
      })

      if (matches.length === 0) {
        return (
          <p className="text-green-500 font-mono">
            No matches found for '{pattern}' in {searchDir}
          </p>
        )
      }

      return (
        <div className="text-green-500 font-mono">
          <p>
            Found {matches.length} matches for '{pattern}' in {searchDir}:
          </p>
          <div className="mt-2 space-y-1">
            {matches.map((match, index) => (
              <p key={index} className={isDirectory(match) ? "text-blue-400" : "text-green-300"}>
                {match}
                {isDirectory(match) ? "/" : ""}
              </p>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}
