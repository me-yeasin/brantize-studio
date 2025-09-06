import type { Metadata, Viewport } from "next";
import { Orbitron, Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Header from "../components/header";
import SkipToContent from "../components/SkipToContent";
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

// Site-level SEO defaults
const SITE_NAME = "Brandtize Studio";
const SITE_DESCRIPTION =
  "Creative agency for brand identity and digital marketing";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const metadata: Metadata = {
      metadataBase: new URL(SITE_URL),
      title: {
        default: SITE_NAME,
        template: "%s | Brandtize Studio",
      },
      description: SITE_DESCRIPTION,
      keywords: [
        "branding",
        "brand identity",
        "digital marketing",
        "creative agency",
        "web design",
        "seo",
        "Brandtize Studio",
      ],
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
      alternates: {
        canonical: "/",
      },
      openGraph: {
        type: "website",
        url: "/",
        title: SITE_NAME,
        siteName: SITE_NAME,
        description: SITE_DESCRIPTION,
        locale: "en_US",
        images: [
          {
            url: "/next.svg",
            width: 1200,
            height: 630,
            alt: `${SITE_NAME} – Creative agency`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        images: ["/next.svg"],
      },
      icons: {
        icon: "/favicon.ico",
      },
      category: "business",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
    };
    return metadata;
  } catch {
    // Safe fallback metadata
    return {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      alternates: { canonical: "/" },
      robots: { index: true, follow: true },
    };
  }
}

// Technical SEO: viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

// This layout applies to all routes except those with their own layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Charset for proper encoding */}
        <meta charSet="utf-8" />
        {/* Organization JSON-LD for structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              logo: `${SITE_URL}/favicon.ico`,
            }),
          }}
        />
      </head>
      <body className={`${orbitron.variable} ${roboto.variable} antialiased`}>
        <SkipToContent />
        <Toaster position="top-right" />
        <Header />
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
