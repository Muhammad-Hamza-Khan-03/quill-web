export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white/5 aspect-[3/4] rounded-lg mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shimmer"></div>
      </div>
      <div className="h-6 bg-white/10 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-white/5 rounded w-1/2 mb-2"></div>
      <div className="h-5 bg-white/10 rounded w-24 mt-4"></div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-10 flex items-center justify-between">
        <div className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-white/5 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/5] w-full bg-luxury-gray rounded-3xl animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shimmer"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-luxury-gray/50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-5 w-32 bg-white/10 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-white/5 rounded animate-pulse"></div>
            </div>
            <div className="h-12 w-3/4 bg-white/10 rounded animate-pulse"></div>
            <div className="h-8 w-40 bg-white/5 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-white/5 rounded animate-pulse"></div>
          </div>

          <div className="space-y-6">
            <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-luxury-gray/50 rounded-full animate-pulse"></div>
              ))}
            </div>
            <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
            <div className="h-16 w-full bg-luxury-gray/30 rounded-lg animate-pulse"></div>
            <div className="h-14 w-full bg-white/10 rounded-2xl animate-pulse"></div>
            <div className="h-14 w-full bg-white/5 rounded-2xl animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 gap-8 py-10 border-y border-luxury-border">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-16 bg-white/5 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-white/10 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
            <div className="h-20 w-full bg-white/5 rounded animate-pulse"></div>
            <div className="h-24 w-full bg-luxury-blue/5 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="mt-32 border-t border-luxury-border pt-20">
        <div className="flex gap-12">
          <div className="w-1/3 space-y-6">
            <div className="h-10 w-40 bg-white/10 rounded animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-16 w-16 bg-white/10 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-6 w-12 bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-white/5 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="w-2/3 space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4 pb-8 border-b border-luxury-border">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-3 w-20 bg-white/5 rounded animate-pulse"></div>
                  </div>
                  <div className="h-3 w-16 bg-white/5 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-full bg-white/5 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-32">
        <div className="flex justify-between items-end mb-12">
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse"></div>
          <div className="h-4 w-28 bg-white/5 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[3/4] bg-luxury-gray/50 rounded-2xl animate-pulse"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
