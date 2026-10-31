import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, PartyPopper } from 'lucide-react'

export default function ProposalGame({ onProposalAccepted }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0, rotate: 0 })
  const [noAttempts, setNoAttempts] = useState(0)
  const [showCelebrationPopup, setShowCelebrationPopup] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)

  const isAcceptedRef = useRef(false)
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const arenaRef = useRef(null)
  const noButtonRef = useRef(null)
  const yesButtonRef = useRef(null)
  const basePosRef = useRef(null)
  const noPositionRef = useRef({ x: 0, y: 0, rotate: 0 })
  const lastEscapeTimeRef = useRef(0)

  const playfulMessages = [
    "NO, I DON'T 🙈",
    "Arey aise kaise?! 😜",
    "Pakad ke dikhao! 🏃‍♂️💨",
    "Galat button Betu! 😂",
    "Raaz ko mana karogi? 🥺",
    "Fielding set kar rahi ho? 🏏",
    "Nope nope nope! 🙈",
    "Kuchupuchu ko 'No' nahi bolte! 😤❤️",
    "Catch me if you can! 💃",
    "Button bhaag gaya! 🚀",
    "Ek hi option hai: YES! 😌💍",
    "Madam ji, no chance! 🙅‍♂️❤️",
    "Main nahi rukne wala! 🏃‍♂️💨",
    "Betu vs Kuchupuchu: Kuchupuchu wins! 🏆😂",
    "Kitni koshish karogi meri jaan? 🥹💋",
    "Bas ab maan jao na Betuuuu! 🫂💍"
  ]

  // Multi-stage confetti celebration
  const triggerConfetti = () => {
    // Stage 1: Big center explosion
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff0055', '#ff5077', '#ffb3c1', '#ffd166', '#e63946', '#ffffff']
    })

    // Stage 2: Left and right cannons
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ['#e63946', '#ff4d6d', '#ff758f', '#fff']
      })
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ['#e63946', '#ff4d6d', '#ff758f', '#fff']
      })
    }, 250)

    // Stage 3: Stars and hearts falling
    setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 100,
        origin: { y: 0.4 },
        shapes: ['circle'],
        colors: ['#ff4d6d', '#ffb3c1', '#ffffff', '#ffd166']
      })
    }, 500)
  }

  // Calculate new safe random position for the NO button
  const moveNoButton = useCallback((pointerX, pointerY) => {
    if (isAcceptedRef.current || !arenaRef.current || !noButtonRef.current) return

    const now = Date.now()
    // Cooldown to avoid thrashing 60fps while mouse is moving
    if (now - lastEscapeTimeRef.current < 90) return
    lastEscapeTimeRef.current = now

    const arenaRect = arenaRef.current.getBoundingClientRect()
    const buttonRect = noButtonRef.current.getBoundingClientRect()
    const yesRect = yesButtonRef.current ? yesButtonRef.current.getBoundingClientRect() : null

    // Record or update un-transformed base position relative to arena
    if (!basePosRef.current) {
      basePosRef.current = {
        x: (buttonRect.left - arenaRect.left) - noPositionRef.current.x,
        y: (buttonRect.top - arenaRect.top) - noPositionRef.current.y
      }
    }

    const btnWidth = buttonRect.width || 150
    const btnHeight = buttonRect.height || 50
    const paddingX = 16
    const paddingTop = 12
    const paddingBottom = 12

    const maxArenaX = Math.max(paddingX, arenaRect.width - btnWidth - paddingX)
    const maxArenaY = Math.max(paddingTop, arenaRect.height - btnHeight - paddingBottom)

    // Pointer in arena coords
    const pX = (typeof pointerX === 'number' && pointerX > 0)
      ? pointerX - arenaRect.left
      : (buttonRect.left - arenaRect.left + btnWidth / 2)
    const pY = (typeof pointerY === 'number' && pointerY > 0)
      ? pointerY - arenaRect.top
      : (buttonRect.top - arenaRect.top + btnHeight / 2)

    // Yes button in arena coords with buffer
    const yesBuffer = 26
    let yesLeft = -999, yesRight = -999, yesTop = -999, yesBottom = -999
    if (yesRect) {
      yesLeft = yesRect.left - arenaRect.left - yesBuffer
      yesRight = yesRect.right - arenaRect.left + yesBuffer
      yesTop = yesRect.top - arenaRect.top - yesBuffer
      yesBottom = yesRect.bottom - arenaRect.top + yesBuffer
    }

    const checkOverlapYes = (x, y) => {
      if (!yesRect) return false
      const right = x + btnWidth
      const bottom = y + btnHeight
      return !(right < yesLeft || x > yesRight || bottom < yesTop || y > yesBottom)
    }

    // Diverse candidate destinations inside the arena
    const candidates = [
      // 4 Corners
      { x: paddingX, y: paddingTop },
      { x: maxArenaX, y: paddingTop },
      { x: paddingX, y: maxArenaY },
      { x: maxArenaX, y: maxArenaY },
      // Edge centers
      { x: paddingX, y: Math.max(paddingTop, maxArenaY / 2) },
      { x: maxArenaX, y: Math.max(paddingTop, maxArenaY / 2) },
      { x: (maxArenaX + paddingX) / 2, y: paddingTop },
      { x: (maxArenaX + paddingX) / 2, y: maxArenaY },
      // Opposite side based on pointer direction
      {
        x: pX > arenaRect.width / 2 ? paddingX + Math.random() * 40 : maxArenaX - Math.random() * 40,
        y: pY > arenaRect.height / 2 ? paddingTop + Math.random() * 30 : maxArenaY - Math.random() * 30
      },
      // Quadrant randoms
      { x: paddingX + Math.random() * (maxArenaX * 0.45), y: paddingTop + Math.random() * (maxArenaY * 0.45) },
      { x: maxArenaX * 0.55 + Math.random() * (maxArenaX * 0.45), y: paddingTop + Math.random() * (maxArenaY * 0.45) },
      { x: paddingX + Math.random() * (maxArenaX * 0.45), y: maxArenaY * 0.55 + Math.random() * (maxArenaY * 0.45) },
      { x: maxArenaX * 0.55 + Math.random() * (maxArenaX * 0.45), y: maxArenaY * 0.55 + Math.random() * (maxArenaY * 0.45) }
    ]

    // Filter valid candidates that stay in bounds and don't overlap YES
    const validCandidates = candidates.filter(c => {
      if (c.x < paddingX || c.x > maxArenaX || c.y < paddingTop || c.y > maxArenaY) return false
      if (checkOverlapYes(c.x, c.y)) return false
      return true
    })

    // Score candidates by distance to pointer and current position
    const currentArenaX = basePosRef.current.x + noPositionRef.current.x
    const currentArenaY = basePosRef.current.y + noPositionRef.current.y

    const pool = validCandidates.length > 0 ? validCandidates : candidates
    const scored = pool.map(c => {
      const distToPointer = Math.hypot(c.x + btnWidth / 2 - pX, c.y + btnHeight / 2 - pY)
      const distToCurrent = Math.hypot(c.x - currentArenaX, c.y - currentArenaY)
      return {
        ...c,
        score: distToPointer * 1.2 + distToCurrent * 0.8
      }
    })

    scored.sort((a, b) => b.score - a.score)

    // Select randomly among top 3 furthest candidates for unpredictable movement
    const topChoices = scored.slice(0, Math.min(3, scored.length))
    const chosen = topChoices[Math.floor(Math.random() * topChoices.length)] || { x: paddingX, y: maxArenaY }

    // Clamp coordinates safely within the arena
    const finalArenaX = Math.max(paddingX, Math.min(maxArenaX, chosen.x))
    const finalArenaY = Math.max(paddingTop, Math.min(maxArenaY, chosen.y))

    // Calculate translation delta
    const deltaX = finalArenaX - basePosRef.current.x
    const deltaY = finalArenaY - basePosRef.current.y

    // Playful rotation tilt (-10deg to +10deg)
    const randomRotate = (Math.random() - 0.5) * 20

    const newPos = { x: deltaX, y: deltaY, rotate: randomRotate }
    noPositionRef.current = newPos
    setNoPosition(newPos)
    setNoAttempts(prev => prev + 1)
  }, [])

  // Proximity check helper
  const checkProximity = useCallback((clientX, clientY) => {
    if (isAcceptedRef.current || !noButtonRef.current) return

    const btnRect = noButtonRef.current.getBoundingClientRect()
    const btnCenterX = btnRect.left + btnRect.width / 2
    const btnCenterY = btnRect.top + btnRect.height / 2

    const dist = Math.hypot(clientX - btnCenterX, clientY - btnCenterY)

    // Trigger evasive move if cursor gets within 85 pixels of button center
    if (dist < 85) {
      moveNoButton(clientX, clientY)
    }
  }, [moveNoButton])

  // Reset base positions on window resize
  useEffect(() => {
    const handleResize = () => {
      basePosRef.current = null
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Global pointer tracking when inside the proposal section
  useEffect(() => {
    const handleGlobalPointer = (e) => {
      if (isAcceptedRef.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      if (
        e.clientY >= rect.top - 40 &&
        e.clientY <= rect.bottom + 40 &&
        e.clientX >= rect.left - 40 &&
        e.clientX <= rect.right + 40
      ) {
        checkProximity(e.clientX, e.clientY)
      }
    }

    window.addEventListener('pointermove', handleGlobalPointer, { passive: true })
    return () => window.removeEventListener('pointermove', handleGlobalPointer)
  }, [checkProximity])

  // Handle direct attempted interaction on the NO button
  const handleNoDirectInteraction = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (isAcceptedRef.current) return

    let clientX = e?.clientX
    let clientY = e?.clientY
    if (e?.touches && e.touches[0]) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    }
    moveNoButton(clientX, clientY)
  }

  // Handle arena touch proximity for mobile
  const handleArenaTouch = (e) => {
    if (e.touches && e.touches[0]) {
      checkProximity(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const handleYesClick = () => {
    isAcceptedRef.current = true
    setIsAccepted(true)
    triggerConfetti()
    setShowCelebrationPopup(true)
  }

  const currentMessageIndex = noAttempts === 0
    ? 0
    : ((noAttempts - 1) % (playfulMessages.length - 1)) + 1
  const currentNoText = playfulMessages[currentMessageIndex]

  return (
    <section
      id="proposal-game"
      ref={containerRef}
      onPointerMove={(e) => checkProximity(e.clientX, e.clientY)}
      onTouchStart={handleArenaTouch}
      onTouchMove={handleArenaTouch}
      className="relative min-h-screen py-20 px-4 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#ffe4e6] via-[#fff0f3] to-[#ffe4e6]"
    >
      {/* Background romantic doodles */}
      <div className="absolute top-10 left-8 text-rose-300 opacity-60 text-4xl animate-bounce">
        🧸
      </div>
      <div className="absolute top-16 right-10 text-rose-300 opacity-60 text-4xl animate-pulse">
        💍
      </div>
      <div className="absolute bottom-12 left-10 text-rose-300 opacity-60 text-4xl animate-pulse">
        🌹
      </div>
      <div className="absolute bottom-16 right-8 text-rose-300 opacity-60 text-4xl animate-bounce">
        ✨
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Proposal Stage Card */}
        <div
          ref={cardRef}
          className="glass-card rounded-3xl p-6 sm:p-14 shadow-2xl border-2 border-rose-300 relative overflow-hidden"
        >
          {/* Top washi tape */}
          <div className="washi-tape"></div>

          {/* Giant Beating Heart */}
          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-6 bg-gradient-to-tr from-red-600 via-rose-600 to-pink-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-rose-600/40 relative"
          >
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 fill-white" />
            <span className="absolute -top-1 -right-1 text-2xl animate-spin-slow">
              ✨
            </span>
          </motion.div>

          {/* Small intro badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-handwriting font-bold border border-rose-200 mb-6">
            <Sparkles className="w-4 h-4 text-rose-500" />
            The Moment That Matters Most
            <Sparkles className="w-4 h-4 text-rose-500" />
          </div>

          {/* Prominent exact heading */}
          <h2 className="font-cursive text-3xl sm:text-6xl md:text-7xl text-rose-900 mb-6 leading-tight drop-shadow-sm font-bold">
            “HEY BETU, &lt;3 I LOBB YOUUU! WILLL YOU BE MY FOREVER? 💗🥹💍”
          </h2>

          {/* Subheading */}
          <p className="font-handwriting text-xl sm:text-3xl text-rose-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            “Ab itna pyaar kar hi liya hai, toh ek chhota sa sawaal hai meri jaan… hehe. 👉🏻👈🏻❤️”
          </p>

          {/* Dedicated Interactive Arena for Button Escapes */}
          <div
            ref={arenaRef}
            className="relative min-h-[260px] sm:min-h-[290px] w-full flex items-center justify-center my-4 overflow-visible"
          >
            {/* The Buttons Flex Container */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              {/* The YES Button */}
              <motion.button
                ref={yesButtonRef}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 10px 25px -5px rgba(225, 29, 72, 0.4)",
                    "0 20px 40px -5px rgba(225, 29, 72, 0.7)",
                    "0 10px 25px -5px rgba(225, 29, 72, 0.4)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={handleYesClick}
                className="relative z-20 px-7 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white font-sans font-bold text-lg sm:text-2xl shadow-xl border-2 border-white/80 flex items-center gap-3 transition-transform cursor-pointer"
              >
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white animate-heartbeat" />
                <span>YES, I WANNA! 💖🥹</span>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200" />
              </motion.button>

              {/* The Playful NO Button */}
              <motion.button
                ref={noButtonRef}
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                  rotate: noPosition.rotate || 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 24,
                  mass: 0.55
                }}
                onPointerEnter={handleNoDirectInteraction}
                onPointerDown={handleNoDirectInteraction}
                onTouchStart={handleNoDirectInteraction}
                onClick={handleNoDirectInteraction}
                onKeyDown={handleNoDirectInteraction}
                onFocus={handleNoDirectInteraction}
                tabIndex={-1}
                className="relative z-30 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-sans font-semibold text-base sm:text-lg border select-none cursor-pointer bg-white/95 text-rose-700 border-rose-300 shadow-xl hover:bg-rose-50 hover:shadow-2xl transition-colors whitespace-nowrap"
              >
                <span>{currentNoText}</span>
              </motion.button>
            </div>
          </div>

          {/* Little commentary when NO is attempted */}
          {noAttempts > 0 && (
            <motion.div
              key={noAttempts}
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 text-rose-600 font-handwriting text-xl sm:text-2xl min-h-[32px]"
            >
              {noAttempts === 1 && (
                <span>Hehe! Betu attempted NO 1 time... but my heart says there's only YES! 😌💘</span>
              )}
              {noAttempts > 1 && noAttempts < 5 && (
                <span>Arey wah! {noAttempts} attempts already? Kuchupuchu isn't letting you press that! 😂🏃‍♂️</span>
              )}
              {noAttempts >= 5 && noAttempts < 10 && (
                <span>Madam ji, {noAttempts} baar fielding set karne ki koshish?! But Raaz is way too fast! 🏏💨❤️</span>
              )}
              {noAttempts >= 10 && (
                <span>Awww Betu, {noAttempts} tries! Itna bhaaga diya mujhe... ab toh YES bol do meri jaan! 🥹🫂💋</span>
              )}
            </motion.div>
          )}

          {/* Inside joke footer */}
          <div className="mt-8 pt-6 border-t border-rose-100 flex items-center justify-center gap-2 text-rose-400 text-xs sm:text-sm font-sans">
            <span>Option A: YES</span>
            <span>•</span>
            <span>Option B: Option A</span>
            <span>•</span>
            <span>Fielding Set! 🏏</span>
          </div>
        </div>
      </div>

      {/* Pop-up Celebration Modal on YES */}
      <AnimatePresence>
        {showCelebrationPopup && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-2xl border-4 border-rose-400 relative overflow-hidden"
            >
              {/* Confetti icon badge */}
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-rose-500/30 animate-bounce">
                <PartyPopper className="w-10 h-10" />
              </div>

              {/* Exact required celebration message */}
              <h3 className="font-cursive text-4xl sm:text-5xl text-rose-800 font-bold mb-4 leading-tight">
                “AAAAAAAHHHHH! BETUUU SAID YESSSSS! 😭💖🎉”
              </h3>

              <p className="font-handwriting text-2xl sm:text-3xl text-rose-700 font-bold mb-8 leading-snug">
                “OFFICIALLY THE HAPPIEST KUCHUPUCHUU IN THE WORLD! MUAaaAHHHH! 💋❤️”
              </p>

              {/* Transition to final screen button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowCelebrationPopup(false)
                  onProposalAccepted()
                }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white font-sans font-bold text-lg sm:text-xl shadow-xl shadow-rose-600/40 hover:shadow-rose-600/60 transition-all border-2 border-white/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>OPEN YOUR FINAL SURPRISE 💌</span>
                <Heart className="w-5 h-5 fill-white" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
