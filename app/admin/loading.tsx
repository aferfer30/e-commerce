import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      <p className="mt-4 text-sm text-muted-foreground">Loading dashboard...</p>
    </div>
  );
}
