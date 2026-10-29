# 💖 Forever With My Betu — A Romantic Proposal Website

A bespoke, deeply emotional, interactive, and mobile-responsive proposal website built with all of Raaz's love for his favourite person in the world, **Rumannah** (lovingly called **“Betu”**).

Designed to look and feel like a dreamy digital scrapbook mixed with a real-life love story, an animated memory gallery with real photos and videos, interactive cards for things Betu loves, configurable polaroid moments, and the official proposal game where the "NO" button comically escapes every tap!

---

## 🌹 Live Website Features

1. **Surprise Opening Screen:**
   - Soft romantic blush-and-red gradient with floating hearts and sparkles.
   - Cute animated love envelope: *“Someone has a little surprise for you, Betu… 💌”*.
   - Interactive button: **“Open Your Surprise, Betu 💗”** which smoothly opens into the story.

2. **Section One — “A Little Letter From Your Raaz”:**
   - Hero photo in an animated polaroid frame with tape decorations and photo-switcher.
   - Handwritten love letter revealed line-by-line in casual, authentic Hinglish.
   - Exact personalised message with inside jokes, promises, and the signature: *“Forever yours, Raaz ❤️”*.
   - Smooth scroll button: **“Okay, Now Let's Relive Our Memories 🥹💕”**.

3. **Section Two — “Our Little World, Our Little Memories”:**
   - Animated memory gallery slideshow reading directly from `public/media-manifest.json`.
   - Supports photos (JPG, PNG, WEBP) and videos (MP4, WEBM) with browser-compatible H.264 formats.
   - Story captions with dates, tags, and sweet notes for each memory.
   - Full slideshow controls: Play/Pause auto-advance, Previous, Next, thumbnail carousel, and full-screen lightbox.
   - Filter chips: All Memories, Photos Only, Videos, Betu Special, Roses & Dates, and Artwork.

4. **Section Three — “Things My Betu Loves”:**
   - Six interactive scrapbook cards with 3D tilt, doodles, and hover reveals:
     1. **ME, obviouslyyyy 😌❤️** — Her favourite person, her Raaz.
     2. **Biryani khana 🍗🍚** — Because good food tastes better together.
     3. **Pulao khana 🍚✨** — Another one of her happy-food moments.
     4. **Ice cream khana 🍦💕** — Sweet treats with my sweetest girl.
     5. **Mere saath ghumi-ghumi karna 🚗💑** — Random adventures and little dates.
     6. **Mauka dekhte hi meri fielding set kar dena 😭😂❤️** — Betu's special talent.
   - **Betu's Favourite Colour:** Deep romantic **RED ❤️🌹** with glowing crimson card and rose memories.
   - **Our Dream Destinations:** Illustrated travel promise cards for **UDAIPUR 🏰❤️** and **LADAKH 🏔️💗**.

5. **Section Four — “Three Pictures, Three Pieces of My Heart”:**
   - Three romantic polaroids with zoom-on-hover, soft shadows, and red glowing borders:
     - **Card One:** My Favourite Picture of Betu (`my-favourite-picture-of-betu`).
     - **Card Two:** Betu's Favourite Picture of Raaz (`betu-favourite-picture-of-raaz`).
     - **Card Three:** Our Favourite Picture Together (`our-favourite-picture-together`).
   - Integrated in-browser photo switchers for instant customization.

6. **Section Five — “The Official Betu Proposal Game”:**
   - Romantic proposal arena with large animated beating heart.
   - Exact heading: **“HEY BETU, <3 I LOBB YOUUU! WILLL YOU BE MY FOREVER? 💗🥹💍”**.
   - Subheading: *“Ab itna pyaar kar hi liya hai, toh ek chhota sa sawaal hai meri jaan… hehe. 👉🏻👈🏻❤️”*.
   - **The Playful NO Button:**
     - Uses proximity cursor detection, touch prevention, and spring physics.
     - Automatically jumps to a random safe position within the viewport whenever Betu's pointer gets close or taps it.
     - Never overlaps the YES button or leaves the screen.
     - Displays 10+ hilarious, loving Hinglish reactions (*"Arey aise kaise?! 😜"*, *"Fielding set kar rahi ho? 🏏"*, *"Ek hi option hai: YES! 😌💍"*).
   - **The YES Button:**
     - Glowing pulse effect.
     - Triggers a multi-stage confetti and heart cannon explosion!
     - Displays the celebration modal:
       *“AAAAAAAHHHHH! BETUUU SAID YESSSSS! 😭💖🎉”*
       *“OFFICIALLY THE HAPPIEST KUCHUPUCHUU IN THE WORLD! MUAaaAHHHH! 💋❤️”*.
     - Button: **“OPEN YOUR FINAL SURPRISE 💌”**.

7. **Final Screen — “I Will Always Love You, Betu Forever”:**
   - Climax screen with their favourite photo together in a glowing heart/polaroid frame.
   - Heading: **“I WILL ALWAYS LOVE YOU, BETU, FOREVER! MUAAAHHHHH! ❤️♾️💋”**.
   - Complete emotional supporting message.
   - Interactive beating heart banner: **“RAAZ ❤️ RUMANNAH — OUR LITTLE WORLD, OUR FOREVER.”** with clickable kiss bursts (💋).
   - Replay button: **“Relive Our Love Story Again? 💌”** that resets and restarts the experience smoothly.

8. **Music Player:**
   - Floating romantic music widget with Play / Pause, volume slider, and mute toggle.
   - Plays soothing background music (`/audio/romantic-bgm.mp3`).
   - Never autoplays unexpectedly, respecting user browser permissions.

---

## 📁 Project Structure

