import React, { useEffect, useState } from 'react'

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    // Generate gentle background floating hearts
    const items = []
    const symbols = ['💖', '💕', '❤️', '🌸', '✨', '🌹', '🍓', '💌']
    for (let i = 0; i < 24; i++) {
      items.push({
        id: i,
        symbol: symbols[i % symbols.length],
        left: `${Math.random() * 96}%`,
        size: Math.floor(Math.random() * 16) + 14,
        duration: Math.floor(Math.random() * 8) + 8,
        delay: Math.floor(Math.random() * 10),
        opacity: Math.random() * 0.4 + 0.25,
      })
    }
    setHearts(items)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart select-none"
          style={{
            left: h.left,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  )
}
