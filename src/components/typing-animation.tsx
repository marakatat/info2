"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenPhrases?: number
  initialPhrase?: number
  language?: "en" | "ro"
}

export function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 2000,
  initialPhrase = 0,
  language = "ro",
}: TypingAnimationProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(initialPhrase)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  
  // Find the longest phrase to set the container width
  const longestPhrase = phrases.reduce((longest, current) => 
    current.length > longest.length ? current : longest, ""
  )
  
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, delayBetweenPhrases)
      return () => clearTimeout(timeout)
    }

    const currentPhrase = phrases[currentPhraseIndex]

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false)
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, deletingSpeed)
      }
    } else {
      if (currentText === currentPhrase) {
        setIsWaiting(true)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1))
        }, typingSpeed)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isWaiting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases])

  return (
    <div 
      className="relative inline-block" 
      style={{ 
        minWidth: `${longestPhrase.length}ch`,
        minHeight: "1.2em",
        textAlign: "center"
      }}
    >
      <div style={{ display: "inline-flex", justifyContent: "center" }}>
        <span style={{ color: "white" }}>{currentText}</span>
        <span 
          style={{ 
            display: "inline-block",
            width: "4.5px", // Increased width from 3px to 4px
            backgroundColor: "rgb(168, 85, 247)", /* purple-500 */
            animation: "blink 1s step-end infinite",
            marginLeft: "1px",
            height: "0.9em", // Decreased height from 1.2em to 1em
            alignSelf: "center", // Center the cursor vertically
            transform: "translateY(-5px)" // Moving the cursor 1px up
          }}
        ></span>
      </div>
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
