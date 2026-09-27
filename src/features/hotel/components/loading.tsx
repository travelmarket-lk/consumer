import { Skeleton } from "@/components/ui/Skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (


    // <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 space-y-4">
    //   <Loader2 className="h-10 w-10 text-cyan-600 animate-spin" />
    //   <p className="text-sm font-semibold text-slate-600">
    //     Loading hotel data...
    //   </p>
    // </div>
    <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
      <Skeleton className="h-10 w-72" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-80" />
        ))}
      </div>
      <div className="mt-10 flex flex-col-4 gap-6">

      <Skeleton className="h-20 w-72" />
      <Skeleton className="h-20 w-72" />
      <Skeleton className="h-20 w-72" />
      <Skeleton className="h-20 w-72" />

      </div>
      <div className="mt-10 gap-2">
        <Skeleton className="h-15 w-full m-2" />
        <Skeleton className="h-15 w-full m-2" />
        <Skeleton className="h-15 w-full m-2" />
        <Skeleton className="h-15 w-full m-2" />

      </div>
    </main>

  );
}
