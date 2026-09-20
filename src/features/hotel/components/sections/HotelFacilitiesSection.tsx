import { CheckCircle2, MapPin } from "lucide-react";
import type { HotelFacilitiesSectionProps } from "../../types/hotel-props";

export function HotelFacilitiesSection({
  hotelName,
  description,
  topAmenities,
  locationHighlights,
  landmarks,
}: HotelFacilitiesSectionProps) {
  return (
    <section id="facilities" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Property Overview & Amenities */}
      <div className="lg:col-span-2 space-y-4 rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">About {hotelName}</h3>
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          {description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Popular Property Facilities
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {topAmenities.map((am, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-xs font-medium text-slate-700"
              >
                <CheckCircle2 className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                <span>{am.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nearby Landmarks Card */}
      <div
        id="location"
        className="space-y-4 rounded-2xl bg-white p-6 border border-slate-200 shadow-sm"
      >
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-cyan-600" /> Location Highlights
        </h3>
        <p className="text-xs text-slate-500">{locationHighlights}</p>

        <div className="space-y-3 pt-2">
          {landmarks.map((lm, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs border-b border-slate-100 pb-2"
            >
              <span className="font-medium text-slate-700">{lm.name}</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {lm.distance}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
