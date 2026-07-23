"use client";

import { Heart, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { logoutAction } from "@/features/auth";
import type { AuthUser } from "@/types/auth";
import { clearGuestCart } from "@/utils/guest-cart";

export default function UserMenu({ user }: { user: AuthUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const firstName = user.name.trim().split(/\s+/)[0] || "Account";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-primary">
          <UserRound className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">{firstName}</span>
      </button>

      {isOpen && (
        <div role="menu" className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-900/10">
          <div className="border-b border-gray-100 px-3 py-3">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="mt-1 truncate text-xs text-gray-500">{user.email}</p>
          </div>
          <Link href="/profile" role="menuitem" onClick={() => setIsOpen(false)} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-surface">
            <UserRound className="h-4 w-4" />
            My profile
          </Link>
          <Link href="/profile/orders" role="menuitem" onClick={() => setIsOpen(false)} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-surface">
            <UserRound className="h-4 w-4" />
            Orders
            
          </Link>
          <Link href="/profile/orders" role="menuitem" onClick={() => setIsOpen(false)} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-surface">
            <Heart className="h-4 w-4" />
            Wishlist
            
          </Link>
          <form action={logoutAction} onSubmit={clearGuestCart}>
            <button type="submit" role="menuitem" className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
