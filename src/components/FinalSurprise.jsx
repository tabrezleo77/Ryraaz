import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, RotateCcw, Flame } from 'lucide-react'

export default function FinalSurprise({ onReplay }) {
  const [kisses, setKisses] = useState([])

  useEffect(() => {
    // Gentle celebration confetti when entering final screen
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#e63946', '#ff4d6d', '#ff758f', '#ffffff']
    })

    // Floating kisses animation array
    const kissElements = []
    for (let i = 0; i < 18; i++) {
      kissElements.push({
        id: i,
        left: `${Math.random() * 90 + 5}%`,
        size: Math.floor(Math.random() * 20) + 20,
        delay: Math.random() * 4,
        duration: Math.random() * 4 + 4
      })
    }
    setKisses(kissElements)
  }, [])

  const triggerKissBurst = () => {
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#be123c', '#ffffff']
    })
  }

  return (
    <section id="final-surprise" className="relative min-h-screen py-20 px-4 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff0f3] via-[#ffe4e6] to-[#fff0f3]">
      {/* Floating Kisses Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {kisses.map((k) => (
          <span
            key={k.id}
            className="floating-heart select-none text-red-500"
            style={{
              left: k.left,
              fontSize: `${k.size}px`,
              animationDuration: `${k.duration}s`,
              animationDelay: `${k.delay}s`,
            }}
          >
            💋
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        <div className="glass-card rounded-3xl p-8 sm:p-14 shadow-2xl border-4 border-rose-300 relative overflow-hidden backdrop-blur-md">
          {/* Top washi tape */}
          <div className="washi-tape"></div>

          {/* Sparkle badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 text-white text-sm font-sans font-bold shadow-lg shadow-red-600/30 mb-8 border border-white/40"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Our Forever Has Just Begun</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </motion.div>

          {/* Main Hero Photo Inside Animated Polaroid Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-sm sm:max-w-md mx-auto mb-10 group"
          >
            <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-2xl border-4 border-rose-200 rotate-[-1deg] hover:rotate-0 transition-transform duration-500 relative">
              {/* Corner hearts */}
              <span className="absolute -top-3 -left-3 text-3xl animate-bounce">
                🌹
              </span>
              <span className="absolute -top-3 -right-3 text-3xl animate-bounce [animation-delay:0.3s]">
                💖
              </span>

              {/* Photo */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-rose-50 border border-rose-100 shadow-inner">
                <img
                  src="/her/IMG_20261026_174356.jpg.jpeg"
                  alt="Raaz and Betu Together Forever"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/her/IMG_20261026_165815.jpg.jpeg"
                  }}
                />
              </div>

              {/* Caption */}
              <div className="mt-3 text-center">
                <p className="font-cursive text-3xl sm:text-4xl text-rose-800 font-bold">
                  Raaz ❤️ Rumannah
                </p>
                <p className="font-handwriting text-xl text-rose-500">
                  Meri Jaan, My Betu, Always ♾️
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main exact heading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-cursive text-4xl sm:text-6xl md:text-7xl text-rose-900 mb-6 leading-tight drop-shadow-sm font-bold"
          >
            “I WILL ALWAYS LOVE YOU, BETU, FOREVER! MUAAAHHHHH! ❤️♾️💋”
          </motion.h2>

          {/* Supporting exact message */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 p-6 sm:p-8 rounded-2xl border-2 border-rose-200 shadow-md mb-10 max-w-2xl mx-auto"
          >
            <p className="font-handwriting text-2xl sm:text-3xl text-rose-800 leading-relaxed">
              “My Betuuu, you're my favourite hello, my hardest goodbye, my cutest distraction, and one of the most precious parts of my life. Here's to more memories, more ghumi-ghumi plans, more biryani dates, more silly fights, more hugs, and a whole lot more love. I want to keep making beautiful memories with you, one little moment at a time. Forever your Raaz, forever your kuchupuchuuu. 🥹🫂❤️”
            </p>
          </motion.div>

          {/* Giant Animated Beating Heart Banner */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onClick={triggerKissBurst}
            className="inline-block cursor-pointer px-8 py-5 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white shadow-2xl shadow-rose-600/40 border-2 border-white/60 mb-10 hover:shadow-rose-600/60 transition-all"
            title="Click for a kiss burst! 💋"
          >
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-8 h-8 fill-white animate-heartbeat" />
              <span className="font-sans font-bold text-lg sm:text-2xl tracking-wide uppercase">
                RAAZ ❤️ RUMANNAH — OUR LITTLE WORLD, OUR FOREVER.
              </span>
              <Heart className="w-8 h-8 fill-white animate-heartbeat" />
            </div>
            <span className="block text-xs font-handwriting text-rose-100 mt-1">
              (Click this heart to send a kiss 💋)
            </span>
          </motion.div>

          {/* Replay Button */}
          <div className="pt-6 border-t border-rose-200 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReplay}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-rose-700 font-sans font-semibold text-sm sm:text-base border border-rose-300 shadow-md hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-rose-500" />
              <span>Relive Our Love Story Again? 💌</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
