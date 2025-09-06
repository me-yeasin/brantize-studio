import Script from "next/script";

export default function TermsJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions | Brantize Studio",
    description:
      "Terms and conditions for using Brantize Studio services. Read our policies regarding intellectual property, user content, liability, and more.",
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
      headline: "Terms and Conditions",
      description:
        "Rules and regulations governing the use of Brantize Studio services and website.",
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
          name: "Terms and Conditions",
          item: "https://brantize.com/terms-and-conditions",
        },
      ],
    },
  };

  return (
    <Script
      id="terms-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(structuredData)}
    </Script>
  );
}
