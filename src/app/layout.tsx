import type { Metadata } from "next";
import { Inter, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DynamicBackground } from "@/components/DynamicBackground";
import { FloatingScrollbar } from "@/components/FloatingScrollbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { DynamicBgProvider } from "@/context/DynamicBgContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://proj-artist-website.pages.dev"),
  title: {
    default: "Artist Name — Contemporary Artist",
    template: "%s | Artist Name",
  },
  description:
    "Contemporary artist working across painting, sculpture, and installation. Based in Shanghai and Berlin. Explore works, exhibitions, and press.",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    siteName: "Artist Name",
    title: "Artist Name — Contemporary Artist",
    description:
      "Contemporary artist working across painting, sculpture, and installation. Based in Shanghai and Berlin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artist Name — Contemporary Artist",
  },
  robots: {
    index: true,
    follow: true,
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
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansSC.variable} ${notoSerifSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <ThemeProvider>
            <DynamicBgProvider>
              <DynamicBackground />
              <FloatingScrollbar />
              <Navigation />
              <main className="flex-1 pt-24 relative z-[2]">{children}</main>
              <Footer />
            </DynamicBgProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
