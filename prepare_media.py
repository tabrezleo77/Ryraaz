import os
import shutil
import subprocess
import json

base_dir = os.path.dirname(os.path.abspath(__file__))
assets_dir = os.path.join(base_dir, 'assets')
dest_dir = os.path.join(base_dir, 'public', 'her')
os.makedirs(dest_dir, exist_ok=True)
audio_dir = os.path.join(base_dir, 'public', 'audio')
os.makedirs(audio_dir, exist_ok=True)

# Source directory for raw assets (checks assets/ subfolder first, falls back to base_dir)
src_dir = assets_dir if os.path.exists(assets_dir) else base_dir

# List of files in workspace / assets (supports flat or nested in assets)
file_map = {}
for root, _, filenames in os.walk(src_dir):
    for f in filenames:
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm')):
            if f not in file_map:
                file_map[f] = os.path.join(root, f)

files = sorted(file_map.keys())

manifest = []

# Map of curated captions & stories for our memories
curated_info = {
    "IMG_20261026_174356.jpg.jpeg": {
        "title": "Red Roses For My Red Rose 🌹",
        "caption": "Your favourite red roses, that beautiful smile, and me holding the love of my life.",
        "date": "October 2026",
        "tag": "Our Date",
        "featured": True
    },
    "IMG_20261026_171405.jpg.jpeg": {
        "title": "Our Beautiful Mall Date 🛍️❤️",
        "caption": "Just the two of us, smiling bright and glowing with happiness. Apka favourite boy with his favourite girl!",
        "date": "October 2026",
        "tag": "Our Date",
        "featured": True
    },
    "IMG_20261026_171418.jpg.jpeg": {
        "title": "Sweetest Couple Selfie 📸🥰",
        "caption": "Look at those bright smiles! Tumhare saath har ek pal bohot pyaara hai, Betu.",
        "date": "October 2026",
        "tag": "Together"
    },
    "IMG_20261026_174408.jpg.jpeg": {
        "title": "My Favourite View In The Entire Universe 🥺💗",
        "caption": "No matter where we are, looking at you makes everything else fade away.",
        "date": "October 2026",
        "tag": "Together"
    },
    "IMG_20261026_165815.jpg.jpeg": {
        "title": "Mall Dates & Endless Giggles 🛍️✨",
        "caption": "Ghumi-ghumi with my favourite human. That pretty face lights up my whole world.",
        "date": "October 2026",
        "tag": "Ghumi Ghumi"
    },
    "IMG_20261026_171035.jpg.jpeg": {
        "title": "Her Holding Roses 🌹❤️",
        "caption": "The most elegant girl holding her favourite flowers. Red looks best on Betu, always.",
        "date": "October 2026",
        "tag": "Roses"
    },
    "IMG_20261026_174510.jpg.jpeg": {
        "title": "Haath Mein Haath, Hamesha Ke Liye 🫂💞",
        "caption": "Holding your hand, feeling your touch, and wishing time would just freeze right here.",
        "date": "October 2026",
        "tag": "Holding Hands",
        "featured": True
    },
    "IMG_20261026_174511.jpg.jpeg": {
        "title": "Sweet Moments Together 💐✨",
        "caption": "Just us, our flowers, and a heart full of love.",
        "date": "October 2026",
        "tag": "Date"
    },
    "IMG_20261026_174517.jpg.jpeg": {
        "title": "Forever Us, In Every Click 📸❤️",
        "caption": "Every picture of us is my new favourite wallpaper and my happiest thought.",
        "date": "October 2026",
        "tag": "Together"
    },
    "IMG-20261026-WA0045.jpg.jpeg": {
        "title": "A Bouquet Just For You 💐🌹",
        "caption": "Because my Betu deserves all the flowers in the world, especially the red ones.",
        "date": "October 2026",
        "tag": "Roses"
    },
    "IMG-20261026-WA0050.jpg.jpeg": {
        "title": "Our Little Forever Grip 🤝❤️",
        "caption": "Never letting this hand go. Promise to hold you like this through every high and low.",
        "date": "October 2026",
        "tag": "Promise"
    },
    "Snapchat-593939336.jpg.jpeg": {
        "title": "Cute Lean-On Cuddles 🥰💕",
        "caption": "When you lean on my shoulder, that's when I feel the most peaceful.",
        "date": "Snapchat Moments",
        "tag": "Cute Us"
    },
    "Snapchat-1229657166.jpg.jpeg": {
        "title": "Mirror Selfie Queen 👸🏻💖",
        "caption": "How does she manage to look so effortlessly gorgeous? Meri pyaari Betu!",
        "date": "Mirror Selfie",
        "tag": "Betu Special"
    },
    "IMG-20261021-WA0054.jpg.jpeg": {
        "title": "Our Illustrated Love Story 🎨❤️",
        "caption": "Walking side by side, just like how I want to walk through all of life with you.",
        "date": "Artistic Love",
        "tag": "Artwork"
    },
    "IMG_20261022_191016.jpg.jpeg": {
        "title": "Anime Style Us 🌸💫",
        "caption": "Looking at you like you're my whole world... because well, you actually are! Hehe.",
        "date": "Artistic Love",
        "tag": "Artwork"
    },
    "IMG_20261027_001455_286.webp": {
        "title": "Meri Banogi Kya? 🎵🎶",
        "caption": "Ab toh aadat lagi hai teri, mere sab se khoobsurat ho tum... Reh jaa ban ke meri!",
        "date": "Our Song",
        "tag": "Soundtrack"
    },
    "IMG-20261024-WA0019.jpg.jpeg": {
        "title": "Apka Kuchupuchuuu Raaz 😌🫶🏻",
        "caption": "The boy who is completely, madly, undeniably head-over-heels for Rumannah.",
        "date": "October 2026",
        "tag": "Your Raaz"
    },
    "Screenshot_20261023_103136.jpg.jpeg": {
        "title": "Rumannah's Radiant Smile 💚✨",
        "caption": "That glowing, angelic face that took my heart and never gave it back.",
        "date": "Precious Betu",
        "tag": "Betu Special"
    },
    "Screenshot_20261025_205010.jpg.jpeg": {
        "title": "Late Night Video Calls & Sleepy Betu 😴🌙",
        "caption": "Watching you fall asleep on call is the purest, cutest thing ever. Meri jaan.",
        "date": "Midnight Moments",
        "tag": "Sweet Dreams"
    },
    "IMG-20261022-WA0001.jpg.jpeg": {
        "title": "Betu In Traditional Pink 🌸🥻",
        "caption": "Absolute royalty. Every time I see you in a saree, my heart skips ten beats.",
        "date": "Desi Royalty",
        "tag": "Betu Special"
    },
    "IMG-20261022-WA0003.jpg.jpeg": {
        "title": "The Sweetest Saree Look 💖",
        "caption": "Elegance, grace, and cuteness all wrapped up in my favourite human.",
        "date": "Desi Royalty",
        "tag": "Betu Special"
    },
    "IMG-20261022-WA0005.jpg.jpeg": {
        "title": "A Smile That Cures Everything 🥹✨",
        "caption": "If I could give you one gift, it would be the ability to see yourself through my eyes.",
        "date": "Desi Royalty",
        "tag": "Betu Special"
    },
    "ezgif-frame-009.jpg.jpeg": {
        "title": "Frames Of Love 🎞️❤️",
        "caption": "Every second spent with you is a frame etched into my heart.",
        "date": "Video Frame",
        "tag": "Moments"
    },
    "ezgif-frame-227.jpg.jpeg": {
        "title": "Pure Happiness With You 💫",
        "caption": "No filters needed when you are next to the person who makes your soul happy.",
        "date": "Video Frame",
        "tag": "Moments"
    },
    "Snapchat-1527620046.mp4": {
        "title": "Our Live Video Memories 📹💖",
        "caption": "Press play to relive our laughs, our cute little glances, and all the love.",
        "date": "October 2026",
        "tag": "Video Clip"
    },
    "Snapchat-193972585.mp4": {
        "title": "Giggles & Fun Times 🎬🥰",
        "caption": "Caught in 4K: apka kuchupuchuuu being completely goofy with Betu!",
        "date": "October 2026",
        "tag": "Video Clip"
    },
    "Snapchat-1061223595.mp4": {
        "title": "Quick Cute Glimpse ✨",
        "caption": "Short, sweet, and unforgettable.",
        "date": "October 2026",
        "tag": "Video Clip"
    },
    "Snapchat-2082553947.mp4": {
        "title": "A Flirty Little Moment 😉💕",
        "caption": "One little second of you is enough to make my entire day brighter.",
        "date": "October 2026",
        "tag": "Video Clip"
    }
}

