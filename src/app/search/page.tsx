"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type Hotel = { id: string; name: string; location: string; rating: number; reviews: number; price: number; image: string; tag: string; amenities: string[] };

const hotels: Hotel[] = [
  { id: "grand-kandyan", name: "The Grand Kandyan", location: "Anniewatta, Kandy", rating: 8.8, reviews: 1248, price: 92, tag: "Excellent location", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80", amenities: ["Breakfast included", "Free Wi-Fi", "Swimming pool"] },
  { id: "radisson-kandy", name: "Radisson Hotel Kandy", location: "Kandy Lake Front", rating: 8.5, reviews: 863, price: 76, tag: "Limited-time deal", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80", amenities: ["Free cancellation", "Free Wi-Fi", "City view"] },
  { id: "fox-kandy", name: "Fox Kandy by Fox Resorts", location: "Deyyannewela, Kandy", rating: 9.1, reviews: 427, price: 118, tag: "Top rated", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80", amenities: ["Breakfast included", "Free parking", "Mountain view"] },
];
const filterOptions = ["Free cancellation", "Breakfast included", "Swimming pool", "Free Wi-Fi"];

type GuestType = "adults" | "children" | "rooms";

export default function SearchPage() {
  const [destination, setDestination] = useState("Kandy");
  const [activeDestination, setActiveDestination] = useState("Kandy");
  const [checkIn, setCheckIn] = useState("2026-10-25");
  const [checkOut, setCheckOut] = useState("2026-10-29");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guestMenuOpen, setGuestMenuOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [budget, setBudget] = useState(250);
  const [sort, setSort] = useState("Recommended");
  const [savedHotels, setSavedHotels] = useState<string[]>([]);
  const nights = Math.max(1, Math.ceil((new Date(`${checkOut}T00:00:00Z`).getTime() - new Date(`${checkIn}T00:00:00Z`).getTime()) / 86400000));
  const mapQuery = `${activeDestination}, Sri Lanka`;
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const visibleHotels = useMemo(() => {
    const matches = hotels.filter((hotel) => selectedFilters.every((filter) => hotel.amenities.includes(filter)) && hotel.price <= budget);
    return [...matches].sort((a, b) => sort === "Price: low to high" ? a.price - b.price : sort === "Top reviewed" ? b.rating - a.rating : 0);
  }, [budget, selectedFilters, sort]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveDestination(destination.trim() || "Kandy");
  }
  function updateGuest(type: GuestType, amount: number) {
    const minimum = type === "children" ? 0 : 1;
    const setters = { adults: setAdults, children: setChildren, rooms: setRooms };
    setters[type]((value) => Math.max(minimum, value + amount));
  }
  function toggleFilter(filter: string) {
    setSelectedFilters((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  }

  return (
    <main className="min-h-full bg-[#f4f8f8] text-slate-900">
      <section className="border-b border-cyan-100 bg-[#dff4f2]"><Container className="py-5 lg:py-6">
        <div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">Hotel search</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Find your stay in {activeDestination}</h1></div><p className="hidden text-right text-sm text-slate-600 sm:block">Prices are in USD<br /><span className="text-xs">excluding taxes and fees</span></p></div>
        <form onSubmit={submitSearch} className="grid gap-2 rounded-xl border border-cyan-200 bg-white p-2 shadow-sm md:grid-cols-[1.15fr_1.3fr_0.9fr_auto]">
          <label className="flex min-h-14 flex-col justify-center rounded-lg bg-slate-50 px-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">Destination<input value={destination} onChange={(event) => setDestination(event.target.value)} className="mt-1 bg-transparent text-base font-semibold normal-case tracking-normal text-slate-950 outline-none" /></label>
          <div className="grid min-h-14 grid-cols-2 gap-3 rounded-lg bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500"><label>Check-in<input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="mt-1 block w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-slate-950 outline-none" /></label><label>Check-out<input type="date" value={checkOut} min={checkIn} onChange={(event) => setCheckOut(event.target.value)} className="mt-1 block w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-slate-950 outline-none" /></label></div>
          <div className="relative"><label className="flex min-h-14 flex-col justify-center rounded-lg bg-slate-50 px-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">Guests<button type="button" aria-expanded={guestMenuOpen} onClick={() => setGuestMenuOpen((open) => !open)} className="mt-1 text-left text-base font-semibold normal-case tracking-normal text-slate-950">{adults + children} guests, {rooms} room{rooms > 1 ? "s" : ""}</button></label>{guestMenuOpen && <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl"><div className="space-y-4">{([["Adults", "adults", adults], ["Children", "children", children], ["Rooms", "rooms", rooms]] as const).map(([label, type, count]) => <div key={type} className="flex items-center justify-between"><div><p className="text-sm font-semibold text-slate-900">{label}</p>{type === "children" && <p className="text-xs font-normal text-slate-500">Ages 0 to 17</p>}</div><div className="flex items-center gap-3"><button type="button" onClick={() => updateGuest(type, -1)} className="h-7 w-7 rounded-full border border-slate-300">-</button><span className="w-4 text-center text-sm font-semibold">{count}</span><button type="button" onClick={() => updateGuest(type, 1)} className="h-7 w-7 rounded-full border border-cyan-600 text-cyan-700">+</button></div></div>)}</div><button type="button" onClick={() => setGuestMenuOpen(false)} className="mt-5 w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">Done</button></div>}</div>
          <Button type="submit" className="min-h-14 rounded-lg px-7">Search</Button>
        </form>
      </Container></section>

      <Container className="py-7 lg:py-9"><div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 p-5"><h2 className="font-semibold text-slate-950">Explore the area</h2><p className="mt-1 text-xs text-slate-500">{mapQuery}</p></div><iframe title={`Map of ${activeDestination}`} src={mapUrl} className="h-64 w-full border-0" loading="lazy" /><div className="p-4"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer" className="block rounded-lg border border-cyan-200 px-3 py-2 text-center text-sm font-semibold text-cyan-700 hover:bg-cyan-50">Open in Google Maps</a></div></aside>
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><h2 className="font-semibold text-slate-950">Filter by</h2><button type="button" onClick={() => { setSelectedFilters([]); setBudget(250); }} className="text-xs font-semibold text-cyan-700">Clear all</button></div><fieldset className="border-b border-slate-100 py-5"><legend className="mb-3 text-sm font-semibold text-slate-950">Popular filters</legend><div className="space-y-3">{filterOptions.map((filter) => <label key={filter} className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"><input type="checkbox" checked={selectedFilters.includes(filter)} onChange={() => toggleFilter(filter)} className="h-4 w-4 accent-cyan-600" />{filter}</label>)}</div></fieldset><fieldset className="pt-5"><div className="mb-3 flex items-center justify-between"><legend className="text-sm font-semibold text-slate-950">Your budget</legend><span className="text-sm font-semibold text-cyan-700">Up to ${budget}</span></div><div className="flex justify-between text-xs text-slate-500"><span>$0</span><span>$250+</span></div><input aria-label="Maximum price per night" type="range" min="0" max="250" step="10" value={budget} onChange={(event) => setBudget(Number(event.target.value))} className="mt-2 h-1 w-full accent-cyan-600" /><p className="mt-3 text-xs text-slate-500">Per night, before taxes and fees</p></fieldset></aside>
        </div>

        <section><div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-slate-500">{activeDestination}, Central Province</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{visibleHotels.length} properties found</h2></div><label className="flex items-center gap-2 text-sm text-slate-500">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-800 outline-none"><option>Recommended</option><option>Price: low to high</option><option>Top reviewed</option></select></label></div><div className="space-y-4">
          {visibleHotels.map((hotel) => <article key={hotel.id} className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-300 hover:shadow-md md:grid-cols-[220px_minmax(0,1fr)_155px]"><div className="min-h-56 bg-cover bg-center" style={{ backgroundImage: `url(${hotel.image})` }} role="img" aria-label={hotel.name} /><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{hotel.location}</p><h3 className="mt-1 text-lg font-semibold text-slate-950">{hotel.name}</h3></div><button type="button" onClick={() => setSavedHotels((current) => current.includes(hotel.id) ? current.filter((id) => id !== hotel.id) : [...current, hotel.id])} className={`text-xl ${savedHotels.includes(hotel.id) ? "text-cyan-600" : "text-slate-400 hover:text-cyan-600"}`} aria-label={`Save ${hotel.name}`}>{savedHotels.includes(hotel.id) ? "♥" : "♡"}</button></div><div className="mt-3 flex items-center gap-2"><span className="rounded bg-cyan-700 px-2 py-1 text-xs font-bold text-white">{hotel.rating}</span><span className="text-sm font-semibold text-slate-700">Excellent</span><span className="text-xs text-slate-500">{hotel.reviews.toLocaleString()} reviews</span></div><div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">{hotel.amenities.map((amenity) => <span key={amenity}>✓ {amenity}</span>)}</div><p className="mt-4 inline-block rounded bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">{hotel.tag}</p></div><div className="flex flex-col justify-end border-t border-slate-100 p-5 md:border-l md:border-t-0"><p className="text-xs text-slate-500">{nights} night{nights > 1 ? "s" : ""}, {adults} adult{adults > 1 ? "s" : ""}</p><p className="mt-1 text-2xl font-bold text-slate-950">${hotel.price}</p><p className="text-xs text-slate-500">per night</p><Link href={`/hotels/${hotel.id}`} className="mt-4 block w-full rounded-lg border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-700">See availability</Link></div></article>)}
          {!visibleHotels.length && <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No properties match these filters.</div>}
        </div></section>
      </div></Container>
    </main>
  );
}
