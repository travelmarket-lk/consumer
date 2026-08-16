import { Container } from "@/components/layout/Container";

export function Footer() {
  return <footer className="border-t border-slate-200 bg-white py-6 text-sm text-slate-500"><Container>© {new Date().getFullYear()} Consumer Platform</Container></footer>;
}
