import { ShieldCheck } from "lucide-react";
import type { HotelPoliciesSectionProps } from "../../types/hotel-props";

export function HotelPoliciesSection({ policies }: HotelPoliciesSectionProps) {
  return (
    <section className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-cyan-600" /> Hotel Policies & Essential Info
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {policies.map((pol, i) => (
          <div key={i} className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {pol.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">{pol.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
