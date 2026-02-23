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
