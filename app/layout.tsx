import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/** Text and UI font of the public site (the same as FLOW). Titles stay in DIN, the brand in Baron.
 *  Local file (./fonts, OFL licence next to it) so the build never depends on Google Fonts: the
 *  google/fonts variable font with the same characters (latin, latin-ext) Google serves. */
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans.woff2",
  weight: "400 800",
  variable: "--font-jakarta",
  display: "swap",
  adjustFontFallback: false, // the resized Arial is in globals.css
  fallback: ["Plus Jakarta Sans Fallback"],
});

export const metadata: Metadata = {
  title: {
    default: "Portugal NTN Walking: Premium Walking Tours in Portugal",
    template: "%s | Portugal NTN Walking",
  },
  description:
    "Premium guided and self-guided walking tours across Portugal's most extraordinary landscapes. Every route designed, waymarked and certified by the team that operates it.",
  keywords: ["Portugal walking tours", "hiking Portugal", "walking holidays Portugal", "walking operator", "Douro Valley", "Peneda Gerês", "Trás-os-Montes"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://portugalntnwalking.com",
    siteName: "Portugal NTN Walking",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
