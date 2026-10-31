import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Film,
  Image as ImageIcon,
  Heart,
  Calendar,
  Sparkles,
  Maximize2
} from 'lucide-react'

export default function MemoriesGallery() {
  const [items, setItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [filter, setFilter] = useState('all')
  const [fullscreenImage, setFullscreenImage] = useState(null)
  const videoRef = useRef(null)

  // Fetch media manifest on mount
  useEffect(() => {
    fetch('/media-manifest.json')
      .then((res) => {
        if (!res.ok) throw new Error('Manifest not found')
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data)
        }
      })
      .catch((err) => {
        console.warn('Could not load media manifest, using default fallback list', err)
        // Fallback default list
        setItems([
          {
            id: '1',
            filename: 'IMG_20261026_174356.jpg.jpeg',
            src: '/her/IMG_20261026_174356.jpg.jpeg',
            type: 'photo',
            title: 'Red Roses For My Red Rose 🌹',
            caption: 'Your favourite red roses, that beautiful smile, and me holding the love of my life.',
            date: 'October 2026',
            tag: 'Our Date'
          },
          {
            id: '2',
            filename: 'IMG_20261026_174510.jpg.jpeg',
            src: '/her/IMG_20261026_174510.jpg.jpeg',
            type: 'photo',
            title: 'Haath Mein Haath, Hamesha Ke Liye 🫂💞',
            caption: 'Holding your hand, feeling your touch, and wishing time would just freeze right here.',
            date: 'October 2026',
            tag: 'Holding Hands'
          },
          {
            id: '3',
            filename: 'IMG_20261026_165815.jpg.jpeg',
            src: '/her/IMG_20261026_165815.jpg.jpeg',
            type: 'photo',
            title: 'Mall Dates & Endless Giggles 🛍️✨',
            caption: 'Ghumi-ghumi with my favourite human. That pretty face lights up my whole world.',
            date: 'October 2026',
            tag: 'Ghumi Ghumi'
          }
        ])
      })
  }, [])

  // Filter items
  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'photos') return item.type === 'photo'
    if (filter === 'videos') return item.type === 'video'
    return item.tag?.toLowerCase() === filter.toLowerCase()
  })

  // Keep index within bounds when filter changes
  useEffect(() => {
    if (currentIndex >= filteredItems.length) {
      setCurrentIndex(0)
    }
  }, [filter, filteredItems.length, currentIndex])

  // Slideshow timer
  useEffect(() => {
    let timer = null
    const currentItem = filteredItems[currentIndex]

    // Don't auto-advance while playing a video
    if (isPlaying && currentItem?.type !== 'video' && filteredItems.length > 1) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredItems.length)
      }, 4500)
    }
    return () => clearInterval(timer)
  }, [isPlaying, currentIndex, filteredItems])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'ArrowLeft') {
        goToPrev()
      } else if (e.key === 'Escape') {
        setFullscreenImage(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredItems.length])

  const goToNext = () => {
    if (filteredItems.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const goToPrev = () => {
    if (filteredItems.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  const currentItem = filteredItems[currentIndex]

  return (
    <section id="memories-gallery" className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-handwriting font-bold border border-rose-200 mb-3"
        >
          <Film className="w-4 h-4 text-rose-500" />
          Our Little World, Our Little Memories
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
        </motion.div>

        <h2 className="font-cursive text-4xl sm:text-6xl text-rose-900 mb-4 drop-shadow-sm">
          Every Click A Piece Of My Heart
        </h2>

        {/* Required introductory quote */}
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-700 leading-relaxed bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-rose-100 shadow-sm">
          “Every picture has a story, every moment has a little piece of my heart… and somehow, all my favourite memories have you in them. ❤️”
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: 'all', label: 'All Memories 💖' },
          { id: 'photos', label: 'Photos Only 📸' },
          { id: 'videos', label: 'Videos 📹' },
          { id: 'Betu Special', label: 'Betu Queen 👸🏻' },
          { id: 'Our Date', label: 'Roses & Dates 🌹' },
          { id: 'Artwork', label: 'Artistic Us 🎨' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setFilter(tab.id)
              setCurrentIndex(0)
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all duration-200 ${
              filter === tab.id
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-105'
                : 'bg-white/80 text-rose-800 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Slideshow Frame */}
      {filteredItems.length > 0 && currentItem ? (
        <div className="relative">
          <div className="glass-card rounded-3xl p-4 sm:p-8 shadow-2xl border-2 border-rose-200 relative overflow-hidden">
            {/* Top washi tape */}
            <div className="washi-tape"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Media viewer (Left 7 cols) */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[350px] sm:min-h-[480px] bg-slate-900/5 rounded-2xl overflow-hidden border border-rose-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id || currentItem.filename}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {currentItem.type === 'video' ? (
                      <div className="relative w-full max-h-[500px] flex items-center justify-center bg-black/90 rounded-xl overflow-hidden">
                        <video
                          ref={videoRef}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full max-h-[500px] object-contain rounded-xl"
                          poster={currentItem.poster || undefined}
                        >
                          {currentItem.h264Src && (
                            <source src={currentItem.h264Src} type="video/mp4" />
                          )}
                          <source src={currentItem.src} type="video/mp4" />
                          Your browser does not support playing this video.
                        </video>
                      </div>
                    ) : (
                      <div className="relative w-full h-[360px] sm:h-[480px] flex items-center justify-center group">
                        <img
                          src={currentItem.src}
                          alt={currentItem.title}
                          className="max-h-full max-w-full object-contain rounded-xl shadow-md transition-transform duration-500 group-hover:scale-102"
                          onError={(e) => {
                            // Graceful fallback placeholder
                            e.target.onerror = null
                            e.target.src = '/her/IMG_20261026_174356.jpg.jpeg'
                          }}
                        />

                        {/* Fullscreen zoom button */}
                        <button
                          onClick={() => setFullscreenImage(currentItem.src)}
                          className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/75 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                          title="View Full Image"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Floating Arrows on Media */}
                <button
                  onClick={goToPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-rose-700 shadow-md backdrop-blur-sm transition-transform hover:scale-110 z-10"
                  aria-label="Previous Memory"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-rose-700 shadow-md backdrop-blur-sm transition-transform hover:scale-110 z-10"
                  aria-label="Next Memory"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Memory Story & Details (Right 5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full p-2">
                <div>
                  {/* Tag and Counter */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold font-sans">
                      <Sparkles className="w-3 h-3 text-rose-500" />
                      {currentItem.tag || 'Memory'}
                    </span>
                    <span className="text-xs font-sans text-rose-400 font-medium">
                      Memory {currentIndex + 1} of {filteredItems.length}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-800 font-bold mb-3 leading-snug">
                    {currentItem.title}
                  </h3>

                  {/* Caption */}
                  <p className="font-sans text-slate-700 text-base sm:text-lg leading-relaxed mb-6 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                    {currentItem.caption}
                  </p>

                  {/* Date badge */}
                  <div className="flex items-center gap-2 text-rose-500 text-sm font-sans mb-6">
                    <Calendar className="w-4 h-4" />
                    <span>{currentItem.date}</span>
                    <span>•</span>
                    <span className="text-rose-400 font-handwriting text-lg">
                      Moments With Betu ♾️
                    </span>
                  </div>
                </div>

                {/* Slideshow Controls Bar */}
                <div className="pt-4 border-t border-rose-100 flex flex-wrap items-center justify-between gap-4">
                  {/* Play / Pause Slideshow */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm font-medium transition-all ${
                      isPlaying
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Pause Slideshow</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Play Slideshow</span>
                      </>
                    )}
                  </button>

                  {/* Prev / Next buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPrev}
                      className="p-2 rounded-full border border-rose-200 text-rose-700 hover:bg-rose-50 transition-colors"
                      title="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="p-2 rounded-full border border-rose-200 text-rose-700 hover:bg-rose-50 transition-colors"
                      title="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="mt-8 pt-6 border-t border-rose-100">
              <p className="text-xs font-sans text-rose-400 font-semibold mb-3 text-center sm:text-left">
                CLICK ANY THUMBNAIL TO VIEW:
              </p>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-rose-300">
                {filteredItems.map((item, idx) => (
                  <button
                    key={item.id || item.filename}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      currentIndex === idx
                        ? 'border-rose-600 scale-105 shadow-md shadow-rose-400/50'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    {item.type === 'video' ? (
                      <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-white p-1">
                        <Film className="w-5 h-5 text-rose-300" />
                        <span className="text-[9px] mt-0.5 truncate max-w-full">Video</span>
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/her/IMG_20261026_174356.jpg.jpeg'
                        }}
                      />
                    )}
                    {currentIndex === idx && (
                      <span className="absolute bottom-0 inset-x-0 h-1 bg-rose-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center text-rose-700">
          <Heart className="w-12 h-12 mx-auto text-rose-400 mb-3 animate-pulse" />
          <p className="font-handwriting text-2xl">No memories found in this filter.</p>
          <button
            onClick={() => setFilter('all')}
            className="mt-3 px-4 py-1.5 rounded-full bg-rose-600 text-white font-sans text-sm"
          >
            Show All Memories
          </button>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={fullscreenImage}
              alt="Fullscreen memory"
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <p className="text-center text-white/80 font-handwriting text-xl mt-3">
              Click anywhere to close ✨
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
