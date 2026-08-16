import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function Home() {
  return (
    <main><Container className="flex flex-1 flex-col justify-center py-20">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Consumer Platform</p>
      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
        A strong foundation for your product.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Next.js App Router with a clear frontend structure, typed API endpoints, MySQL persistence, and a reusable external REST client.
      </p>
      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link href="/hotels" className="rounded-full bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-700">Explore hotels →</Link>
        <Link href="/search" className="rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:border-cyan-400 hover:text-cyan-700">Start a search</Link>
      </div>
    </Container></main>
  );
}
