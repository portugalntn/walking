import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Portugal NTN Walking: Premium Walking Tours in Portugal",
    template: "%s | Portugal NTN Walking",
  },
  description:
    "Premium guided and self-guided walking tours across Portugal's most extraordinary landscapes. A DMC operator specialising in luxury walking tourism.",
  keywords: ["Portugal walking tours", "hiking Portugal", "DMC Portugal", "walking operator", "Douro Valley", "Peneda Gerês", "Trás-os-Montes"],
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
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
