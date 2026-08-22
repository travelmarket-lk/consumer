import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";

export default function SearchPage() {
  return (
    <main>
      <Container className="py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Search
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          Where will you stay?
        </h1>
        <div className="mt-8 max-w-xl">
          <Input label="Destination" placeholder="City or hotel name" />
        </div>
      </Container>
    </main>
  );
}
