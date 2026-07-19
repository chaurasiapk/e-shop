import Image from "next/image";

export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-[80vh] flex-1 flex-col items-center justify-center gap-4 bg-white px-4"
    >
      <Image
        src="/cart-loader.gif"
        alt="Loading your cart"
        width={240}
        height={220}
        priority
        unoptimized
      />
      <p className="text-md font-medium text-gray-500">Loading...</p>
    </main>
  );
}
