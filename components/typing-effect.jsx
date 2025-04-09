"use client"

import { useState, useEffect } from "react"

export function TypingEffect({ text, speed = 50, delay = 0, onComplete, className = "" }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // Reset when text changes
    setDisplayText("")
    setCurrentIndex(0)
    setStarted(false)
  }, [text])

  useEffect(() => {
    // Initial delay before starting
    if (!started) {
      const startTimer = setTimeout(() => {
        setStarted(true)
      }, delay)

      return () => clearTimeout(startTimer)
    }

    // Type each character
    if (started && currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(typingTimer)
    } else if (started && currentIndex === text.length && onComplete) {
      onComplete()
    }
  }, [text, speed, delay, currentIndex, started, onComplete])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="cursor-blink">_</span>}
    </span>
  )
}
