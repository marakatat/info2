"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export function FloatingPaper({ count = 5 }) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [papers, setPapers] = useState<{ id: number; initialX: number; initialY: number }[]>([])
  const [notes, setNotes] = useState<{ id: number; initialX: number; initialY: number; type: number; size: number }[]>([])

  useEffect(() => {
    // Update dimensions only on client side
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()

    // Generate initial positions for papers
    const initialPapers = Array.from({ length: count }).map((_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
    }))
    setPapers(initialPapers)

    // Generate initial positions and properties for music notes
    const initialNotes = Array.from({ length: count + 3 }).map((_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      type: Math.floor(Math.random() * 3), // 3 different types of music notes
      size: Math.random() * 0.5 + 0.8, // Random size between 0.8 and 1.3
    }))
    setNotes(initialNotes)

    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [count])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {papers.map((paper) => (
        <motion.div
          key={paper.id}
          className="absolute"
          initial={{ x: paper.initialX, y: paper.initialY }}
          animate={{
            x: [
              paper.initialX,
              paper.initialX + Math.random() * 200 - 100,
              paper.initialX + Math.random() * 200 - 100,
              paper.initialX,
            ],
            y: [
              paper.initialY,
              paper.initialY + Math.random() * 200 - 100,
              paper.initialY + Math.random() * 200 - 100,
              paper.initialY,
            ],
            rotate: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <div className="relative w-16 h-20 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center transform hover:scale-110 transition-transform">
            <FileText className="w-8 h-8 text-purple-400/50" />
          </div>
        </motion.div>
      ))}
      
      {notes.map((note) => (
        <motion.div
          key={`note-${note.id}`}
          className="absolute pointer-events-none z-10"
          style={{ 
            fontSize: `${note.size * 2.5}rem`,
            filter: "drop-shadow(0 0 2px rgba(255,255,255,0.3))"
          }}
          initial={{ 
            x: note.initialX, 
            y: note.initialY, 
            opacity: 0,
            rotate: Math.random() * 40 - 20 
          }}
          animate={{
            y: [note.initialY, note.initialY - 200 - Math.random() * 300],
            x: [
              note.initialX,
              note.initialX + Math.sin(note.id) * 100,
            ],
            opacity: [0, 0.7, 0],
            rotate: [
              Math.random() * 40 - 20,
              Math.random() * 40 - 20 + 180
            ],
          }}
          transition={{
            duration: 7 + Math.random() * 6,
            times: [0, 0.1, 1],
            repeat: Infinity,
            delay: Math.random() * 10,
            repeatDelay: Math.random() * 5,
            ease: "easeOut",
          }}
        >
          <div className={`
            ${note.type === 0 ? 'text-indigo-400' : note.type === 1 ? 'text-pink-400' : 'text-purple-400'} 
            font-bold
          `}>
            {note.type === 0 ? "♪" : note.type === 1 ? "♫" : "♬"}
          </div>
        </motion.div>
      ))}
    </div>
  )
}