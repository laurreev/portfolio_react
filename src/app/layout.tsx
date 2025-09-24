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
  title: "Portfolio - Dlanor Domingo",
  description: "Full Stack Developer & Mobile App Developer passionate about creating amazing web and mobile experiences with modern technologies",
  keywords: ["Next.js", "React", "TypeScript", "Full Stack Developer", "Mobile App Developer", "Web Development"],
  authors: [{ name: "Dlanor Domingo" }],
  creator: "Dlanor Domingo",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Portfolio - Dlanor Domingo",
    description: "Full Stack Developer & Mobile App Developer",
    url: "https://dlanordev.vercel.app",
    siteName: "Dlanor's Portfolio",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Dlanor Domingo - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Dlanor Domingo",
    description: "Full Stack Developer & Mobile App Developer",
    images: ["/profile.jpg"],
    creator: "@sinnerdlei",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
