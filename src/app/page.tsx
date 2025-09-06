import ChatBot from "@/components/chat/ChatBot";
import type { Metadata, Viewport } from "next";
import About from "./_components/about";
import Blog from "./_components/blog";
import Contact from "./_components/contact";
import Hero from "./_components/hero";
import Portfolio from "./_components/portfolio";
import ScrollHandler from "./_components/scroll_handler";
import Services from "./_components/service";

export const dynamic = "force-static"; // Optimize for static generation

/**
 * Viewport export for the home page
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  // Viewport settings for mobile
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // Theme color for browser UI
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

/**
 * Metadata for the home page with comprehensive SEO configuration
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://brantize.com"),
  title: {
    template: "%s | Brantize Studio",
    default: "Brantize Studio | Professional Web Development & Design Services",
  },
  description:
    "Professional web development and design services for businesses and individuals. We create stunning, high-performance websites and applications.",
  keywords: [
    "web development",
    "web design",
    "responsive design",
    "UI/UX design",
    "Next.js development",
    "React development",
    "TypeScript development",
    "SEO optimization",
    "professional website",
    "Brantize Studio",
  ],
  authors: [{ name: "Brantize Studio Team" }],
  creator: "Brantize Studio",
  publisher: "Brantize Studio",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  // Social Media - OpenGraph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brantize.com",
    siteName: "Brantize Studio",
    title: "Brantize Studio | Professional Web Development & Design Services",
    description:
      "Professional web development and design services for businesses and individuals. We create stunning websites and applications.",
    images: [
      {
        url: "/og-image.jpg", // Ensure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "Brantize Studio - Professional Web Development and Design Services",
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@BrantizeStudio", // Replace with actual Twitter handle
    creator: "@BrantizeStudio", // Replace with actual Twitter handle
    title: "Brantize Studio | Professional Web Development",
    description:
      "Professional web development and design services for businesses and individuals.",
    images: ["/twitter-image.jpg"], // Ensure this image exists in your public folder
  },
  // App manifestation
  manifest: "/manifest.json",
  // Verification tokens for search engines
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
    yandex: "yandex-verification-code", // Replace with actual verification code
  },
  appleWebApp: {
    capable: true,
    title: "Brantize Studio",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Website structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://brantize.com/#website",
            name: "Brantize Studio",
            url: "https://brantize.com/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://brantize.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            publisher: {
              "@type": "Organization",
              name: "Brantize Studio",
              logo: {
                "@type": "ImageObject",
                url: "https://brantize.com/logo.png",
                width: 600,
                height: 60,
              },
              sameAs: [
                "https://facebook.com/brantizestudio",
                "https://twitter.com/BrantizeStudio",
                "https://instagram.com/brantizestudio",
                "https://linkedin.com/company/brantize-studio",
              ],
            },
            inLanguage: "en-US",
          }),
        }}
      />

      {/* Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://brantize.com/#organization",
            name: "Brantize Studio",
            url: "https://brantize.com/",
            logo: {
              "@type": "ImageObject",
              url: "https://brantize.com/logo.png",
              width: 600,
              height: 60,
            },
            image: "https://brantize.com/og-image.jpg",
            description:
              "Professional web development and design services for businesses and individuals. We create stunning, high-performance websites and applications.",
            priceRange: "$$",
            telephone: "+1-555-123-4567",
            email: "contact@brantize.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Web Dev Street",
              addressLocality: "San Francisco",
              addressRegion: "CA",
              postalCode: "94105",
              addressCountry: "US",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
            sameAs: [
              "https://facebook.com/brantizestudio",
              "https://twitter.com/BrantizeStudio",
              "https://instagram.com/brantizestudio",
              "https://linkedin.com/company/brantize-studio",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Web Development Services",
              itemListElement: [
                {
                  "@type": "OfferCatalog",
                  name: "Web Development",
                  description: "Custom web development services",
                },
                {
                  "@type": "OfferCatalog",
                  name: "Web Design",
                  description: "Professional web design services",
                },
                {
                  "@type": "OfferCatalog",
                  name: "SEO Services",
                  description: "Search engine optimization services",
                },
              ],
            },
          }),
        }}
      />

      <ScrollHandler />
      <ChatBot />
      <section id="home" aria-label="Homepage hero section">
        <Hero />
      </section>
      <section id="services" aria-label="Our services">
        <Services />
      </section>
      <section id="portfolio" aria-label="Our portfolio">
        <Portfolio />
      </section>
      <section id="blog" aria-label="Latest blog posts">
        <Blog />
      </section>
      <section id="about" aria-label="About us">
        <About />
      </section>
      <section id="contact" aria-label="Contact us">
        <Contact />
      </section>
    </div>
  );
}
