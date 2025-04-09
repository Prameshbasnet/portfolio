"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const symbols = ["♠", "♥", "♦", "♣", "★", "☆", "✿", "✪", "✓", "✕", "⚡", "☀"]

export function MemoryGame() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameStatus, setGameStatus] = useState("playing") // playing, won
  const [gameSize, setGameSize] = useState(12) // 12 cards (6 pairs)

  useEffect(() => {
    startNewGame()
  }, [gameSize])

  const startNewGame = () => {
    // Create pairs of cards
    const numPairs = gameSize / 2
    const selectedSymbols = [...symbols].slice(0, numPairs)

    let newCards = []
    selectedSymbols.forEach((symbol) => {
      newCards.push({ id: Math.random(), symbol, matched: false })
      newCards.push({ id: Math.random(), symbol, matched: false })
    })

    // Shuffle cards
    newCards = newCards.sort(() => Math.random() - 0.5)

    setCards(newCards)
    setFlipped([])
    setSolved([])
    setMoves(0)
    setGameStatus("playing")
  }

  const handleCardClick = (id) => {
    // Ignore clicks if already solved or already flipped
    if (solved.includes(id) || flipped.includes(id) || flipped.length >= 2) return

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    // If two cards are flipped, check for a match
    if (newFlipped.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlipped
      const firstCard = cards.find((card) => card.id === firstId)
      const secondCard = cards.find((card) => card.id === secondId)

      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setSolved([...solved, firstId, secondId])
        setFlipped([])

        // Check if all cards are matched
        if (solved.length + 2 === cards.length) {
          setGameStatus("won")
        }
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  const changeGameSize = (size) => {
    setGameSize(size)
  }

  return (
    <div className="space-y-4 p-4 border border-green-800 rounded bg-black/50">
      <h3 className="text-green-500 font-bold text-xl mb-4">Memory Game</h3>

      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-400">Moves: {moves}</div>
        <div className="flex gap-2">
          <Button
            onClick={() => changeGameSize(8)}
            className={`text-xs ${gameSize === 8 ? "bg-green-900/50 text-green-500" : "bg-gray-900/50 text-gray-400"} border border-green-800`}
          >
            Easy
          </Button>
          <Button
            onClick={() => changeGameSize(12)}
            className={`text-xs ${gameSize === 12 ? "bg-green-900/50 text-green-500" : "bg-gray-900/50 text-gray-400"} border border-green-800`}
          >
            Medium
          </Button>
          <Button
            onClick={() => changeGameSize(16)}
            className={`text-xs ${gameSize === 16 ? "bg-green-900/50 text-green-500" : "bg-gray-900/50 text-gray-400"} border border-green-800`}
          >
            Hard
          </Button>
        </div>
      </div>

      {gameStatus === "won" ? (
        <div className="text-center py-4">
          <p className="text-green-500 font-bold mb-4">Congratulations! You completed the game in {moves} moves!</p>
          <Button
            onClick={startNewGame}
            className="bg-green-900/50 hover:bg-green-800/50 text-green-500 border border-green-800"
          >
            Play Again
          </Button>
        </div>
      ) : (
        <div
          className={`grid gap-2 ${gameSize === 8 ? "grid-cols-4" : gameSize === 12 ? "grid-cols-4" : "grid-cols-4"}`}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square flex items-center justify-center text-2xl 
                border rounded cursor-pointer transition-all duration-300
                ${
                  solved.includes(card.id)
                    ? "bg-green-900/30 border-green-800 text-green-500"
                    : flipped.includes(card.id)
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-gray-900 border-gray-800 text-transparent hover:bg-gray-800"
                }
              `}
            >
              {flipped.includes(card.id) || solved.includes(card.id) ? card.symbol : "?"}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
