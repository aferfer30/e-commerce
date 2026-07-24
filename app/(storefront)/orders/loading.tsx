import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
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

        {/* Main Content: Orders Skeleton */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-2xl overflow-hidden"
            >
              {/* Order Header */}
              <div className="px-6 py-5 border-b border-border/20 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-6">
                  <div>
                    <Skeleton className="h-3 w-16 mb-1.5" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="w-px h-8 bg-border/50" />
                  <div>
                    <Skeleton className="h-3 w-16 mb-1.5" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <Skeleton className="h-3 w-12 mb-1.5" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>

              {/* Items */}
              <div className="px-6 py-5">
                <div className="flex flex-col gap-4">
                  {[1, 2].map((j) => (
                    <div key={j} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-6 h-6 rounded-full" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border/10 flex justify-end">
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
