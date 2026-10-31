import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Feather, ArrowDown, Camera, Utensils, Compass } from 'lucide-react'

export default function LoveLetter({ onScrollToMemories }) {
  const [photoIndex, setPhotoIndex] = useState(0)

  // Options for hero photos in Card 1
  const heroPhotos = [
    {
      src: "/her/IMG_20261026_174356.jpg.jpeg",
      caption: "Our rose-filled date together 🌹"
    },
    {
      src: "/her/IMG_20261026_171405.jpg.jpeg",
      caption: "Our beautiful mall date & brightest smiles 🛍️❤️"
    },
    {
      src: "/her/IMG_20261026_165815.jpg.jpeg",
      caption: "Mall ghumi-ghumi with my favourite smile ✨"
    },
    {
      src: "/her/IMG-20261021-WA0054.jpg.jpeg",
      caption: "Us walking together, hand in hand 🎨"
    }
  ]

  const paragraphs = [
    {
      type: "salutation",
      text: "My Betuuuu ❤️🥹,"
    },
    {
      type: "body",
      text: "It's your boy Raaz, apka pyaara sa kuchupuchuuuu! Hehe, tumhara apna pagal sa ladka, jo tumhe duniya mein sabse zyada pyaar karta hai. 💗🫶🏻"
    },
    {
      type: "body",
      text: "Betu, pata hai? Kabhi-kabhi mujhe khud samajh nahi aata ki tum mere liye itni special kaise ban gayi, but phir tumhari smile yaad aati hai, tumhari baatein yaad aati hain, aur realise hota hai ki meri duniya tumse hi toh itni pyaari hai. Tum meri favourite person ho, meri khushi ho, meri sukoon wali jagah ho, aur meri woh cute si problem bhi ho jisse main kabhi solve hi nahi karna chahta. 😭❤️"
    },
    {
      type: "body",
      text: "Mujhe tumhare saath chhoti-chhoti cheezein karni hain — tumhare saath biryani aur pulao khana, ice cream share karna, bina kisi reason ke ghumi-ghumi jaana, random baaton pe hasna, ek dusre ko tang karna, aur phir ek dusre ko manaana. Mujhe tumhare saath woh saare normal moments bhi special banane hain jinhe shayad duniya notice bhi nahi karegi, but mere liye woh sabse precious honge. 🥹💞"
    },
    {
      type: "body",
      text: "Meri Betu, chahe hum paas ho ya door, chahe din kitna bhi kharaab kyun na ho, main bas itna chahta hoon ki hum ek dusre ka haath pakad ke sab kuch face karein. Main perfect nahi hoon, kabhi childish ho jaata hoon, kabhi zyada tang karta hoon, aur kabhi tumhe extra miss bhi karta hoon. But ek baat dil se bol raha hoon — tum mere liye bohot, bohot zyada special ho, aur main humare bond ko hamesha pyaar, care, trust aur efforts se beautiful banana chahta hoon. 🫂❤️"
    },
    {
      type: "body",
      text: "I wanna make so many memories with you, Betu. Udaipur ki beautiful streets explore karni hain, Ladakh ke mountains ke saamne tumhare saath pictures leni hain, sunsets dekhne hain, aur tumhe har baar yaad dilana hai ki meri favourite view tum hi ho. 🌅🏔️💋"
    },
    {
      type: "body",
      text: "Aur haan madam ji, mauka dekhte hi meri fielding set karna band mat karna, kyunki tumhari inhi harkaton pe toh mera dil aur bhi zyada aa jaata hai. 😭😂❤️ Tum meri favourite nautanki ho, meri cutie patootie ho, meri Betuuu ho!"
    },
    {
      type: "body",
      text: "I don't just want the cute moments with you. I want the real ones too — the difficult days, the silly arguments, the little misunderstandings, the growing together, the endless conversations, and all the beautiful ordinary days in between. I want us to keep choosing each other, keep learning each other, and keep making each other smile."
    },
    {
      type: "body",
      text: "My Betuuuu, please stay with me forever. I love you a lottttt, more than these silly words can explain. I miss youh soooo muchhh, and if I could, toh abhi tumhare paas aake tumhe ek tight wala hug deta, tumhare forehead pe kiss karta, aur bas tumhe apne paas rakh ke bolta — meri jaan, you're my favourite person, always. 🥹🫂💋"
    },
    {
      type: "closing",
      text: "I love youuuuu, Rumannaaahhh! Forever my Betu, forever my favourite girl, forever my kuchupuchuuu wali duniya.\n\nMuaaaahhhhh! 💋💋❤️❤️"
    },
    {
      type: "signature",
      text: "— Your boy, your Raaz, apka pyaara kuchupuchuuuu ♾️💗"
    }
  ]

  return (
    <section id="love-letter" className="relative py-16 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-handwriting font-bold border border-rose-200 mb-3"
        >
          <Feather className="w-4 h-4 text-rose-500" />
          A Little Letter From Your Raaz
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
        </motion.div>
        <h2 className="font-cursive text-4xl sm:text-6xl text-rose-900 drop-shadow-sm font-bold">
          Straight From My Heart To Yours
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Romantic Scrapbook Gallery Running Alongside the Letter */}
        <div className="lg:col-span-5 flex flex-col items-center gap-10">
          
          {/* Card 1: Main Hero Polaroid with Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xl border-4 border-rose-100 rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 relative group">
              <div className="washi-tape"></div>

              {/* Sparkle badge */}
              <div className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full shadow-lg border-2 border-white animate-pulse-slow">
                <Heart className="w-5 h-5 fill-white" />
              </div>

              {/* Photo */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-rose-50 border border-rose-100 shadow-inner">
                <img
                  src={heroPhotos[photoIndex].src}
                  alt="Raaz and Betu together"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/her/IMG_20261026_165815.jpg.jpeg"
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-handwriting">
                    {heroPhotos[photoIndex].caption}
                  </span>
                </div>
              </div>

              {/* Polaroid Footer */}
              <div className="mt-4 text-center">
                <p className="font-handwriting text-2xl text-rose-800 font-semibold">
                  Raaz ❤️ Rumannah
                </p>
                <p className="text-xs text-rose-500 font-sans flex items-center justify-center gap-1 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                  Our Favourite Place Is Next To Each Other
                  <Sparkles className="w-3 h-3" />
                </p>

                {/* Photo Switcher dots */}
                <div className="flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-rose-50">
                  {heroPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPhotoIndex(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        photoIndex === i ? 'w-6 bg-rose-600' : 'w-2 bg-rose-200'
                      }`}
                      title={`View photo ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Pinned Post-It Note */}
            <motion.div
              animate={{ rotate: [2, 3.5, 2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="mt-4 bg-amber-50 border border-amber-200 p-3.5 rounded-xl shadow-md rotate-2 text-amber-900 font-handwriting text-base sm:text-lg max-w-xs mx-auto"
            >
              <p className="flex items-start gap-1.5">
                <span>📌</span>
                <span>"Betu, look how cute we look together! Nazar na lage humein! 🧿🥹"</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Card 2: Food & Ghumi-Ghumi Polaroid (Mall Dates & Giggles) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xl border-4 border-rose-100 rotate-[2deg] hover:rotate-0 transition-transform duration-500 relative group">
              <div className="washi-tape"></div>

              {/* Cute Food & Date Badge */}
              <div className="absolute -top-3 -left-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white flex items-center gap-1">
                <span>🛍️</span>
                <span>Biryani & Ghumi-Ghumi</span>
              </div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-rose-50 border border-rose-100 shadow-inner">
                <img
                  src="/her/IMG_20261026_165815.jpg.jpeg"
                  alt="Mall date with Betu"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/her/IMG_20261026_171405.jpg.jpeg"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-handwriting">
                    Mall ghumi-ghumi with my prettiest girl 🛍️✨
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="font-handwriting text-2xl text-rose-800 font-semibold">
                  Chhoti-Chhoti Khushiyan 🍗🍦
                </p>
                <p className="text-xs text-rose-600 font-sans mt-0.5">
                  Biryani, pulao, ice cream... and endless smiles with you.
                </p>
              </div>
            </div>

            {/* Sticky note */}
            <div className="mt-4 bg-rose-50 border border-rose-200 p-3.5 rounded-xl shadow-md rotate-[-1.5deg] text-rose-900 font-handwriting text-base sm:text-lg max-w-xs mx-auto">
              <p className="flex items-start gap-1.5">
                <span>🍨</span>
                <span>"Tumhare saath roadside ice cream bhi royal feast lagti hai meri jaan! 😋❤️"</span>
              </p>
            </div>
          </motion.div>

          {/* Card 3: Holding Hands Polaroid (Facing Life Together) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xl border-4 border-rose-100 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 relative group">
              <div className="washi-tape"></div>

              {/* Heart Badge */}
              <div className="absolute -top-3 -right-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white flex items-center gap-1">
                <span>🤝</span>
                <span>Hamesha Ke Liye</span>
              </div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-rose-50 border border-rose-100 shadow-inner">
                <img
                  src="/her/IMG_20261026_174510.jpg.jpeg"
                  alt="Holding hands with red roses"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/her/IMG-20261026-WA0050.jpg.jpeg"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-handwriting">
                    Holding your hand, never letting go 🌹🤝
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="font-handwriting text-2xl text-rose-800 font-semibold">
                  Haath Mein Haath 🫂💞
                </p>
                <p className="text-xs text-rose-600 font-sans mt-0.5">
                  Through good days, bad days, and every day in between.
                </p>
              </div>
            </div>

            {/* Note */}
            <div className="mt-4 bg-amber-50/90 border border-amber-200 p-3.5 rounded-xl shadow-md rotate-[1.5deg] text-amber-900 font-handwriting text-base sm:text-lg max-w-xs mx-auto">
              <p className="flex items-start gap-1.5">
                <span>🫂</span>
                <span>"Chahe jo bhi situation ho, your hand is the only one I ever wanna hold."</span>
              </p>
            </div>
          </motion.div>

          {/* Card 4: Lean-On Cuddles & Fielding Set Polaroid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xl border-4 border-rose-100 rotate-[1.5deg] hover:rotate-0 transition-transform duration-500 relative group">
              <div className="washi-tape"></div>

              {/* Fielding set badge */}
              <div className="absolute -top-3 -left-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white flex items-center gap-1">
                <span>🏏</span>
                <span>Fielding Set Madam Ji!</span>
              </div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-rose-50 border border-rose-100 shadow-inner">
                <img
                  src="/her/Snapchat-593939336.jpg.jpeg"
                  alt="Cute cuddle lean on"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/her/IMG_20261026_174408.jpg.jpeg"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-handwriting">
                    My favourite lean-on cuddle moment 🥰💋
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="font-handwriting text-2xl text-rose-800 font-semibold">
                  Apka Kuchupuchu & Betu 🥺💗
                </p>
                <p className="text-xs text-rose-600 font-sans mt-0.5">
                  Tum meri favourite nautanki ho, meri jaan ho!
                </p>
              </div>
            </div>

            {/* Sweetest concluding note */}
            <div className="mt-4 bg-pink-50 border border-pink-200 p-3.5 rounded-xl shadow-md rotate-[-1deg] text-pink-900 font-handwriting text-base sm:text-lg max-w-xs mx-auto">
              <p className="flex items-start gap-1.5">
                <span>💋</span>
                <span>"Forever my Betu, forever my favourite girl, forever my kuchupuchuu wali duniya! Muaaaah! ❤️"</span>
              </p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Handwritten Love Letter with Line-by-Line Reveal */}
        <div className="lg:col-span-7">
          <div className="bg-white/95 rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-rose-100/90 relative overflow-hidden backdrop-blur-sm">
            {/* Corner rose doodles */}
            <div className="absolute top-3 right-4 text-rose-200 text-3xl select-none" aria-hidden="true">
              🌹
            </div>
            <div className="absolute bottom-4 right-4 text-rose-200 text-3xl select-none" aria-hidden="true">
              💌
            </div>

            <div className="space-y-6">
              {paragraphs.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                >
                  {p.type === "salutation" && (
                    <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-bold border-b border-rose-100 pb-2">
                      {p.text}
                    </h3>
                  )}

                  {p.type === "body" && (
                    <p className="font-sans text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line hover:text-slate-900 transition-colors">
                      {p.text}
                    </p>
                  )}

                  {p.type === "closing" && (
                    <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-100 font-sans text-rose-900 font-medium text-lg leading-relaxed">
                      {p.text}
                    </div>
                  )}

                  {p.type === "signature" && (
                    <div className="pt-4 text-right">
                      <p className="font-handwriting text-2xl sm:text-3xl text-rose-800 font-bold">
                        {p.text}
                      </p>
                      <p className="text-xs text-rose-400 font-sans mt-1">
                        Forever yours, Raaz ❤️
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Relive Memories Button */}
            <div className="mt-10 pt-6 border-t border-rose-100 text-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onScrollToMemories}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 text-white font-sans font-semibold text-lg shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all duration-300 cursor-pointer"
              >
                <span>Okay, Now Let's Relive Our Memories 🥹💕</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
