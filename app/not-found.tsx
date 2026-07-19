import { FavIcon } from "@/utils/contants";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-white px-4 py-16">
      <section className="flex max-w-3xl flex-col items-center text-center">
        <div
          aria-label="404"
          className="mb-8 flex items-center justify-center gap-3 sm:gap-6"
        >
          <span className="text-[9rem] font-semibold leading-none tracking-tight text-[#1A7FE8] sm:text-[13rem]">
            4
          </span>
          <Image
            height={144}
            width={144}
            alt=""
            src={FavIcon}
            className="h-[80px] w-[80px] sm:w-[144px] sm:h-[144px]"
          />
          <span className="text-[9rem] font-semibold leading-none tracking-tight text-[#1A7FE8] sm:text-[13rem]">
            4
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-8 text-xl text-gray-500 sm:text-3xl">
          The page you&apos;re looking for does not seem to exist
        </p>
        <Link
          href="/"
          className="mt-12 rounded-xl bg-primary px-7 py-4 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Go Back to Homepage
        </Link>
      </section>
    </main>
  );
}
