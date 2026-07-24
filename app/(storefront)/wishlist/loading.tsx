import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-border/50">
        <Skeleton className="h-4 w-16 mb-3" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar Skeleton */}
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
          <div className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col items-center gap-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-2 flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        </div>

        {/* Main Content: Wishlist Grid Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-2 bg-white/[0.02] border border-border/50 rounded-[2rem]"
              >
                <div className="flex flex-col h-full bg-card rounded-[calc(2rem-0.5rem)] overflow-hidden relative">
                  <div className="block relative aspect-square bg-muted/30 overflow-hidden">
                    <Skeleton className="absolute inset-0 w-full h-full" />
                  </div>
                  <div className="flex flex-col flex-1 p-5 pb-6 gap-3">
                    <div className="flex-1">
                      <Skeleton className="h-3 w-16 mb-2" />
                      <Skeleton className="h-5 w-full mb-1" />
                      <Skeleton className="h-5 w-2/3" />
                    </div>
                    <div className="flex items-end justify-between pt-4 border-t border-border/30">
                      <div>
                        <Skeleton className="h-3 w-10 mb-1" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
