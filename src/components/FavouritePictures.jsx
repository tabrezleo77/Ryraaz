import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Image as ImageIcon, Edit3, Check } from 'lucide-react'

export default function FavouritePictures({ customPictures, onUpdatePicture }) {
  // Configurable pictures state (defaults set to the authentic photos from her/)
  const [pictures, setPictures] = useState(customPictures || {
    betu: {
      id: 'my-favourite-picture-of-betu',
      heading: 'My Favourite Girl in My Favourite Picture 🌹',
      caption: 'How can someone look this beautiful without even trying? Meri jaan, meri favourite face forever. 🥹❤️',
      src: '/her/Screenshot_20261023_103136.jpg.jpeg',
      alt: 'My Favourite Picture of Betu',
      note: 'Betu Looking Angelic 🌸'
    },
    raaz: {
      id: 'betu-favourite-picture-of-raaz',
      heading: 'The Boy Who Is Completely Gone for You 😭💘',
      caption: 'Apparently, this is your favourite picture of me. Matlab madam ji ko apna kuchupuchuuu pasand hai! Hehe. 😌💋',
      src: '/her/IMG-20261024-WA0019.jpg.jpeg',
      alt: 'Betu Favourite Picture of Raaz',
      note: 'Apka Kuchupuchuuu 🫶🏻'
    },
    together: {
      id: 'our-favourite-picture-together',
      heading: 'My Favourite Us, Always ♾️❤️',
      caption: 'Out of all the pictures in the world, this one will always feel like home because it\'s us. 🫂💗',
      src: '/her/IMG_20261026_174356.jpg.jpeg',
      alt: 'Our Favourite Picture Together',
      note: 'Raaz ❤️ Rumannah'
    }
  })

  // Quick picker options for easy switching
  const photoOptions = {
    betu: [
      { label: 'Green Kurti Smile', src: '/her/Screenshot_20261023_103136.jpg.jpeg' },
      { label: 'Red Mirror Selfie', src: '/her/Snapchat-1229657166.jpg.jpeg' },
      { label: 'Pink Saree Look', src: '/her/IMG-20261022-WA0001.jpg.jpeg' },
      { label: 'Sleepy Video Call', src: '/her/Screenshot_20261025_205010.jpg.jpeg' },
    ],
    raaz: [
      { label: 'Raaz Black Tee Smile', src: '/her/IMG-20261024-WA0019.jpg.jpeg' },
      { label: 'Raaz Solo Frame', src: '/her/ezgif-frame-009.jpg.jpeg' },
    ],
    together: [
      { label: 'Red Roses Date', src: '/her/IMG_20261026_174356.jpg.jpeg' },
      { label: 'Mall Couple Selfie', src: '/her/IMG_20261026_171405.jpg.jpeg' },
      { label: 'Mall Selfie Date', src: '/her/IMG_20261026_165815.jpg.jpeg' },
      { label: 'Holding Roses & Hands', src: '/her/IMG_20261026_174510.jpg.jpeg' },
      { label: 'Illustrated Art Us', src: '/her/IMG-20261021-WA0054.jpg.jpeg' },
      { label: 'Anime Style Us', src: '/her/IMG_20261022_191016.jpg.jpeg' },
    ]
  }

  const [activePicker, setActivePicker] = useState(null)

  const handleSelectPhoto = (category, newSrc) => {
    const updated = {
      ...pictures,
      [category]: {
        ...pictures[category],
        src: newSrc
      }
    }
    setPictures(updated)
    setActivePicker(null)
    if (onUpdatePicture) onUpdatePicture(category, newSrc)
  }

  return (
    <section id="favourite-pictures" className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-handwriting font-bold border border-rose-200 mb-3"
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          Three Pictures, Three Pieces of My Heart
          <Sparkles className="w-4 h-4 text-rose-500" />
        </motion.div>

        <h2 className="font-cursive text-4xl sm:text-6xl text-rose-900 mb-4 drop-shadow-sm">
          Framed In Love Forever
        </h2>
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-600">
          The three special photos that hold the essence of our story.
        </p>
      </div>

      {/* 3 Polaroids Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* CARD ONE: My Favourite Picture of Betu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col justify-between bg-white p-5 rounded-3xl shadow-xl hover:shadow-2xl border-2 border-rose-200 rotate-[-1.5deg] hover:rotate-0 transition-all duration-300 group hover:border-red-400 hover:shadow-red-200/50"
        >
          {/* Tape */}
          <div className="washi-tape"></div>

          <div>
            {/* Tag Badge */}
            <div className="flex items-center justify-between mb-3 pt-1">
              <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-sans">
                PIECE 01 • BETU
              </span>
              <button
                onClick={() => setActivePicker(activePicker === 'betu' ? null : 'betu')}
                className="text-[11px] font-sans text-rose-500 hover:text-rose-700 flex items-center gap-1 opacity-75 hover:opacity-100"
                title="Change Photo"
              >
                <Edit3 className="w-3 h-3" />
                <span>Switch</span>
              </button>
            </div>

            {/* Photo frame with zoom effect and subtle red glow */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-rose-50 border border-rose-100 shadow-inner group-hover:shadow-rose-300/40 transition-shadow">
              <img
                src={pictures.betu.src}
                alt={pictures.betu.alt}
                id={pictures.betu.id}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/her/Screenshot_20261023_103136.jpg.jpeg'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-handwriting">
                  {pictures.betu.note}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="mt-5 text-center">
              <h3 className="font-cursive text-3xl text-rose-900 mb-2 leading-snug">
                {pictures.betu.heading}
              </h3>
              <p className="font-handwriting text-xl text-slate-700 leading-snug bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                {pictures.betu.caption}
              </p>
            </div>
          </div>

          {/* Quick switcher dropdown */}
          {activePicker === 'betu' && (
            <div className="mt-4 pt-3 border-t border-rose-100 animate-in fade-in">
              <p className="text-[10px] font-sans font-semibold text-rose-400 mb-2 uppercase">
                Choose favourite Betu photo:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {photoOptions.betu.map((opt) => (
                  <button
                    key={opt.src}
                    onClick={() => handleSelectPhoto('betu', opt.src)}
                    className={`text-[10px] p-1.5 rounded-lg border text-left truncate transition-colors ${
                      pictures.betu.src === opt.src
                        ? 'bg-rose-600 text-white border-rose-600 font-semibold'
                        : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* CARD TWO: Betu's Favourite Picture of Raaz */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative flex flex-col justify-between bg-white p-5 rounded-3xl shadow-xl hover:shadow-2xl border-2 border-rose-200 rotate-[1deg] hover:rotate-0 transition-all duration-300 group hover:border-red-400 hover:shadow-red-200/50"
        >
          {/* Tape */}
          <div className="washi-tape"></div>

          <div>
            {/* Tag Badge */}
            <div className="flex items-center justify-between mb-3 pt-1">
              <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-sans">
                PIECE 02 • RAAZ
              </span>
              <button
                onClick={() => setActivePicker(activePicker === 'raaz' ? null : 'raaz')}
                className="text-[11px] font-sans text-rose-500 hover:text-rose-700 flex items-center gap-1 opacity-75 hover:opacity-100"
                title="Change Photo"
              >
                <Edit3 className="w-3 h-3" />
                <span>Switch</span>
              </button>
            </div>

            {/* Photo frame */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-rose-50 border border-rose-100 shadow-inner group-hover:shadow-rose-300/40 transition-shadow">
              <img
                src={pictures.raaz.src}
                alt={pictures.raaz.alt}
                id={pictures.raaz.id}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/her/IMG-20261024-WA0019.jpg.jpeg'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-handwriting">
                  {pictures.raaz.note}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="mt-5 text-center">
              <h3 className="font-cursive text-3xl text-rose-900 mb-2 leading-snug">
                {pictures.raaz.heading}
              </h3>
              <p className="font-handwriting text-xl text-slate-700 leading-snug bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                {pictures.raaz.caption}
              </p>
            </div>
          </div>

          {/* Quick switcher dropdown */}
          {activePicker === 'raaz' && (
            <div className="mt-4 pt-3 border-t border-rose-100 animate-in fade-in">
              <p className="text-[10px] font-sans font-semibold text-rose-400 mb-2 uppercase">
                Choose favourite Raaz photo:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {photoOptions.raaz.map((opt) => (
                  <button
                    key={opt.src}
                    onClick={() => handleSelectPhoto('raaz', opt.src)}
                    className={`text-[10px] p-1.5 rounded-lg border text-left truncate transition-colors ${
                      pictures.raaz.src === opt.src
                        ? 'bg-rose-600 text-white border-rose-600 font-semibold'
                        : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* CARD THREE: Our Favourite Picture Together */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative flex flex-col justify-between bg-white p-5 rounded-3xl shadow-xl hover:shadow-2xl border-2 border-rose-200 rotate-[-1deg] hover:rotate-0 transition-all duration-300 group hover:border-red-400 hover:shadow-red-200/50"
        >
          {/* Tape */}
          <div className="washi-tape"></div>

          <div>
            {/* Tag Badge */}
            <div className="flex items-center justify-between mb-3 pt-1">
              <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-sans">
                PIECE 03 • TOGETHER
              </span>
              <button
                onClick={() => setActivePicker(activePicker === 'together' ? null : 'together')}
                className="text-[11px] font-sans text-rose-500 hover:text-rose-700 flex items-center gap-1 opacity-75 hover:opacity-100"
                title="Change Photo"
              >
                <Edit3 className="w-3 h-3" />
                <span>Switch</span>
              </button>
            </div>

            {/* Photo frame */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-rose-50 border border-rose-100 shadow-inner group-hover:shadow-rose-300/40 transition-shadow">
              <img
                src={pictures.together.src}
                alt={pictures.together.alt}
                id={pictures.together.id}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/her/IMG_20261026_174356.jpg.jpeg'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-handwriting">
                  {pictures.together.note}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="mt-5 text-center">
              <h3 className="font-cursive text-3xl text-rose-900 mb-2 leading-snug">
                {pictures.together.heading}
              </h3>
              <p className="font-handwriting text-xl text-slate-700 leading-snug bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                {pictures.together.caption}
              </p>
            </div>
          </div>

          {/* Quick switcher dropdown */}
          {activePicker === 'together' && (
            <div className="mt-4 pt-3 border-t border-rose-100 animate-in fade-in">
              <p className="text-[10px] font-sans font-semibold text-rose-400 mb-2 uppercase">
                Choose favourite together photo:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {photoOptions.together.map((opt) => (
                  <button
                    key={opt.src}
                    onClick={() => handleSelectPhoto('together', opt.src)}
                    className={`text-[10px] p-1.5 rounded-lg border text-left truncate transition-colors ${
                      pictures.together.src === opt.src
                        ? 'bg-rose-600 text-white border-rose-600 font-semibold'
                        : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
