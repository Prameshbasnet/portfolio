"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export function SnakeGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 5, y: 5 })
  const [direction, setDirection] = useState("RIGHT")
  const [speed, setSpeed] = useState(150)

  const canvasRef = useRef(null)
  const gameLoopRef = useRef(null)

  const gridSize = 20
  const canvasSize = 300
  const cellSize = canvasSize / gridSize

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP")
          break
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN")
          break
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT")
          break
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [gameStarted, direction])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const drawGame = () => {
      // Clear canvas
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvasSize, canvasSize)

      // Draw snake
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#4ade80" : "#22c55e"
        ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize)

        // Draw border
        ctx.strokeStyle = "black"
        ctx.lineWidth = 1
        ctx.strokeRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize)
      })

      // Draw food
      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.arc(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize / 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw score
      ctx.fillStyle = "white"
      ctx.font = "16px monospace"
      ctx.fillText(`Score: ${score}`, 10, 20)
    }

    const moveSnake = () => {
      const newSnake = [...snake]
      const head = { ...newSnake[0] }

      switch (direction) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check for collisions with walls
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true)
        return
      }

      // Check for collisions with self
      for (let i = 0; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameOver(true)
          return
        }
      }

      // Check for food collision
      if (head.x === food.x && head.y === food.y) {
        // Generate new food
        let newFood
        do {
          newFood = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          }
          // Make sure food doesn't spawn on snake
        } while (newSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))

        setFood(newFood)
        setScore(score + 1)

        // Increase speed every 5 points
        if (score > 0 && score % 5 === 0) {
          setSpeed((prevSpeed) => Math.max(prevSpeed - 10, 50))
        }
      } else {
        // Remove tail if not eating
        newSnake.pop()
      }

      // Add new head
      newSnake.unshift(head)
      setSnake(newSnake)
    }

    const gameLoop = () => {
      moveSnake()
      drawGame()
    }

    gameLoopRef.current = setInterval(gameLoop, speed)

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameStarted, gameOver, snake, food, direction, score, speed])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setSnake([{ x: 10, y: 10 }])
    setFood({
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    })
    setDirection("RIGHT")
    setSpeed(150)
  }

  return (
    <div className="text-green-500 font-mono">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-white">Snake Game</h3>
        {!gameStarted && (
          <Button
            onClick={startGame}
            className="bg-green-900/50 hover:bg-green-800/50 text-green-500 border border-green-800"
          >
            Start Game
          </Button>
        )}
      </div>

      <div className="border border-green-800 bg-black/30 p-2">
        <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="border border-green-800" />

        {gameOver && (
          <div className="mt-4 text-center">
            <p className="text-red-500 mb-2">Game Over! Your score: {score}</p>
            <Button
              onClick={startGame}
              className="bg-green-900/50 hover:bg-green-800/50 text-green-500 border border-green-800"
            >
              Play Again
            </Button>
          </div>
        )}

        <div className="mt-2 text-xs text-gray-500">
          <p>Use arrow keys to control the snake.</p>
          <p>Collect the red food to grow and earn points.</p>
        </div>
      </div>
    </div>
  )
}
