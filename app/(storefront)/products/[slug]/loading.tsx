import { Skeleton } from "@/components/ui/skeleton";

export default function SingleProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <Skeleton className="h-5 w-32 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden p-2 border border-border/50">
            <Skeleton className="h-full w-full rounded-[calc(2rem-8px)]" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-2xl p-1 bg-gradient-to-br from-border/50 to-transparent"
              >
                <Skeleton className="h-full w-full rounded-[calc(1rem-4px)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col">
          <Skeleton className="h-6 w-24 rounded-full mb-6" />
          <Skeleton className="h-12 md:h-16 w-3/4 mb-4" />
          <Skeleton className="h-6 w-32 mb-8" />

          <div className="flex items-end gap-4 mb-8">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-6 w-24 mb-1" />
          </div>

          <div className="flex flex-col gap-2 mb-10">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-4/5" />
          </div>

          <div className="flex flex-col gap-4 mb-12">
            <div className="pt-8 border-t border-border/50">
              <div className="flex gap-4">
                <Skeleton className="h-14 flex-1 rounded-full" />
                <Skeleton className="h-14 w-14 rounded-full shrink-0" />
              </div>
            </div>
            <Skeleton className="h-4 w-48 mt-2 mx-auto sm:mx-0" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-border/50 pt-8">
            <div className="flex items-start gap-4">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Skeleton */}
      <div className="mt-16 md:mt-24 pt-12 border-t border-border/20">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="max-w-4xl flex flex-col gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-6 border-b border-border/10 pb-4">
              <Skeleton className="h-5 w-1/3 max-w-[200px]" />
              <Skeleton className="h-5 w-2/3 max-w-[400px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
