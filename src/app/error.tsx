"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-20 text-center"><h1 className="text-3xl font-semibold text-slate-950">Something went wrong</h1><p className="mt-3 text-slate-600">We couldn’t complete that request. Please try again.</p><Button className="mt-6" onClick={() => reset()}>Try again</Button></main>;
}
