"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export function MiniGame() {
  const [gameActive, setGameActive] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [bugPosition, setBugPosition] = useState({ x: 50, y: 50 })
  const gameAreaRef = useRef(null)

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(30)
    moveBug()
  }

  const endGame = () => {
    setGameActive(false)
  }

  const moveBug = () => {
    if (gameAreaRef.current) {
      const maxX = gameAreaRef.current.clientWidth - 30
      const maxY = gameAreaRef.current.clientHeight - 30

      const newX = Math.floor(Math.random() * maxX)
      const newY = Math.floor(Math.random() * maxY)

      setBugPosition({ x: newX, y: newY })
    }
  }

  const catchBug = () => {
    setScore((prev) => prev + 1)
    moveBug()
  }

  useEffect(() => {
    let timer

    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      endGame()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [gameActive, timeLeft])

  return (
    <div className="space-y-4">
      <div className="p-4 border border-primary/30 rounded bg-primary/5">
        <h3 className="text-primary font-bold mb-2">Bug Catcher Mini-Game</h3>
        <p className="text-sm mb-4">
          {gameActive ? `Time left: ${timeLeft}s | Score: ${score}` : "Catch as many bugs as you can in 30 seconds!"}
        </p>

        {!gameActive ? (
          <Button
            onClick={startGame}
            className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
          >
            Start Game
          </Button>
        ) : (
          <div
            ref={gameAreaRef}
            className="w-full h-[200px] border border-primary/30 rounded relative bg-black/50 overflow-hidden"
          >
            <div
              className="absolute w-6 h-6 text-center cursor-pointer"
              style={{
                left: `${bugPosition.x}px`,
                top: `${bugPosition.y}px`,
                transition: "left 0.1s, top 0.1s",
              }}
              onClick={catchBug}
            >
              🐛
            </div>
          </div>
        )}

        {!gameActive && score > 0 && (
          <p className="mt-4 text-sm">
            Game over! You caught {score} bugs. {score > 10 ? "Great job!" : "Try again to beat your score!"}
          </p>
        )}
      </div>
    </div>
  )
}
