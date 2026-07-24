import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex animate-in fade-in duration-700">
      {/* Left Brand Panel Skeleton */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-card border-r border-border/50 p-12 relative overflow-hidden">
        {/* Logo/Back link */}
        <div className="relative z-10">
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Center copy */}
        <div className="relative z-10">
          <Skeleton className="h-6 w-32 rounded-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-2" />
          <Skeleton className="h-12 w-1/2 mb-6" />
          <Skeleton className="h-4 w-4/5 mb-2" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-8 border-t border-border/50 pt-8 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Form Panel Skeleton */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Mobile back link */}
        <div className="w-full max-w-sm mb-6 lg:hidden">
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-56" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full mt-2" />
          </div>

          <div className="mt-6 flex justify-center">
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}
