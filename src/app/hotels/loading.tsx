import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() { return <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8"><Skeleton className="h-10 w-72" /><div className="mt-10 grid gap-6 md:grid-cols-3">{[1, 2, 3].map((item) => <Skeleton key={item} className="h-80" />)}</div></main>; }
