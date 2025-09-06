import type { Metadata, Viewport } from "next";

/**
 * Metadata configuration for project details pages
 */
export const metadata: Metadata = {
  title: {
    template: "%s | Brantize Studio Portfolio",
    default: "Project Details | Brantize Studio",
  },
  description:
    "Explore our portfolio of web development and design projects. View case studies, results, and implementation details.",
  keywords: [
    "web development",
    "portfolio",
    "case study",
    "design project",
    "Brantize Studio",
  ],
  openGraph: {
    type: "article",
    title: "Portfolio Project | Brantize Studio",
    description:
      "Explore our portfolio of web development and design projects. View case studies, results, and implementation details.",
    siteName: "Brantize Studio",
    locale: "en_US",
    images: [
      {
        url: "/og-portfolio-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brantize Studio Portfolio Project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BrantizeStudio",
    creator: "@BrantizeStudio",
    title: "Portfolio Project | Brantize Studio",
    description:
      "Explore our portfolio of web development and design projects.",
    images: ["/twitter-portfolio-image.jpg"],
  },
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
    canonical: "/projects",
  },
};

/**
 * Viewport configuration for project details pages
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
