import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOrdersLoading() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-9 w-32 mb-1" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-card border border-border/50 rounded-xl">
        <div className="w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="py-4 px-4"><Skeleton className="h-3 w-12" /></th>
                <th className="py-4 px-4"><Skeleton className="h-3 w-16" /></th>
                <th className="py-4 px-4"><Skeleton className="h-3 w-12" /></th>
                <th className="py-4 px-4"><Skeleton className="h-3 w-12" /></th>
                <th className="py-4 px-4"><Skeleton className="h-3 w-10" /></th>
                <th className="py-4 px-4"><Skeleton className="h-3 w-12" /></th>
                <th className="py-4 px-4 w-12" />
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="border-b border-border/30 last:border-0">
                  <td className="py-4 px-4">
                    <Skeleton className="h-5 w-16 rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-32 mb-1.5" />
                    <Skeleton className="h-3 w-24" />
                  </td>
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="py-4 px-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="py-4 px-4">
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
