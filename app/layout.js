import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import ScrollToTop from "./components/helper/scroll-to-top";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevZahir",
  description:
    "This is the portfolio of DevZahir, a full-stack developer with a passion for creating innovative solutions.",
  metadataBase: new URL("https://devzahir.com"),

  openGraph: {
    title: "DevZahir",
    description:
      "Explore the portfolio of DevZahir — a full-stack developer delivering elegant and high-performance solutions.",
    url: "https://devzahir.com",
    siteName: "DevZahir",
    images: [
      {
        url: "https://i.ibb.co/k2Q9R4w9/photo-2025-07-31-22-40-16.jpg",
        width: 1200,
        height: 630,
        alt: "DevZahir Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DevZahir",
    description:
      "Explore the portfolio of DevZahir — a full-stack developer delivering elegant and high-performance solutions.",
    site: "@devzahirjs",
    creator: "@devzahirjs",
    images: ["https://i.ibb.co/k2Q9R4w9/photo-2025-07-31-22-40-16.jpg"],
  },

  other: {
    "telegram:title": "DevZahir@2025",
    "telegram:description": "Full-Stack Developer",
    "telegram:image": "https://i.ibb.co/k2Q9R4w9/photo-2025-07-31-22-40-16.jpg",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#0f172a",
  viewport: "width=device-width, initial-scale=1",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
