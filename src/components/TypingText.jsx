import { useState, useEffect } from 'react'

export default function TypingText({ texts, className = '', speed = 60, pause = 2500 }) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, speed)
      return () => clearTimeout(t)
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, speed / 2)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex === 0) {
      setDeleting(false)
      setTextIndex((textIndex + 1) % texts.length)
    }
  }, [charIndex, deleting, textIndex, texts, speed, pause])

  return <span className={`${className} typing-cursor`}>{displayed}</span>
}
