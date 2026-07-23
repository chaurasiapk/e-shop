import type { Metadata } from "next";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import { getCategories } from "@/features/categories";
import { FavIcon } from "@/utils/contants";
import { getCurrentUser } from "@/features/auth";
import { getWishlistByUserId } from "@/services/wishlist.service";
import WishlistProvider from "@/components/wishlist/wishlist-provider";
import LoginPromptProvider from "@/components/auth/login-prompt-provider";

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
  const [{ categories }, user] = await Promise.all([getCategories(), getCurrentUser()]);
  const wishlist = user ? await getWishlistByUserId(user._id) : null;

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col ">
        <LoginPromptProvider isAuthenticated={Boolean(user)}>
          <WishlistProvider initialProductIds={wishlist?.productIds ?? []} isAuthenticated={Boolean(user)}>
            <Header />
            <Navbar categories={categories} />
            {children}
            <Footer categories={categories} />
          </WishlistProvider>
        </LoginPromptProvider>
      </body>
    </html>
  );
}
