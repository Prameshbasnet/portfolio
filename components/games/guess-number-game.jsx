"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function GuessNumberGame() {
  const [targetNumber, setTargetNumber] = useState(0)
  const [guess, setGuess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState("")
  const [gameStatus, setGameStatus] = useState("playing") // playing, won
  const [guessHistory, setGuessHistory] = useState([])

  const maxAttempts = 10

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess("")
    setAttempts(0)
    setMessage("I'm thinking of a number between 1 and 100.")
    setGameStatus("playing")
    setGuessHistory([])
  }

  const handleGuessChange = (e) => {
    const value = e.target.value
    if (value === "" || (/^\d+$/.test(value) && Number.parseInt(value) >= 0 && Number.parseInt(value) <= 100)) {
      setGuess(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!guess) return

    const guessNumber = Number.parseInt(guess)
    const newAttempts = attempts + 1

    let newMessage = ""
    let newStatus = "playing"

    if (guessNumber === targetNumber) {
      newMessage = `Congratulations! You guessed the number in ${newAttempts} attempts!`
      newStatus = "won"
    } else if (guessNumber < targetNumber) {
      newMessage = "Too low! Try a higher number."
    } else {
      newMessage = "Too high! Try a lower number."
    }

    if (newAttempts >= maxAttempts && newStatus !== "won") {
      newMessage = `Game over! You've used all ${maxAttempts} attempts. The number was ${targetNumber}.`
      newStatus = "lost"
    }

    setAttempts(newAttempts)
    setMessage(newMessage)
    setGameStatus(newStatus)
    setGuessHistory([
      ...guessHistory,
      {
        number: guessNumber,
        result: guessNumber === targetNumber ? "correct" : guessNumber < targetNumber ? "low" : "high",
      },
    ])
    setGuess("")
  }

  return (
    <div className="space-y-4 p-4 border border-green-800 rounded bg-black/50">
      <h3 className="text-green-500 font-bold text-xl mb-4">Number Guessing Game</h3>

      <p className="text-green-400 mb-4">{message}</p>

      {gameStatus === "playing" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">
              Attempts: {attempts}/{maxAttempts}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={guess}
              onChange={handleGuessChange}
              className="bg-black border border-green-800 text-green-500 px-3 py-2 rounded w-20 text-center"
              placeholder="1-100"
              autoFocus
            />
            <Button
              type="submit"
              disabled={!guess}
              className="bg-green-900/50 hover:bg-green-800/50 text-green-500 border border-green-800"
            >
              Guess
            </Button>
          </form>

          {guessHistory.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-400 mb-2">Guess history:</p>
              <div className="flex flex-wrap gap-2">
                {guessHistory.map((item, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs ${
                      item.result === "correct"
                        ? "bg-green-900/30 text-green-500"
                        : item.result === "low"
                          ? "bg-yellow-900/30 text-yellow-500"
                          : "bg-red-900/30 text-red-500"
                    }`}
                  >
                    {item.number} {item.result === "low" ? "↑" : item.result === "high" ? "↓" : "✓"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <Button
            onClick={startNewGame}
            className="bg-green-900/50 hover:bg-green-800/50 text-green-500 border border-green-800"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
