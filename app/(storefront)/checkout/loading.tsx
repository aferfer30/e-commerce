import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layout/Container";

export default function CheckoutLoading() {
  return (
    <div className="bg-muted/30 min-h-screen py-12 animate-in fade-in duration-700">
      <Container className="max-w-6xl">
        <div className="mb-8">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-9 w-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Section Skeleton */}
          <div className="lg:col-span-7 xl:col-span-8 bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <Skeleton className="h-12 w-full mt-4" />
            </div>
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-5 xl:col-span-4 bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8">
            <Skeleton className="h-6 w-32 mb-6" />

            <div className="space-y-4 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-16 w-16 rounded-md shrink-0" />
                  <div className="flex flex-1 flex-col justify-center gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="flex items-center justify-end">
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>

            <div className="border-t border-border mt-4 pt-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
