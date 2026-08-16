import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8"><Skeleton className="h-10 w-72" /><Skeleton className="mt-4 h-5 w-96 max-w-full" /><Skeleton className="mt-10 h-64 w-full" /></main>;
}
