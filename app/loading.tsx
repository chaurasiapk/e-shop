function SectionHeadingSkeleton() {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="h-6 w-56 rounded bg-gray-200" />
      <div className="h-4 w-16 rounded bg-gray-200" />
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="min-w-40 overflow-hidden rounded-2xl border border-gray-100 bg-white md:min-w-0">
      <div className="aspect-square bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="h-5 w-1/3 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading home page"
      className="flex-1 animate-pulse"
    >
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-6">
        <section className="relative h-[280px] overflow-hidden rounded-2xl bg-gray-200 md:h-[320px]">
          <div className="flex h-full items-center justify-between px-8 md:px-14">
            <div className="space-y-4">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-12 w-64 rounded bg-gray-200 md:h-16 md:w-96" />
              <div className="h-7 w-44 rounded bg-gray-200" />
              <div className="h-5 w-24 rounded bg-gray-200" />
            </div>
            <div className="h-48 w-48 rounded-2xl bg-gray-300 md:h-64 md:w-64" />
          </div>
        </section>

        {["phones", "laptops"].map((section) => (
          <section key={section}>
            <SectionHeadingSkeleton />
            <div className="flex gap-4 overflow-hidden md:grid md:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 5 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </section>
        ))}

        <section>
          <SectionHeadingSkeleton />
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex shrink-0 flex-col items-center gap-3">
                <div className="h-24 w-24 rounded-full bg-gray-200 md:h-36 md:w-36" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeadingSkeleton />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="h-48 rounded-2xl bg-gray-200 md:h-56" />
            ))}
          </div>
        </section>

        <section>
          <SectionHeadingSkeleton />
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-square rounded-2xl bg-gray-200" />
                <div className="mx-auto h-4 w-3/4 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
