import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "InvestConnect - Secure Investment Marketplace",
    template: "%s | InvestConnect"
  },
  description: "Connect with investment opportunities in a secure, transparent marketplace. Find and share halal investment opportunities with verified partners.",
  keywords: [
    "investment marketplace",
    "halal investments",
    "secure investments",
    "investment opportunities",
    "business funding",
    "startup investment",
    "ethical investing",
    "transparent marketplace"
  ],
  authors: [{ name: "InvestConnect Team" }],
  creator: "InvestConnect",
  publisher: "InvestConnect",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "InvestConnect - Secure Investment Marketplace",
    description: "Connect with investment opportunities in a secure, transparent marketplace. Find and share halal investment opportunities with verified partners.",
    siteName: "InvestConnect",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InvestConnect - Secure Investment Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InvestConnect - Secure Investment Marketplace",
    description: "Connect with investment opportunities in a secure, transparent marketplace",
    images: ["/og-image.jpg"],
  },
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}>
        {children}
      </body>
    </html>
  );
}
