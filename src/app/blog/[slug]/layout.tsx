import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111827" }, // bg-gray-900
    { media: "(prefers-color-scheme: light)", color: "#111827" }, // Using same color for consistency
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://brantize.com"),
  title: {
    template: "%s | Brantize Studio Blog",
    default: "Blog | Brantize Studio",
  },
  description:
    "Dive into expert insights on web development, design trends, and digital innovation at Brantize Studio's blog.",
  keywords: [
    "web development blog",
    "design articles",
    "digital innovation",
    "Brantize Studio",
    "tech blog",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/blog",
    languages: {
      "en-US": "/blog",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Brantize Studio",
    locale: "en_US",
    url: "https://brantize.com/blog",
    images: [
      {
        url: "/images/brantize-og-image.jpg", // Update with your actual OG image
        width: 1200,
        height: 630,
        alt: "Brantize Studio Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@brantizestudio",
    site: "@brantizestudio",
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code
    yandex: "yandex-verification-code", // Replace with your actual verification code if needed
  },
  authors: [
    { name: "Brantize Studio Team", url: "https://brantize.com/about" },
  ],
  archives: ["/blog/archives"],
  bookmarks: ["/blog"],
  category: "Technology",
  creator: "Brantize Studio",
  publisher: "Brantize Studio",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
