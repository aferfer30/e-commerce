import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = 'force-dynamic';

const fontSans = Inter({
  variable: "--font-sans-next",
  subsets: ["latin"],
});

const fontDisplay = Syne({
  variable: "--font-display-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NovaTech",
    default: "NovaTech - Premium E-Commerce",
  },
  description:
    "Discover premium technology, laptops, audio gear, and accessories for the modern professional.",
  openGraph: {
    title: "NovaTech - Premium E-Commerce",
    description:
      "Discover premium technology, laptops, audio gear, and accessories.",
    url: "https://novatech.com",
    siteName: "NovaTech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaTech - Premium E-Commerce",
    description:
      "Discover premium technology, laptops, audio gear, and accessories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
