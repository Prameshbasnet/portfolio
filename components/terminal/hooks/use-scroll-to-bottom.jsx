"use client"

import { useCallback } from "react"

export function useScrollToBottom(ref) {
  return useCallback(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [ref])
}
