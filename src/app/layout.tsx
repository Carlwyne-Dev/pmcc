import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradualBlur from "@/components/ui/GradualBlur";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "PMCC 4th Watch – Pulupandan Chapter | Official Website",
  description:
    "A modern, Spirit-filled Christian community in the heart of Pulupandan. Connect with us, join our weekly services, and experience a faith that comes alive.",
  keywords: [
    "PMCC 4th Watch",
    "Pentecostal Missionary Church of Christ",
    "Pulupandan",
    "Negros Occidental",
    "Church",
    "Christian",
    "Worship",
    "Youth Fellowship",
    "Bible Study",
    "Holiness",
  ],
  authors: [{ name: "PMCC 4th Watch Pulupandan Chapter" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "PMCC 4th Watch – Pulupandan Chapter | Official Website",
    description:
      "A Spirit-filled community in the heart of Pulupandan. Experience dynamic worship, systematic study, and youth fellowship.",
    url: "https://pulupandan-pmcc.vercel.app",
    siteName: "PMCC 4th Watch Pulupandan Chapter",
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
        className={`${geistSans.variable} ${cormorant.variable} font-sans bg-white text-ink antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <GradualBlur
          target="page"
          position="bottom"
          height="4rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
          zIndex={40}
        />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
