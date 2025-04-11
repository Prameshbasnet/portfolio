"use client"

import { useCallback, useEffect, useRef } from "react"

export function useScrollToBottom(ref) {
  // Track if we need to scroll
  const shouldScrollRef = useRef(true)

  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(() => {
        ref.current.scrollTop = ref.current.scrollHeight
      })
    }
  }, [ref])

  // Add this effect to ensure scrolling happens after DOM updates
  useEffect(() => {
    if (shouldScrollRef.current) {
      scrollToBottom()
    }
  })

  // Reset the scroll flag when content changes
  const setContentChanged = useCallback(() => {
    shouldScrollRef.current = true
  }, [])

  return { scrollToBottom, setContentChanged }
}
