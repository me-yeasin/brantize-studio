import type { Metadata, Viewport } from "next";
import TermsAndConditionsContent from "./_components/terms_and_conditions_content";
import TermsJsonLd from "./_components/terms_jsonld";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111827" }, // bg-gray-900
    { media: "(prefers-color-scheme: light)", color: "#111827" }, // Same for consistency
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://brantize.com"),
  title: "Terms and Conditions | Brantize Studio",
  description:
    "Terms and conditions for using Brantize Studio services. Read our policies regarding intellectual property, user content, liability, and more.",
  keywords: [
    "terms and conditions",
    "legal terms",
    "website terms",
    "usage policy",
    "intellectual property",
    "Brantize Studio",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/terms-and-conditions",
    languages: {
      "en-US": "/terms-and-conditions",
    },
  },
  openGraph: {
    type: "website",
    url: "https://brantize.com/terms-and-conditions",
    title: "Terms and Conditions | Brantize Studio",
    description:
      "Terms and conditions for using Brantize Studio services. Read our policies regarding intellectual property, user content, liability, and more.",
    siteName: "Brantize Studio",
    locale: "en_US",
    images: [
      {
        url: "/images/terms-conditions-og.jpg", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "Brantize Studio Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@brantizestudio",
    title: "Terms and Conditions | Brantize Studio",
    description:
      "Terms and conditions for using Brantize Studio services. Read our policies regarding intellectual property, user content, liability, and more.",
    images: ["/images/terms-conditions-og.jpg"], // Replace with your actual image
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code
  },
  category: "Legal",
  creator: "Brantize Studio",
  publisher: "Brantize Studio",
  // Additional metadata properties
  applicationName: "Brantize Studio",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Brantize Studio Legal Team" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Brantize Studio",
  },
  appLinks: {
    web: {
      url: "https://brantize.com/terms-and-conditions",
    },
  },
  archives: ["/legal/archive"],
  bookmarks: ["/legal"],
};

export default function TermsAndConditions() {
  return (
    <>
      <TermsAndConditionsContent />
      <TermsJsonLd />
    </>
  );
}
