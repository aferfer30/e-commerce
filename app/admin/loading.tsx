import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-700">
      {/* Page Header Skeleton */}
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border/50 rounded-xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
            <div className="mt-2">
              <Skeleton className="h-4 w-24 mb-1.5" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders + Low Stock Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-7 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-4 bg-card border border-border/50 rounded-xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="divide-y divide-border/30">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="flex items-center gap-6 ml-4 shrink-0">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="xl:col-span-3 bg-card border border-border/50 rounded-xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="divide-y divide-border/30">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div className="flex-1">
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="ml-4">
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
