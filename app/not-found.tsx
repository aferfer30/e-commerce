import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="bg-muted p-4 rounded-full mb-6">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We couldn't find the page you're looking for. It might have been removed, renamed, or didn't exist in the first place.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Return to Storefront
      </Link>
    </div>
  );
}
