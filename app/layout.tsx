import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/** Text and UI font of the public site (the same as FLOW). Titles stay in DIN, the brand in Baron. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
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
