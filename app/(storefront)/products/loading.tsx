import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="group relative p-2 bg-white/[0.02] border border-border/50 rounded-[2rem]">
      <div className="flex flex-col h-full bg-card rounded-[calc(2rem-0.5rem)] overflow-hidden relative">
        {/* Image Placeholder */}
        <div className="block relative aspect-square bg-muted/30 overflow-hidden">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-5 pb-6 gap-3">
          <div className="flex-1">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-5 w-full mb-1" />
            <Skeleton className="h-5 w-2/3" />
          </div>

          {/* Price + Add to cart placeholder */}
          <div className="flex items-end justify-between pt-4 border-t border-border/30">
            <div>
              <Skeleton className="h-3 w-10 mb-1" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="relative z-20">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 mb-8">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>

      {/* Controls Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Skeleton className="h-10 flex-1 sm:max-w-xs rounded-full" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
