import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Mail, Gift, ArrowDown } from 'lucide-react'

export default function OpeningScreen({ onOpenSurprise }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(() => {
      onOpenSurprise()
    }, 800)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-b from-[#fff0f3] via-[#ffe4e6] to-[#fff9fa]">
      {/* Decorative background circles & sparkles */}
      <div className="absolute top-12 left-10 text-rose-300 opacity-60 text-4xl animate-bounce">
        ✨
      </div>
      <div className="absolute top-1/4 right-12 text-rose-300 opacity-60 text-3xl animate-pulse">
        🧸
      </div>
      <div className="absolute bottom-16 left-12 text-rose-300 opacity-60 text-3xl animate-bounce [animation-delay:1s]">
        🍓
      </div>
      <div className="absolute bottom-24 right-16 text-rose-300 opacity-60 text-4xl animate-pulse [animation-delay:0.5s]">
        🌹
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-xl w-full text-center"
      >
        {/* Envelope / Gift Card Presentation */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-rose-200/80 relative overflow-hidden">
          {/* Top washi tape */}
          <div className="washi-tape"></div>

          {/* Adorable animated badge */}
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-sm font-handwriting font-bold mb-6 border border-rose-200"
          >
            <Sparkles className="w-4 h-4 text-rose-500" />
            Special Delivery From Raaz
            <Sparkles className="w-4 h-4 text-rose-500" />
          </motion.div>

          {/* Cute envelope / heart icon */}
          <motion.div
            animate={isOpening ? { scale: [1, 1.3, 0], rotate: [0, 15, -15] } : { y: [0, -8, 0] }}
            transition={isOpening ? { duration: 0.7 } : { repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-rose-500 via-red-500 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/30 relative"
          >
            <Mail className="w-12 h-12" />
            <span className="absolute -top-2 -right-2 bg-white text-rose-600 rounded-full p-1.5 shadow-md border border-rose-100">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-heartbeat" />
            </span>
          </motion.div>

          {/* Primary opening line */}
          <h1 className="font-cursive text-4xl sm:text-6xl text-rose-800 mb-4 leading-tight">
            Someone has a little surprise for you, Betu… 💌
          </h1>

          <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 mb-8 max-w-md mx-auto">
            A tiny digital universe made with all my love, laughter, and inside jokes. Just for you.
          </p>

          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white font-sans font-semibold text-lg sm:text-xl shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 transition-all duration-300 border-2 border-white/40"
          >
            <Heart className="w-6 h-6 fill-white text-white group-hover:scale-125 transition-transform" />
            <span>Open Your Surprise, Betu 💗</span>
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-45 transition-transform" />
          </motion.button>

          {/* Bottom cute tag */}
          <div className="mt-8 pt-6 border-t border-rose-100 flex items-center justify-center gap-2 text-rose-400 text-xs font-sans">
            <span>Raaz</span>
            <span>•</span>
            <span>Rumannah</span>
            <span>•</span>
            <span>Forever</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
