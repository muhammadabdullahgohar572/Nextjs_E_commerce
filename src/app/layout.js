import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbr";
import { BackgroundBoxesDemo } from "./Test/BackgroundBoxesDemo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ecommcred - Your E-commerce Store",
  description: "Discover amazing products at great prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* Background layer */}
          <div className="absolute inset-0 z-0">
            {/* <BackgroundBoxesDemo /> */}
          </div>

          {/* Foreground content */}
          <div className="relative z-20">
            <Navbar />
            <main className="pt-16">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
