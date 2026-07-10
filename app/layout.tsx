import type { Metadata } from "next";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "E-Shop - Your Online Shop",
  description: "Online Shopping Platform",
  icons: {
    icon: "https://res.cloudinary.com/dobci6t4h/image/upload/v1783655133/Screenshot_2026-07-10_at_9.14.49_AM-removebg-preview_dnfyir.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col ">
        <Header />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
