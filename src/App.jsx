import React, { useState, useEffect } from 'react'
import OpeningScreen from './components/OpeningScreen'
import LoveLetter from './components/LoveLetter'
import MemoriesGallery from './components/MemoriesGallery'
import BetuThings from './components/BetuThings'
import FavouritePictures from './components/FavouritePictures'
import ProposalGame from './components/ProposalGame'
import FinalSurprise from './components/FinalSurprise'
import MusicPlayer from './components/MusicPlayer'
import FloatingHearts from './components/FloatingHearts'
import { Heart, Sparkles, Navigation, ArrowUp } from 'lucide-react'

export default function App() {
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false)
  const [proposalAccepted, setProposalAccepted] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenSurprise = () => {
    setHasOpenedSurprise(true)
    setTimeout(() => {
      const letterEl = document.getElementById('love-letter')
      if (letterEl) {
        letterEl.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleScrollToMemories = () => {
    const el = document.getElementById('memories-gallery')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleProposalAccepted = () => {
    setProposalAccepted(true)
    setTimeout(() => {
      const el = document.getElementById('final-surprise')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 150)
  }

  const handleReplay = () => {
    setProposalAccepted(false)
    setHasOpenedSurprise(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Floating Background Sparkles & Hearts */}
      <FloatingHearts />

      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Quick Section Nav (Visible when surprise is open and not in proposal final screen) */}
      {hasOpenedSurprise && !proposalAccepted && (
        <header className="sticky top-3 z-40 max-w-fit mx-auto px-4 py-2 glass-card rounded-full shadow-lg border border-rose-200/80 animate-in fade-in flex items-center gap-1 sm:gap-3 text-xs sm:text-sm font-sans font-medium text-rose-800 backdrop-blur-md">
          <a
            href="#love-letter"
            className="px-3 py-1 rounded-full hover:bg-rose-100 transition-colors"
          >
            Letter 💌
          </a>
          <span className="text-rose-200">•</span>
          <a
            href="#memories-gallery"
            className="px-3 py-1 rounded-full hover:bg-rose-100 transition-colors"
          >
            Memories 📸
          </a>
          <span className="text-rose-200">•</span>
          <a
            href="#betu-things"
            className="px-3 py-1 rounded-full hover:bg-rose-100 transition-colors"
          >
            Things Betu Loves 🍓
          </a>
          <span className="text-rose-200">•</span>
          <a
            href="#favourite-pictures"
            className="px-3 py-1 rounded-full hover:bg-rose-100 transition-colors"
          >
            3 Pieces 🖼️
          </a>
          <span className="text-rose-200">•</span>
          <a
            href="#proposal-game"
            className="px-3.5 py-1 rounded-full bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-400"
          >
            Proposal 💍
          </a>
        </header>
      )}

      {/* Screen 1: Opening Screen */}
      <OpeningScreen onOpenSurprise={handleOpenSurprise} />

      {/* Main Content Sections (Rendered when surprise is opened) */}
      {hasOpenedSurprise && (
        <main className="relative z-10 transition-opacity duration-700">
          {/* Section One: A Little Letter From Your Raaz */}
          <LoveLetter onScrollToMemories={handleScrollToMemories} />

          {/* Section Two: Our Little World, Our Little Memories */}
          <MemoriesGallery />

          {/* Section Three: Things My Betu Loves */}
          <BetuThings />

          {/* Section Four: Three Pictures, Three Pieces of My Heart */}
          <FavouritePictures />

          {/* Section Five: The Official Betu Proposal Game */}
          <ProposalGame onProposalAccepted={handleProposalAccepted} />

          {/* Final Screen: I Will Always Love You, Betu Forever */}
          {proposalAccepted && (
            <FinalSurprise onReplay={handleReplay} />
          )}
        </main>
      )}

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-40 p-3 rounded-full glass-card text-rose-700 hover:text-rose-900 border border-rose-200 shadow-lg hover:scale-110 transition-all duration-300"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
