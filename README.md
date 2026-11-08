# Premium Interactive Diwali Surprise Website 🪔✨

An interactive digital Diwali surprise website crafted with glowing diyas, festive light decorations, realistic gift hamper, immersive night-sky fireworks, personalized memories gallery, and a handwritten letter.

---

## 🚀 Setup & Local Development Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the URL printed in terminal).

### 3. Build for Production
```bash
npm run build
```

---

## 🎨 Central Personalization Guide

All personal names, messages, captions, passwords, and photos are configured in **a single central file**:

📁 `src/data/siteConfig.js`

You never need to edit multiple React components to personalize the website!

### 1. How to Change Names & Nicknames
Open `src/data/siteConfig.js` and edit:
```javascript
friendName: "Aadhya",       // Recipient's name
nickname: "Sparkler",       // Playful nickname
yourName: "Aryan",          // Your name (used for signature)
```

### 2. How to Change or Disable the Secret Password
In `src/data/siteConfig.js`:
```javascript
passwordEnabled: true,      // Set to false to skip the password screen entirely!
password: "diwali2026",     // Secret unlock key (case-insensitive)
```

### 3. How to Replace Photos (Exactly 2 Photos)
1. Put your 2 favorite photos inside the folder:
   `public/assets/photos/`
   Named as `1.jpg` and `2.jpg` (or `.png`).
2. Update captions in `src/data/siteConfig.js`:
```javascript
photos: [
  {
    id: 1,
    src: "/assets/photos/1.jpg",
    caption: "[PHOTO_1_CAPTION]"
  },
  {
    id: 2,
    src: "/assets/photos/2.jpg",
    caption: "[PHOTO_2_CAPTION]"
  }
]
```

### 4. How to Personalize the Interactive Envelope & Letter
1. Update envelope prompt text in `src/data/siteConfig.js`:
```javascript
envelopeInstruction: "There's a little something waiting for you... Tap the envelope to unseal it ✨",
```
2. When tapped, the realistic wax seal fractures, the flap unfolds in 3D, and celebratory golden fireworks flash across the screen while the letter unfolds!

### 5. How to Add Your Background Music
1. Place your MP3 audio file into:
   `public/assets/audio/diwali-music.mp3`
2. If your file has a different name, update the path in `src/data/siteConfig.js`:
```javascript
music: "/assets/audio/diwali-music.mp3",
```
*Note: The website also includes an integrated Web Audio synthesizer fallback that plays a gentle Indian Raag ambient sound if the MP3 is ever missing or blocked by browser policies!*

### 6. How to Personalize the Handwritten Letter
In `src/data/siteConfig.js`, locate `letterParagraphs`:
```javascript
letterParagraphs: [
  "Diwali has always been about light, warmth, and celebrating the people who make life feel a little brighter...",
  "Whether it's our random conversations that drift into hours or your unmistakable laugh...",
  "As you celebrate tonight, I hope this year brings you everything you've wished for. Keep shining bright."
]
```

---

## 🌐 How to Deploy on Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Diwali surprise experience"
   git remote add origin https://github.com/your-username/diwali-surprise.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**! In seconds, you will have a live, shareable URL for her!

---

## 📋 Personalization Checklist Before Sharing

- [ ] Updated `friendName` in `src/data/siteConfig.js`
- [ ] Updated `yourName` in `src/data/siteConfig.js`
- [ ] Set your desired `password` (or set `passwordEnabled: false`)
- [ ] Replaced photos in `public/assets/photos/` with your own memories
- [ ] Customized photo captions in `src/data/siteConfig.js`
- [ ] Customized letter paragraphs in `src/data/siteConfig.js`
- [ ] Added your favorite festive song in `public/assets/audio/diwali-music.mp3`
- [ ] Tested the experience on mobile and desktop!
