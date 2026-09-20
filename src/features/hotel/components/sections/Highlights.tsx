import { Sparkles } from "lucide-react";
import type { HighlightsAndKeyAdvantagesBarProps, HotelData, HotelFeature } from "../../types/hotel.types";



export function Highlights({ highlights, hotel }: HighlightsAndKeyAdvantagesBarProps) {
  const items: HotelFeature[] = highlights ?? hotel?.highlights ?? [];
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((h, i) => (
        <div key={i} className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{h.title}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{h.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}