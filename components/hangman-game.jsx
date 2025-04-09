"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const words = [
  "javascript",
  "react",
  "nextjs",
  "typescript",
  "developer",
  "programming",
  "frontend",
  "backend",
  "fullstack",
  "portfolio",
  "software",
  "engineer",
  "application",
  "interface",
  "component",
]

export function HangmanGame() {
  const [word, setWord] = useState("")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [gameStatus, setGameStatus] = useState("playing") // playing, won, lost
  const [currentGuess, setCurrentGuess] = useState("")

  const maxWrongGuesses = 6

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    setWord(randomWord)
    setGuessedLetters([])
    setWrongGuesses(0)
    setGameStatus("playing")
    setCurrentGuess("")
  }

  const handleGuess = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return

    const newGuessedLetters = [...guessedLetters, letter]
    setGuessedLetters(newGuessedLetters)
    setCurrentGuess("")

    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1
      setWrongGuesses(newWrongGuesses)

      if (newWrongGuesses >= maxWrongGuesses) {
        setGameStatus("lost")
      }
    } else {
      // Check if player has won
      const isWon = word.split("").every((char) => newGuessedLetters.includes(char))

      if (isWon) {
        setGameStatus("won")
      }
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase()
    if (value.length <= 1 && /^[a-z]*$/.test(value)) {
      setCurrentGuess(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentGuess && currentGuess.length === 1) {
      handleGuess(currentGuess)
    }
  }

  const renderWord = () => {
    return word.split("").map((letter, index) => (
      <span key={index} className="mx-1 text-xl">
        {guessedLetters.includes(letter) ? letter : "_"}
      </span>
    ))
  }

  const renderHangman = () => {
    return (
      <pre className="text-green-500 font-mono text-sm">
        {`
  +---+
  |   ${wrongGuesses > 0 ? "O" : " "}
  |  ${wrongGuesses > 2 ? "/" : " "}${wrongGuesses > 1 ? "|" : " "}${wrongGuesses > 3 ? "\\" : " "}
  |  ${wrongGuesses > 4 ? "/" : " "} ${wrongGuesses > 5 ? "\\" : " "}
  |
=========`}
      </pre>
    )
  }

  return (
    <div className="space-y-4 p-4 border border-green-800 rounded bg-black">
      <h3 className="text-green-500 font-bold text-xl mb-4">Hangman Game</h3>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">{renderHangman()}</div>

        <div className="md:w-2/3 space-y-4">
          <div className="text-center mb-4">
            <div className="font-mono tracking-widest text-green-500">{renderWord()}</div>
          </div>

          {gameStatus === "playing" ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={currentGuess}
                onChange={handleInputChange}
                className="bg-black border border-green-800 text-green-500 px-3 py-2 rounded w-12 text-center"
                maxLength={1}
                autoFocus
              />
              <Button
                type="submit"
                disabled={!currentGuess}
                className="bg-green-900/50 hover:bg-green-800/50 text-green-500 border border-green-800"
              >
                Guess
              </Button>
            </form>
          ) : (
            <div className="text-center">
              {gameStatus === "won" ? (
                <p className="text-green-500 font-bold mb-4">Congratulations! You won!</p>
              ) : (
                <p className="text-red-500 font-bold mb-4">Game Over! The word was: {word}</p>
              )}
              <Button
                onClick={startNewGame}
                className="bg-green-900/50 hover:bg-green-800/50 text-green-500 border border-green-800"
              >
                Play Again
              </Button>
            </div>
          )}

          <div className="mt-4">
            <p className="text-gray-500 mb-2">Guessed letters:</p>
            <div className="flex flex-wrap gap-2">
              {guessedLetters.map((letter, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs ${
                    word.includes(letter) ? "bg-green-900/30 text-green-500" : "bg-red-900/30 text-red-500"
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
