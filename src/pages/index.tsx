import Hero from "@/components/ui/home_page/hero"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"
import { NotificationHandler } from "@/components/notification-handler"
import { Suspense } from "react"
import { FloatingPaper } from "@/components/floating-paper"
import LearnMore from "@/components/ui/home_page/learn-more"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[1] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Floating elements background (only paper, no notes) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingPaper count={4} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <LearnMore />
        {/* Wrap the NotificationHandler in a Suspense boundary */}
        <Suspense fallback={null}>
          <NotificationHandler />
        </Suspense>
      </div>
      
      {/* Add Toaster component to display toast notifications */}
      <Toaster />
    </main>
  )
}
