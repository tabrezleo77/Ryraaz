import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Utensils, Compass, Flame, Smile, Star, MapPin } from 'lucide-react'

export default function BetuThings() {
  const [activeCard, setActiveCard] = useState(null)

  const thingsList = [
    {
      id: 1,
      title: "ME, obviouslyyyy 😌❤️",
      subtitle: "Her favourite person, her Raaz",
      emoji: "🤴🏻💖",
      tag: "#NumberOneAlways",
      bgGradient: "from-rose-500/10 via-red-500/10 to-pink-500/10",
      borderColor: "border-rose-200",
      doodle: "✨",
      detail: "Kyunki Betu ke dil ka permanent tenant main hi toh hoon! Hehe, aur kahin jaane ka irada bhi nahi hai."
    },
    {
      id: 2,
      title: "Biryani khana 🍗🍚",
      subtitle: "Because good food tastes better together",
      emoji: "🍗🤤",
      tag: "#FoodieBetu",
      bgGradient: "from-amber-500/10 via-orange-500/10 to-rose-500/10",
      borderColor: "border-amber-200",
      doodle: "🥘",
      detail: "Extra leg piece hamesha meri Betu ke liye! Tumhare face ki khushi biryani dekh ke is next level."
    },
    {
      id: 3,
      title: "Pulao khana 🍚✨",
      subtitle: "Another one of her happy-food moments",
      emoji: "🍚🥢",
      tag: "#ComfortFood",
      bgGradient: "from-yellow-500/10 via-orange-500/10 to-pink-500/10",
      borderColor: "border-yellow-200",
      doodle: "✨",
      detail: "Garma-garam pulao with extra pyaar. Har ek bite mein bas tumhari smile chahiye."
    },
    {
      id: 4,
      title: "Ice cream khana 🍦💕",
      subtitle: "Sweet treats with my sweetest girl",
      emoji: "🍦🍧",
      tag: "#SweetTooth",
      bgGradient: "from-pink-500/10 via-rose-500/10 to-purple-500/10",
      borderColor: "border-pink-200",
      doodle: "🍨",
      detail: "Late night ice cream dates, sharing scoops, and fighting for the last spoon."
    },
    {
      id: 5,
      title: "Mere saath ghumi-ghumi karna 🚗💑",
      subtitle: "Random adventures and little dates",
      emoji: "🚗✨",
      tag: "#OurAdventures",
      bgGradient: "from-rose-500/10 via-pink-500/10 to-red-500/10",
      borderColor: "border-rose-200",
      doodle: "🛵",
      detail: "Bina kisi plan ke chal padna, haath pakad ke chalna, mall ghumna, aur bas tumhare saath waqt bitana."
    },
    {
      id: 6,
      title: "Mauka dekhte hi meri fielding set kar dena 😭😂❤️",
      subtitle: "Betu's special talent: lovingly teasing her poor kuchupuchuuu",
      emoji: "🏏😈",
      tag: "#MadamJiKaRaaj",
      bgGradient: "from-red-500/10 via-rose-500/10 to-pink-500/10",
      borderColor: "border-red-200",
      doodle: "🎯",
      detail: "Jaise hi maine thodi nautanki ki, wahi madam ji ne full fielding set kar di! But honestly, I love this the most."
    }
  ]

  return (
    <section id="betu-things" className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-handwriting font-bold border border-rose-200 mb-3"
        >
          <Sparkles className="w-4 h-4 text-rose-500" />
          The Official Scrapbook Of Betu's Favs
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
        </motion.div>

        <h2 className="font-cursive text-4xl sm:text-6xl text-rose-900 mb-4 drop-shadow-sm">
          Things My Betu Loves the Most 💗
        </h2>
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-600">
          The little things that bring the biggest, brightest smiles to my favourite girl's face.
        </p>
      </div>

      {/* 6 Illustrated Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {thingsList.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
            onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
            className={`cursor-pointer rounded-3xl p-6 bg-gradient-to-br ${item.bgGradient} bg-white/90 backdrop-blur-md border-2 ${item.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
          >
            {/* Top Tape decoration */}
            <div className="washi-tape opacity-75"></div>

            {/* Doodle Sticker top-right */}
            <span className="absolute top-3 right-4 text-2xl select-none group-hover:scale-125 transition-transform">
              {item.doodle}
            </span>

            {/* Tag badge */}
            <span className="inline-block text-[11px] font-sans font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 mb-3">
              {item.tag}
            </span>

            {/* Emoji display */}
            <div className="text-4xl mb-3">
              {item.emoji}
            </div>

            {/* Title */}
            <h3 className="font-handwriting text-2xl sm:text-3xl text-rose-900 font-bold mb-2 leading-snug">
              {item.title}
            </h3>

            {/* Subtitle */}
            <p className="font-sans text-slate-700 text-sm font-medium mb-4">
              {item.subtitle}
            </p>

            {/* Expandable / detail text */}
            <div className="pt-3 border-t border-rose-100/80 text-xs font-sans text-rose-800/90 leading-relaxed bg-white/50 p-2.5 rounded-xl">
              {item.detail}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Special Feature 1: Her Favourite Colour RED */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-red-600 via-rose-700 to-red-800 text-white shadow-2xl shadow-red-900/30 overflow-hidden border-2 border-red-400"
        >
          {/* Glowing rose elements */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-red-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-rose-100 text-xs font-semibold backdrop-blur-md mb-4 border border-white/20">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                Her Signature Colour
              </span>
              <h3 className="font-cursive text-5xl sm:text-7xl mb-3 text-white drop-shadow">
                RED ❤️🌹
              </h3>
              <p className="font-handwriting text-2xl sm:text-3xl text-rose-100 leading-relaxed mb-4">
                Red is Betu's favourite colour, and every time she wears it, she takes my breath away.
              </p>
              <p className="font-sans text-sm sm:text-base text-rose-100/90 max-w-xl">
                Just like the bouquet of deep crimson roses we held together, this entire website is painted in your favourite shade of red.
              </p>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-xl"
              >
                <img
                  src="/her/IMG_20261026_171035.jpg.jpeg"
                  alt="Betu with red roses"
                  className="w-48 h-64 object-cover rounded-xl shadow-md"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/her/IMG_20261026_174356.jpg.jpeg"
                  }}
                />
                <span className="block text-center font-handwriting text-white text-lg mt-2">
                  Betu & Her Red Roses 🌹
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Special Feature 2: Our Dream Destinations */}
      <div>
        <div className="text-center mb-10">
          <span className="font-handwriting text-2xl text-rose-600">
            Promises For Our Future ✈️💍
          </span>
          <h3 className="font-cursive text-4xl sm:text-5xl text-rose-900 mt-1">
            Our Dream Destinations Together
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* UDAIPUR CARD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-rose-200 relative overflow-hidden group"
          >
            <div className="washi-tape"></div>

            <div className="flex items-center gap-3 mb-4">
              <span className="p-3 rounded-2xl bg-rose-100 text-rose-700">
                <MapPin className="w-6 h-6" />
              </span>
              <div>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans">
                  Dream Destination 01
                </span>
                <h4 className="font-cursive text-4xl text-rose-900">
                  UDAIPUR 🏰❤️
                </h4>
              </div>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-rose-50 mb-5 relative shadow-inner">
              <img
                src="/images/udaipur.png"
                alt="Udaipur Palace Lake"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-white font-handwriting text-xl">
                  City of Lakes & Royal Romance ✨
                </span>
              </div>
            </div>

            <blockquote className="font-handwriting text-2xl text-rose-800 leading-snug border-l-4 border-rose-500 pl-4 py-1 italic bg-rose-50/50 rounded-r-xl">
              “One day, you and me, exploring beautiful streets, sunsets, lakes, and making a hundred new memories.”
            </blockquote>
          </motion.div>

          {/* LADAKH CARD */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-rose-200 relative overflow-hidden group"
          >
            <div className="washi-tape"></div>

            <div className="flex items-center gap-3 mb-4">
              <span className="p-3 rounded-2xl bg-rose-100 text-rose-700">
                <Compass className="w-6 h-6" />
              </span>
              <div>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans">
                  Dream Destination 02
                </span>
                <h4 className="font-cursive text-4xl text-rose-900">
                  LADAKH 🏔️💗
                </h4>
              </div>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-rose-50 mb-5 relative shadow-inner">
              <img
                src="/images/ladakh.png"
                alt="Ladakh Mountains"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-white font-handwriting text-xl">
                  High Altitude, Hand in Hand ❄️
                </span>
              </div>
            </div>

            <blockquote className="font-handwriting text-2xl text-rose-800 leading-snug border-l-4 border-rose-500 pl-4 py-1 italic bg-rose-50/50 rounded-r-xl">
              “Mountains, endless roads, cute pictures, cold weather, and your hand in mine.”
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
