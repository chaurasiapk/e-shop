import { Suspense } from "react";
import { User, Menu, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LogoLight } from "@/utils/contants";
import SearchInput from "./search-input";
import CartIcon from "./cart-icon";
import { getCurrentUser } from "@/features/auth";
import UserMenu from "./user-menu";

function SearchInputFallback() {
  return (
    <div className="flex-1 max-w-2xl mx-auto">
      <div className="w-full h-[46px] bg-surface rounded-full border border-gray-200 animate-pulse" />
    </div>
  );
}

export default async function Header() {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 text-primary" />
          </button>
          <Link href={"/"}>
            <Image src={LogoLight} alt="E-Shop" width={142} height={142} />
          </Link>

          <Suspense fallback={<SearchInputFallback />}>
            <SearchInput />
          </Suspense>

          <div className="flex items-center gap-6 shrink-0">
            {user ? (
              <>
              <UserMenu user={user} />
              
              <Link
              href="/profile/wishlist"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Wishlist</span>
            </Link>
              </>

              
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
            

            {/* Cart Icon */}
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
