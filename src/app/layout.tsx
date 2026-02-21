import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Analytics } from "@/components/Analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Enhanced SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://0xh2a.dev"), // Update with your actual domain
  title: {
    default: "Haseeb Ali Asghar | Cybersecurity Analyst",
    template: "%s | 0xH2A",
  },
  description: "CEH Certified Cybersecurity Professional specializing in SOC Operations, Malware Analysis, and Network Security. 6+ years of hands-on infrastructure experience.",
  keywords: [
    "Cybersecurity",
    "SOC Analyst",
    "Malware Analysis",
    "CEH Certified",
    "Network Security",
    "Penetration Testing",
    "Security Analyst",
    "Haseeb Ali Asghar",
    "0xH2A",
    "Ethical Hacker",
    "SIEM",
    "Incident Response",
  ],
  authors: [{ name: "Haseeb Ali Asghar", url: "https://0xh2a.dev" }],
  creator: "Haseeb Ali Asghar",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://0xh2a.dev",
    siteName: "0xH2A Portfolio",
    title: "Haseeb Ali Asghar | Cybersecurity Analyst",
    description: "CEH Certified Cybersecurity Professional specializing in SOC Operations and Malware Analysis",
    images: [
      {
        url: "/og-image.png", // Create this image later
        width: 1200,
        height: 630,
        alt: "0xH2A - Cybersecurity Portfolio",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Haseeb Ali Asghar | Cybersecurity Analyst",
    description: "CEH Certified | SOC & Malware Analysis | 6+ Years Network Experience",
    images: ["/og-image.png"],
    creator: "@0xH2A", // Update with your Twitter handle
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Manifest for PWA
  manifest: "/manifest.json",

  // Verification (add your codes when ready)
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Haseeb Ali Asghar",
  alternateName: "0xH2A",
  url: "https://0xh2a.dev",
  image: "https://0xh2a.dev/profile.jpg",
  jobTitle: "Cybersecurity Analyst",
  description: "CEH Certified Cybersecurity Professional specializing in SOC Operations and Malware Analysis",
  email: "haseeb.aliasghar@yahoo.com",
  sameAs: [
    "https://github.com/haseebaliasghar",
    "https://linkedin.com/in/haseebaliasghar",
  ],
  knowsAbout: [
    "Network Security",
    "Malware Analysis",
    "SOC Operations",
    "Penetration Testing",
    "SIEM",
    "Incident Response",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Certified Ethical Hacker (CEH)",
      credentialCategory: "Professional Certification",
      recognizedBy: {
        "@type": "Organization",
        name: "EC-Council",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Certified Network Security Specialist (CNSS)",
      credentialCategory: "Professional Certification",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
