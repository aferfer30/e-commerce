import { Loader2 } from "lucide-react";

export default function StorefrontLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="h-12 w-12 animate-spin text-primary/50" />
      <p className="mt-4 text-muted-foreground animate-pulse">
        Loading amazing products...
      </p>
    </div>
  );
}
