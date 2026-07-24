import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
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

        {/* Main Content: Profile Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-10">
            <Skeleton className="h-6 w-32 mb-8" />
            
            <div className="space-y-6 max-w-md">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-48" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>

              <Skeleton className="h-10 w-32 mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
