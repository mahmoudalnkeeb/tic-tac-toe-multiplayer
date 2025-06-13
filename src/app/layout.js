import Header from "@/components/Header/Header";
import { METADATA } from "@/data/metadata";
import "../styles/globals.scss";

export const metadata = METADATA;

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
