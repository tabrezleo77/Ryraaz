import React, { useState, useRef, useEffect } from 'react'
import { Music, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react'

export default function MusicPlayer({ autoPlayPrompt = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [hasUserStarted, setHasUserStarted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        setHasUserStarted(true)
      }).catch((err) => {
        console.warn('Audio play prevented or file unavailable:', err)
      })
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const nextMuted = !isMuted
    audioRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (audioRef.current) {
      audioRef.current.volume = val
      if (val > 0 && isMuted) {
        audioRef.current.muted = false
        setIsMuted(false)
      }
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/romantic-bgm.mp3"
        preload="metadata"
      />

      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        {/* Expanded Controls Card */}
        {isExpanded && (
          <div className="glass-card rounded-2xl p-3 shadow-xl flex items-center gap-3 border border-rose-200 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex flex-col text-left pr-2 border-r border-rose-100">
              <span className="text-xs font-semibold text-rose-800 flex items-center gap-1 font-sans">
                <Sparkles className="w-3 h-3 text-rose-500 animate-spin-slow" />
                Meri Banogi Kya
              </span>
              <span className="text-[10px] text-rose-600 font-handwriting">
                Raaz & Betu's Love Theme 🎵
              </span>
            </div>

            {/* Volume slider */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="p-1 rounded-full text-rose-700 hover:text-rose-900 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1.5 bg-rose-200 accent-rose-600 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Floating Bubble Button */}
        <div className="relative group">
          <button
            onClick={togglePlay}
            onMouseEnter={() => setIsExpanded(true)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 ${
              isPlaying
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-400 shadow-rose-300/50 scale-105'
                : 'glass-card text-rose-800 border-rose-200 hover:bg-rose-50 hover:scale-105'
            }`}
            title={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
          >
            <div className="relative">
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
                  <span className="w-1 bg-white rounded-full animate-bounce h-3" />
                  <span className="w-1 bg-white rounded-full animate-bounce h-4 [animation-delay:0.2s]" />
                  <span className="w-1 bg-white rounded-full animate-bounce h-2 [animation-delay:0.4s]" />
                </div>
              ) : (
                <Music className="w-4 h-4 text-rose-600" />
              )}
            </div>

            <span className="text-xs font-medium font-sans hidden sm:inline">
              {isPlaying ? 'Playing Our Song 🎶' : 'Play Music 🎵'}
            </span>

            <span className="text-xs">
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </span>
          </button>

          {/* Hint badge when paused */}
          {!hasUserStarted && (
            <span className="absolute -top-7 right-0 text-[11px] font-handwriting font-bold bg-white/95 text-rose-600 px-2 py-0.5 rounded-full border border-rose-200 shadow-sm whitespace-nowrap animate-bounce">
              Click for BGM 🎧💕
            </span>
          )}
        </div>
      </div>
    </>
  )
}
