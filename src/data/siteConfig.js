/**
 * ====================================================================
 * CENTRAL CONFIGURATION FILE - DIWALI SURPRISE EXPERIENCE
 * ====================================================================
 * 
 * Edit this single file to personalize the entire website!
 * Every text, name, password, photo, and message is controlled here.
 */

export const siteConfig = {
  // Target recipient's name and nickname
  friendName: "Parakh",
  nickname: "Parakh Ji",
  yourName: "Manthan",

  // Password Protection Setting
  // If set to false, Section 1 (Password screen) will be automatically skipped
  passwordEnabled: true,
  password: "diwali2026", // Change this to your secret code/date

  // Background Music file path
  // Place your MP3 file in public/assets/audio/ and specify the path here
  music: "/assets/audio/diwali-music.mp3",

  // Text contents for all sections
  text: {
    // SECTION 1: Password / Welcome Experience
    websiteTitle: "A Little Diwali Surprise..✨",
    welcomeSubtitle: "A tiny festive corner, made to add a little sparkle to your Diwali..",
    passwordPlaceholder: "Enter the little secret...",
    unlockButton: "Open Your Surprise..🪔",
    wrongPassword: "Oops! Not quite right. Try that little secret again..😉",

    // SECTION 2: Grand Diwali Welcome
    welcomeHeaderSuffix: "A LITTLE DIWALI SURPRISE..✨",
    welcomeMessage: "The lights are glowing, the sky is sparkling, and everything feels a little more magical tonight. Here's a tiny Diwali surprise, specially put together for you..✨",
    lightDiyaButton: "Light up the Diya 🪔",
    diyaLitStatus: "A little light, a little more Diwali magic..✨",

    // SECTION 3: Diwali Light Decoration
    decorationTitle: "A little more Light, A little More magic ✨",
    decorationSubtitle: "A few lights, a little sparkle =, and a festive corner made even prettier. Chalo, let's light it all up!",
    lightAllButton: "Make It Glow.. ✨",
    allLitStatus: "Look at that glow! Bas ab Diwali wali feeling aa gai na?🌟",

    // SECTION 4: Sweet Diwali Surprise / Gift Hamper
    hamperTitle: "A little box of Diwali Happiness 🎁",
    hamperSubtitle: "Because every celebration deserves something sweet. So here's a tiny festive surprise, just for you!!",
    openGiftButton: "Unwrap your surprise🎁",
    hamperRevealMessage: "",

    // SECTION 5: Diwali Fireworks Experience
    fireworksTitle: "A Sky Lit Just For You",
    fireworksSubtitle: "The sky is full of beautiful lights tonight, but honestly, meri nazar toh us ek person pe zyada hai jiski smile in sabhi fireworks se bhi zyada preety hai... and yes, I'm talking about you😉✨",
    fireworksHint: "Tap anywhere and let the sky sparkle a little more!!",

    // SECTION 6: Your Little Moments / Photo Gallery
    galleryTitle: "Your Little Moments..📸",
    gallerySubtitle: "A couple of little snapshots, a few smiles, and moments worth keeping. Kuch yaadein bas achhi lagti hai...✨",

    // SECTION 7: A Personal Letter & Interactive Envelope
    envelopeInstruction: "A little surprise, sealed with a little curiosity... Tap to open it..💌",
    letterTitle: "A Little Note For You",
    letterGreeting: "Hey Parakh,",
    letterParagraphs: [
      "So, this diwali I thought of doing something a little different instead of just sending a usual Happy Diwali message. And somehow, you became part of this little surprise..😊",

      "It's only been a couple of weeks since we met, but honestly talking to you as been a pretty nice part of my days. Your smile, your random conversations, and than little sense of humour... kuch to hai jo conversations ko interesting bana deta hai..😉",

      "I don't know what the future holds, and there's no neet to figure everything out right now. But I'm genuinely glad we crossed paths. Bas aise hi haste rehna, khush rehna, aur apni cute si vibe kabhi mat change karna...",
    ],
    letterClosing: "Wishing you a Diwali as lovely and cheerful as you are. Keep smiling, Parakh Ji...🪔✨🫶🏻🤍",

    // SECTION 8: Final Diwali Greeting
    finalHeading: "Happy Diwali, Parakh Ji..🪔✨",
    finalMessage: "May your life always shine brighter than the brightest fireworks, your smile never fade, and your days be filled with happiness, laughter, and beautiful little surprise. And honestly, I hope this little surprise made you smile too..😊",
    finalClosing: "Until our next celebration under the starry night sky.",
    replayButton: "Relive the little Surprise ✨",
    sharePrompt: "A little diwali surprise, made with a smile..🤍"
  },

  // SECTION 6: Photos Configuration (Exactly 2 photos)
  // Put your images in public/assets/photos/ (e.g. 1.jpg, 2.jpg)
  photos: [
    {
      id: 1,
      src: "/assets/photos/1.jpg",
      caption: "A little smile, a little sparkle, and a moment worth remembering..✨"
    },
    {
      id: 2,
      src: "/assets/photos/2.jpg",
      caption: "Some moments just have their own charm, and some smiles make them even better..😊"
    }
  ],

  // Interactive Decoration items in Section 3
  decorationItems: [
    { id: "lantern-left", label: "Akash Kandil (Left)", type: "lantern", position: "left-top" },
    { id: "lantern-right", label: "Akash Kandil (Right)", type: "lantern", position: "right-top" },
    { id: "fairy-lights", label: "Fairy Lights Garland", type: "fairy", position: "center-top" },
    { id: "brass-diya-1", label: "Royal Brass Diya", type: "diya", position: "left-bottom" },
    { id: "brass-diya-2", label: "Royal Brass Diya", type: "diya", position: "right-bottom" },
    { id: "rangoli-candle", label: "Center Floral Rangoli Diya", type: "candle", position: "center-bottom" }
  ],

  // Sweets & Treats inside the Hamper (Section 4)
  hamperItems: [
    { name: "Kaju Katli", desc: "The crown jewel of festive sweets", emoji: "💎" },
    { name: "Motichoor Ladoo", desc: "Rich saffron & pure ghee perfection", emoji: "🟡" },
    { name: "Rasmalai", desc: "Soaked in rose cardamom syrup", emoji: "🟤" },
    { name: "Almonds", desc: "Lightly salted with saffron mist", emoji: "🌰" },
    { name: "Gift Card", desc: "A special token of fond memories", emoji: "✨" }
  ]
};
