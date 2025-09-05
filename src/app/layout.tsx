import type { Metadata } from "next";
import { Orbitron, Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Header from "../components/header";
import Footer from "./_components/footer";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Brandtize Studio",
  description: "Creative agency for brand identity and digital marketing",
};

// This layout applies to all routes except those with their own layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${roboto.variable} antialiased`}>
        <Toaster position="top-right" />
        <Header />
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