```text
her/
├── public/
│   ├── her/                      # All real photos and transcoded browser-safe videos
│   │   ├── IMG_20261026_174356.jpg.jpeg
│   │   ├── Snapchat-1527620046_h264.mp4
│   │   └── ...
│   ├── audio/
│   │   └── romantic-bgm.mp3      # Romantic background melody (replace with any song)
│   └── media-manifest.json       # Auto-generated catalog of photos, titles, and stories
├── src/
│   ├── components/
│   │   ├── OpeningScreen.jsx     # Surprise envelope & entry button
│   │   ├── LoveLetter.jsx        # Romantic letter from Raaz with line-by-line reveal
│   │   ├── MemoriesGallery.jsx   # Animated slideshow with filter chips & thumbnails
│   │   ├── BetuThings.jsx        # 6 illustrated cards, RED theme, Udaipur & Ladakh
│   │   ├── FavouritePictures.jsx # 3 separately configurable polaroid cards
│   │   ├── ProposalGame.jsx      # Interactive proposal game with evasive NO button
│   │   ├── FinalSurprise.jsx     # Climax love letter screen with kiss animations
│   │   ├── MusicPlayer.jsx       # Floating audio player with volume & visualizer
│   │   └── FloatingHearts.jsx    # Background floating hearts and sparkles
│   ├── App.jsx                   # Main layout & section orchestrator
│   ├── main.jsx                  # React application entry
│   └── styles.css                # Tailwind CSS, custom fonts & keyframe animations
├── prepare_media.py              # Script to catalog media & transcode HEVC videos to H.264
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. On the local network, you can also view it on your mobile phone by visiting the Network IP shown in the terminal (e.g., `http://192.168.x.x:5173`).

### 3. Build for Production
```bash
npm run build
```
This produces an optimized, self-contained production bundle in the `dist/` folder.

---

## 📸 Media Management: How to Add or Replace Photos & Videos

### Where to Put New Media
- All images and videos live in `public/her/`.
- Simply copy your photos (`.jpg`, `.jpeg`, `.png`, `.webp`) or videos (`.mp4`, `.webm`) into `public/her/`.

### Updating the Media Manifest
Whenever you add or rename photos, run the automatic catalog script:
```bash
python3 prepare_media.py
```
This script will:
1. Scan all files in the repository.
2. Automatically transcode any HEVC/H.265 videos into high-compatibility H.264 MP4 videos so they play smoothly on iPhone Safari and Android Chrome without black screens.
3. Update `public/media-manifest.json` with titles, tags, and romantic captions.

You can also directly edit `public/media-manifest.json` to customize titles, dates, or inside jokes for any photo!

---

## 🖼️ How to Configure the Three Favourite Pictures (Section Four)

In `src/components/FavouritePictures.jsx`, you will find the `pictures` state object:

```javascript
betu: {
  id: 'my-favourite-picture-of-betu',
  heading: 'My Favourite Girl in My Favourite Picture 🌹',
  caption: 'How can someone look this beautiful without even trying? Meri jaan, meri favourite face forever. 🥹❤️',
  src: '/her/Screenshot_20261023_103136.jpg.jpeg', // <-- Replace with your image path
},
raaz: {
  id: 'betu-favourite-picture-of-raaz',
  heading: 'The Boy Who Is Completely Gone for You 😭💘',
  caption: 'Apparently, this is your favourite picture of me. Matlab madam ji ko apna kuchupuchuuu pasand hai! Hehe. 😌💋',
  src: '/her/IMG-20261024-WA0019.jpg.jpeg', // <-- Replace with your image path
},
together: {
  id: 'our-favourite-picture-together',
  heading: 'My Favourite Us, Always ♾️❤️',
  caption: 'Out of all the pictures in the world, this one will always feel like home because it\'s us. 🫂💗',
  src: '/her/IMG_20261026_174356.jpg.jpeg', // <-- Replace with your image path
}
```
*Tip:* You can also click the **"Switch"** button on each card directly in the website to instantly select from your photos!

---

## 🎵 How to Change Background Music

1. Obtain your desired romantic song (such as *"Meri Banogi Kya"* by Rito Riba) as an `.mp3` file.
2. Rename your audio file to `romantic-bgm.mp3`.
3. Place it inside the `public/audio/` directory, replacing the existing file:
   ```text
   public/audio/romantic-bgm.mp3
   ```
4. The floating music player in the bottom-right corner will automatically play your custom song with volume controls and mute options.

---

## 🌐 Deployment Instructions (Host Online for Betu)

To share this surprise with Betu on her phone, you can deploy it in less than 2 minutes using either **Vercel** or **Netlify**:

### Option 1: Deploy with Vercel (Recommended & Easiest)
1. Push this project to your GitHub account (or install the Vercel CLI).
   ```bash
   git init
   git add .
   git commit -m "Forever with my Betu"
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Keep the default settings (Framework: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
5. Click **Deploy**.
6. You will get a live link (e.g., `https://forever-with-my-betu.vercel.app`) to send to Betu!

### Option 2: Deploy with Netlify Drag-and-Drop (No Git Required)
1. Run `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder onto the page.
4. Netlify will deploy your website instantly and give you a live URL.

### Option 3: Deploy with GitHub Pages
1. In `vite.config.js`, set `base: '/<repo-name>/'`.
2. Run `npm run build`.
3. Deploy the `dist` directory to the `gh-pages` branch using `npx gh-pages -d dist`.

---

## ❤️ Made by Raaz for Rumannah

*“Every picture has a story, every moment has a little piece of my heart… and somehow, all my favourite memories have you in them.”*
# Ryraaz