processed_items = []
seen_names = set()

for f in files:
    # Skip non-media
    if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm')):
        continue
    # Skip duplicates like (1)
    if ' (1)' in f:
        continue
    # Explicitly exclude WA0004 (contains another person)
    if f == 'IMG-20261022-WA0004.jpg.jpeg':
        continue
    
    src_path = file_map.get(f, os.path.join(src_dir, f))
    dest_path = os.path.join(dest_dir, f)
    
    is_video = f.lower().endswith(('.mp4', '.webm'))
    
    # Copy file to public/her
    if not os.path.exists(dest_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied: {f}")
        
    # If it's a video, check if it's HEVC and transcode an H.264 version if needed
    h264_name = None
    if is_video:
        base_no_ext = os.path.splitext(f)[0]
        h264_file = f"{base_no_ext}_h264.mp4"
        h264_dest = os.path.join(dest_dir, h264_file)
        if not os.path.exists(h264_dest):
            print(f"Transcoding {f} to H.264 {h264_file}...")
            cmd = [
                'ffmpeg', '-y', '-i', src_path,
                '-c:v', 'libx264', '-crf', '24', '-preset', 'fast',
                '-c:a', 'aac', '-b:a', '128k',
                '-movflags', '+faststart',
                h264_dest
            ]
            try:
                subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                h264_name = h264_file
                print(f"Successfully created: {h264_name}")
            except Exception as e:
                print(f"Transcoding failed for {f}: {e}")
        else:
            h264_name = h264_file

    info = curated_info.get(f, {
        "title": "A Beautiful Memory With You 💗",
        "caption": "Every moment with you is precious, my Betu.",
        "date": "Forever",
        "tag": "Our Love"
    })
    
    media_entry = {
        "id": f.replace('.', '_').replace('-', '_'),
        "filename": f,
        "src": f"/her/{f}",
        "type": "video" if is_video else "photo",
        "title": info.get("title", "Memories With Betu"),
        "caption": info.get("caption", "Sweet moments together."),
        "date": info.get("date", "2026"),
        "tag": info.get("tag", "Love"),
        "featured": info.get("featured", False)
    }
    if h264_name:
        media_entry["h264Src"] = f"/her/{h264_name}"
        
    processed_items.append(media_entry)

# Sort so that featured / best together moments come nicely in the slideshow
def sort_key(item):
    if item["filename"] == "IMG_20261026_174356.jpg.jpeg":
        return 0
    if item["filename"] == "IMG_20261026_171405.jpg.jpeg":
        return 1
    if item["filename"] == "IMG_20261026_174510.jpg.jpeg":
        return 2
    if item["filename"] == "IMG_20261026_165815.jpg.jpeg":
        return 3
    if item["filename"] == "IMG_20261027_001455_286.webp":
        return 4
    if item["filename"] == "Snapchat-593939336.jpg.jpeg":
        return 5
    if item["filename"] == "IMG_20261026_174408.jpg.jpeg":
        return 6
    if item["filename"] == "IMG_20261026_171418.jpg.jpeg":
        return 7
    if item["filename"] == "IMG-20261021-WA0054.jpg.jpeg":
        return 8
    if item["filename"] == "IMG_20261022_191016.jpg.jpeg":
        return 9
    if item["type"] == "video":
        return 15
    return 25

processed_items.sort(key=sort_key)

manifest_path = os.path.join(base_dir, 'public', 'media-manifest.json')
with open(manifest_path, 'w', encoding='utf-8') as out:
    json.dump(processed_items, out, indent=2, ensure_ascii=False)

print(f"Generated media-manifest.json with {len(processed_items)} items at {manifest_path}")
