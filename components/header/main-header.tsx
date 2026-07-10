import { Search, User, ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MainHeader() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5 text-primary" />
        </button>
          <Link href={"/"}>
          <Image 
            src="https://res.cloudinary.com/dobci6t4h/image/upload/v1783655178/Screenshot_2026-07-10_at_9.09.21_AM-removebg-preview_abrcsw.png"
            alt="E-Shop"
            width={142}
            height={142}
          /></Link>

        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search essentials, groceries and more..."
              className="w-full pl-12 pr-4 py-3 bg-surface rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Login</span>
          </button>
          <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
