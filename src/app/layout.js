import Header from "@/components/Header/Header";
import PWAInit from "@/components/PWA/PWAInit";
import GitHubButton from "@/components/Shared/GitHubButton/GitHubButton";
import { METADATA } from "@/data/metadata";
import "../styles/globals.scss";

export const metadata = METADATA;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <GitHubButton />
        <PWAInit />
      </body>
    </html>
  );
}
