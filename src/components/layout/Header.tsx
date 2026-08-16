import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">Consumer</Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600" aria-label="Main navigation">
          <Link href="/hotels" className="hover:text-cyan-700">Hotels</Link>
          <Link href="/search" className="hover:text-cyan-700">Search</Link>
        </nav>
      </Container>
    </header>
  );
}
