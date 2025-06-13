import Header from "@/components/Header/Header";
import "../styles/globals.scss";

export const metadata = {
  title: "Advanced Tic Tic Toe",
  description:
    "A fun and strategic Tic Tac Toe game with board sizes up to 5x5 and exciting power-ups like Freeze, Bomb, and Swap. Learn how to play, challenge a friend, and enjoy a new level of competition!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
