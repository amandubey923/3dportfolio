import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Aman Dubey | Developer Portfolio",
  description: "Professional developer portfolio of Aman Dubey",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
