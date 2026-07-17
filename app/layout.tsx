import type { Metadata } from "next";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import { getCategories } from "@/features/categories";
import { FavIcon } from "@/utils/contants";

import "./globals.css";

export const metadata: Metadata = {
  title: "E-Shop - Your Online Shop",
  description: "Online Shopping Platform",
  icons: {
    icon: FavIcon,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { categories } = await getCategories();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col ">
        <Header />
        <Navbar categories={categories} />
        {children}
        <Footer categories={categories} />
      </body>
    </html>
  );
}
