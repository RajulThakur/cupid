import localFont from "next/font/local";

import { EdgeStoreProvider } from "./_lib/edgestore";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Cupid",
  description: "Messenger app to talk between people",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
            <EdgeStoreProvider>
              {children}
            </EdgeStoreProvider>
        </main>
      </body>
    </html>
  );
}
