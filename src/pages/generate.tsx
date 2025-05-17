import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { SparklesCore } from "@/components/sparkles"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Music, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function Generate() {
  const router = useRouter()
  const { query } = router.query
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query && typeof query === "string" && !isGenerating && !generatedContent) {
      // This would be where you actually make the API call to generate content
      generateContent(query)
    }
  }, [query])

  const generateContent = async (queryText: string) => {
    setIsGenerating(true)
    setError(null)

    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // For demonstration purposes, just using the query as part of the generated content
      const demoContent = `Iată melodia generată despre "${queryText}":\n\nVers 1:\nÎnvăț despre ${queryText} azi,\nCu melodia în minte rămâne,\nConcepte clare, nu mai uit nimic,\nȘi totul devine mai simplu așa.\n\nRefren:\nÎnvățarea prin muzică,\nInformația devine magică,\nEduTune transformă totul,\nÎn ceva ce nu voi uita niciodată.`
      
      setGeneratedContent(demoContent)
    } catch (err) {
      console.error("Error generating content:", err)
      setError("A apărut o eroare la generarea conținutului. Te rugăm să încerci din nou.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerateContent = () => {
    if (query && typeof query === "string") {
      setGeneratedContent(null)
      generateContent(query)
    }
  }

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

      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la pagina principală
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Generează o melodie despre: {query}
            </h1>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md mb-8">
                {error}
              </div>
            )}

            {isGenerating ? (
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                <p className="text-gray-400">Se generează melodia ta personalizată...</p>
              </div>
            ) : generatedContent ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="bg-white/5 border border-white/10 rounded-lg p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium text-white">Rezultatul generării</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleRegenerateContent}
                      className="inline-flex items-center px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm text-white"
                    >
                      <RotateCcw className="mr-2 h-3 w-3" />
                      Regenerează
                    </button>
                  </div>
                </div>
                
                <div className="whitespace-pre-line text-gray-300 mb-8">
                  {generatedContent}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors">
                    <Music className="mr-2 h-5 w-5" />
                    Ascultă melodia
                  </button>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md font-medium transition-colors">
                    <FileText className="mr-2 h-5 w-5" />
                    Descarcă versurile
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
                <p className="text-gray-400">Se încarcă...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Toaster component to display toast notifications */}
      <Toaster />
    </main>
  )
}