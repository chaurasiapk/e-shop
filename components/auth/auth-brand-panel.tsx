import { FavIcon } from "@/utils/contants";
import Image from "next/image";
import Link from "next/link";

export default function AuthBrandPanel() {
  return (
    <aside className="relative hidden min-h-[590px] overflow-hidden bg-[#008ECC] p-10 text-white lg:flex lg:flex-col">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-sm">
          <Image src={FavIcon} alt="E-Shop" width={50} height={50} className="h-6 w-6" />
        </span>
        e-shop
      </Link>

      <div className="my-auto">
        <p className="text-4xl font-bold leading-tight">
          Everything you love,
          <br />
          in one place.
        </p>
        <p className="mt-6 max-w-xs text-sm leading-6 text-white/75">
          Explore top brands, everyday essentials, and exclusive deals picked for you.
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-white/75">
        <div className="flex -space-x-2">
          <span className="h-7 w-7 rounded-full border-2 border-primary bg-amber-200" />
          <span className="h-7 w-7 rounded-full border-2 border-primary bg-sky-200" />
          <span className="h-7 w-7 rounded-full border-2 border-primary bg-rose-200" />
        </div>
        Join 500+ happy shoppers
      </div>
    </aside>
  );
}
