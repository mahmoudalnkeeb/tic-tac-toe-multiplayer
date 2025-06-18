export const DOMAIN = "https://tictactoe-4x4.netlify.app";

const PWA_METADATA = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Moamal Alaa",
  },
  icons: {
    icon: [
      {
        url: "/PWA/icons/maskable-icon.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        url: "/PWA/icons/maskable-icon.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
    apple: [
      {
        url: "/PWA/icons/maskable-icon.webp",
        sizes: "180x180",
        type: "image/webp",
      },
    ],
  },
};

export const GLOBAL_METADATA = {
  title: "Advanced Tic Tac Toe",
  description:
    "A fun and strategic Tic Tac Toe game with board sizes up to 5x5 and exciting power-ups like Freeze, Bomb, and Swap. Learn how to play, challenge a friend, and enjoy a new level of competition!",
  keywords: [
    "advanced tic tac toe",
    "tic tac toe with power ups",
    "play tic tac toe online",
    "5x5 tic tac toe",
    "4x4 tic tac toe",
    "custom board tic tac toe",
    "tic tac toe strategy game",
    "multiplayer tic tac toe",
    "online tic tac toe game",
    "interactive tic tac toe",
    "freeze bomb swap tic tac toe",
    "modern tic tac toe game",
    "fun tic tac toe variations",
    "how to play tic tac toe with powers",
    "play tic tac toe with friends",
  ],
  authors: [{ name: "Moamal Alaa Kareem" }],
  publisher: "Moamal Alaa Kareem",
  creator: "Moamal Alaa Kareem",
};

export const METADATA = { ...GLOBAL_METADATA, ...PWA_METADATA };
