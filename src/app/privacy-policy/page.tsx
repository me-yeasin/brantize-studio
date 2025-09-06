import type { Metadata, Viewport } from "next";
import PrivacyPolicyContent from "./_components/privacy_policy_content";
import PrivacyPolicyJsonLd from "./_components/privacy_policy_jsonld";

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
  title: "Privacy Policy | Brantize Studio",
  description:
    "Our commitment to protecting your personal data and information. Learn about our data collection practices, usage policies, and your rights.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal data",
    "privacy rights",
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
    canonical: "/privacy-policy",
    languages: {
      "en-US": "/privacy-policy",
    },
  },
  openGraph: {
    type: "website",
    url: "https://brantize.com/privacy-policy",
    title: "Privacy Policy | Brantize Studio",
    description:
      "Our commitment to protecting your personal data and information. Learn about our data collection practices, usage policies, and your rights.",
    siteName: "Brantize Studio",
    locale: "en_US",
    images: [
      {
        url: "/images/privacy-policy-og.jpg", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "Brantize Studio Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@brantizestudio",
    title: "Privacy Policy | Brantize Studio",
    description:
      "Our commitment to protecting your personal data and information. Learn about our data collection practices, usage policies, and your rights.",
    images: ["/images/privacy-policy-og.jpg"], // Replace with your actual image
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
  authors: [{ name: "Brantize Studio Team" }],
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
      url: "https://brantize.com/privacy-policy",
    },
  },
  archives: ["/legal/archive"],
  bookmarks: ["/legal"],
};

export default function PrivacyPolicy() {
  return (
    <>
      <PrivacyPolicyContent />
      <PrivacyPolicyJsonLd />
    </>
  );
}
