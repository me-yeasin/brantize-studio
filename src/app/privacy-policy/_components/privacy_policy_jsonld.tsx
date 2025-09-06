import Script from "next/script";

export default function PrivacyPolicyJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | Brantize Studio",
    description:
      "Our commitment to protecting your personal data and information. Learn about our data collection practices, usage policies, and your rights.",
    publisher: {
      "@type": "Organization",
      name: "Brantize Studio",
      logo: {
        "@type": "ImageObject",
        url: "https://brantize.com/logo.png", // Replace with your actual logo URL
      },
    },
    inLanguage: "en-US",
    mainEntity: {
      "@type": "WebContent",
      headline: "Privacy Policy",
      description:
        "Our commitment to protecting your personal data and information.",
      datePublished: "2025-09-06",
      dateModified: "2025-09-06",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://brantize.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Privacy Policy",
          item: "https://brantize.com/privacy-policy",
        },
      ],
    },
  };

  return (
    <Script
      id="privacy-policy-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(structuredData)}
    </Script>
  );
}
