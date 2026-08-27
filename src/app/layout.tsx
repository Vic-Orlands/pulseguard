import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://pulseguard.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "PulseGuard",
  description:
    "An intelligent, error tracking and monitoring tool for your web apps.",
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/apple-icon",
  },
  openGraph: {
    title: "PulseGuard",
    description:
      "An intelligent, error tracking and monitoring tool for your web apps.",
    url: baseUrl,
    siteName: "PulseGuard",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PulseGuard Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseGuard",
    description:
      "An intelligent, error tracking and monitoring tool for your web apps.",
    images: "/twitter-image",
    creator: "@MezieIV",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
        <Script
          id="counterscale-script"
          src="https://pulse-analytics.chimezieinnocent39.workers.dev/tracker.js?v=3.5.0"
          strategy="afterInteractive"
          data-site-id="pulseguard"
        />
      </body>
    </html>
  );
}
