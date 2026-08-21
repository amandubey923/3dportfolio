import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const viewport: Viewport = {
  themeColor: "#00f0ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aman-portfolio-next.netlify.app"),
  title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.headline}`,
  description: `${PERSONAL_INFO.bioShort} Explore projects, technical skills, verified certifications, and interactive 3D developer universe.`,
  keywords: [
    "Aman Dubey",
    "Aman Kumar Dubey",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "React",
    "Three.js",
    "AI Developer",
    "Portfolio",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.socials.github }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    title: `${PERSONAL_INFO.name} — Full-Stack Developer & Software Engineer`,
    description: PERSONAL_INFO.bioShort,
    url: "https://aman-portfolio-next.netlify.app/",
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    images: [
      {
        url: "/images/aman.png",
        width: 800,
        height: 800,
        alt: PERSONAL_INFO.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} — Developer Portfolio`,
    description: PERSONAL_INFO.bioShort,
    images: ["/images/aman.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
