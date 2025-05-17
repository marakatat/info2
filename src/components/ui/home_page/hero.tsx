"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import { TypingAnimation } from "@/components/typing-animation"
import { useRouter } from "next/router"
import { useIsMobile } from "@/lib/hooks/use-mobile"
import { useState } from "react"
import { toast } from "@/lib/hooks/use-toast"

export default function Hero() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [inputText, setInputText] = useState("")

  const handleNavigate = () => {
    if (inputText.trim()) {
      // Using Next.js router instead of direct window manipulation
      router.push(`/generate?query=${encodeURIComponent(inputText.trim())}`)
    } else {
      // Show toast notification when input is empty
      toast({
        title: "Eroare",
        description: "Introdu materia și clasa"
        //variant: "destructive",
      })
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center justify-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl w-full text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex justify-center w-full"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 mx-auto text-center inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                <TypingAnimation 
                  phrases={["EduTune.", "Redefinește învățatul!", "Învață prin muzică!"]} 
                  typingSpeed={80}
                  deletingSpeed={40}
                  delayBetweenPhrases={2500}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Transformă orice materie într-o melodie memorabilă cu ajutorul inteligenței artificiale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Introdu materia pe care dorești să o înveți..."
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleNavigate();
                }
              }}
            />
            <button
              onClick={handleNavigate}
              className="inline-flex items-center justify-center h-12 px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors w-full sm:w-auto cursor-pointer"
            >
              Generează
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className={`absolute ${isMobile ? 'bottom-[-90px]' : 'bottom-0'} right-0 w-96 h-96`}>
        <RoboAnimation />
      </div>
    </div>
  )
}