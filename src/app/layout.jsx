import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});
export const fontBangla = localFont({
  src: "../../src/fonts/mayaboti-normal.ttf",
});

import "./globals.css";

export const metadata = {
  // ---------------- BASIC ----------------
  title: {
    default: "Hero Kidz | Smart Learning Toys for Kids",
    template: "%s | Hero Kidz",
  },

  description:
    "Hero Kidz offers smart educational toys and learning boards to help children learn numbers, counting, and basic concepts in a fun way.",

  keywords: [
    "kids learning toys",
    "educational toys for kids",
    "learning board",
    "kids education toys",
    "hero kidz",
    "children learning products",
  ],

  authors: [{ name: "Md Jihanur Rahman" }],
  creator: "Md Jihanur Rahman",
  publisher: "Md Jihanur Rahman",

  // ---------------- SEO ----------------
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ---------------- URL ----------------
  metadataBase: new URL("https://hero-kidz-orpin.vercel.app"),
  alternates: {
    canonical: "/",
  },

  // ---------------- OPEN GRAPH ----------------
  openGraph: {
    title: "Hero Kidz | Smart Learning Toys for Kids",
    description:
      "Fun and interactive educational toys that help kids learn numbers, counting, and basic skills.",
    url: "https://hero-kidz-orpin.vercel.app",
    siteName: "Hero Kidz",
    images: [
      {
        url: "https://i.ibb.co.com/jPDQDdpY/Screenshot-2025-12-29-at-6-37-53-PM.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ---------------- TWITTER ----------------
  twitter: {
    card: "summary_large_image",
    title: "Hero Kidz | Smart Learning Toys for Kids",
    description:
      "Discover fun learning toys for kids that boost creativity and early education.",
    images: [
      "https://i.ibb.co.com/jPDQDdpY/Screenshot-2025-12-29-at-6-37-53-PM.png",
    ],
  },

  // ---------------- ICONS ----------------
  icons: {
    icon: "https://i.ibb.co.com/Z6TPPHbR/Screenshot-2025-12-29-at-6-45-30-PM.png",
    apple:
      "https://i.ibb.co.com/Z6TPPHbR/Screenshot-2025-12-29-at-6-45-30-PM.png",
  },

  applicationName: "Hero Kidz",
  category: "education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar></Navbar>
        </header>
        <main className="py-2 md:w-11/12 mx-auto min-h[calc(100vh -302px)]">
          {" "}
          {children}
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
