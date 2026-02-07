import { useEffect, useState } from 'react'

interface TypingTextProps {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
  className?: string
}

export default function TypingText({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = '',
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [started, text, speed, onComplete])

  if (!started) return null

  return (
    <span className={className}>
      {displayed}
      <span className="animate-cursor-blink">|</span>
    </span>
  )
}
