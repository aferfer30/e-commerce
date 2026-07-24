import { Skeleton } from "@/components/ui/skeleton";

export default function AdminAnalyticsLoading() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-9 w-32 mb-1" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-card border border-border/50 rounded-xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-12 h-5 rounded-full" />
            </div>
            <div className="mt-2">
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-8 w-28" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Weekly Bar Chart Skeleton */}
        <div className="xl:col-span-2 bg-card border border-border/50 rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-20 rounded" />
          </div>

          <div className="flex items-end gap-4 h-48">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <Skeleton className="w-full h-full min-h-[40px] rounded-t-sm" />
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Summary Skeleton */}
        <div className="bg-card border border-border/50 rounded-xl p-8">
          <Skeleton className="h-5 w-24 mb-8" />
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
