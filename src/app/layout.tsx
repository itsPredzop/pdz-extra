import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ConditionalHeader, ConditionalFooter } from "../components/ConditionalLayoutElements";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdzextra.com"),
  title: {
    default: "PDZ EXTRA — Premium MTA.SA Scripts",
    template: "%s | PDZ EXTRA",
  },
  description:
    "Premium MTA.SA scripts for OWL, Social, Original & Standalone frameworks. Elevate your roleplay server with high-quality, optimized resources.",
  keywords: [
    "MTA:SA",
    "Multi Theft Auto San Andreas",
    "Multi Theft Auto SA",
    "MTA:SA scripts",
    "OWL scripts",
    "Social scripts",
    "Original",
    "GTA roleplay",
    "MTA:SA resources",
    "PDZ EXTRA",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pdzextra.com",
    siteName: "PDZ EXTRA",
    title: "PDZ EXTRA — Premium MTA:SA Scripts",
    description:
      "Premium MTA:SA scripts for OWL, Social, Original & Standalone frameworks. Elevate your roleplay server.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDZ EXTRA — Premium MTA:SA Scripts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDZ EXTRA — Premium MTA:SA Scripts",
    description:
      "Premium MTA:SA scripts for OWL, Social, Original & Standalone. Elevate your roleplay server.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { getConfig } from "./admin/actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let configData = null;
  try {
    const res = await getConfig();
    if (res.success) configData = res.config;
  } catch (err) {}

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('pdz-theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <ConditionalHeader>
            <Header config={configData} />
          </ConditionalHeader>
          <main className="flex-1">{children}</main>
          <ConditionalFooter>
            <Footer />
          </ConditionalFooter>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
