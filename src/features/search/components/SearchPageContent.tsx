"use client";

import type { FormEvent } from "react";
import { Container } from "@/components/layout/Container";
import { SearchFilters } from "@/features/search/components/SearchFilters";
import { SearchForm } from "@/features/search/components/SearchForm";
import { SearchResults } from "@/features/search/components/SearchResults";
import { useHotelSearch } from "@/features/search/hooks/useHotelSearch";

export function SearchPageContent() {
  const search = useHotelSearch();
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(search.mapQuery)}&output=embed`;

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search.submitSearch();
  }

  return <main className="min-h-full bg-[#f4f8f8] text-slate-900">
    <section className="border-b border-cyan-100 bg-[#dff4f2]"><Container className="py-5 lg:py-6"><div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">Hotel search</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Find your stay in {search.activeDestination}</h1></div><p className="hidden text-right text-sm text-slate-600 sm:block">Prices are in USD<br /><span className="text-xs">excluding taxes and fees</span></p></div><SearchForm destination={search.destination} onDestinationChange={search.setDestination} checkIn={search.checkIn} onCheckInChange={search.setCheckIn} checkOut={search.checkOut} onCheckOutChange={search.setCheckOut} adults={search.adults} childrenCount={search.children} rooms={search.rooms} onGuestPresetChange={search.setGuestPreset} onSubmit={submitSearch} /></Container></section>
    <Container className="py-7 lg:py-9"><div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="flex flex-col gap-6"><aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 p-5"><h2 className="font-semibold text-slate-950">Explore the area</h2><p className="mt-1 text-xs text-slate-500">{search.mapQuery}</p></div><iframe title={`Map of ${search.activeDestination}`} src={mapUrl} className="h-64 w-full border-0" loading="lazy" /><div className="p-4"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(search.mapQuery)}`} target="_blank" rel="noreferrer" className="block rounded-lg border border-cyan-200 px-3 py-2 text-center text-sm font-semibold text-cyan-700 hover:bg-cyan-50">Open in Google Maps</a></div></aside><SearchFilters selectedFilters={search.selectedFilters} budget={search.budget} onFilterToggle={search.toggleFilter} onBudgetChange={search.setBudget} onClear={search.clearFilters} /></div>
      <SearchResults hotels={search.visibleHotels} destination={search.activeDestination} nights={search.nights} adults={search.adults} sort={search.sort} onSortChange={search.setSort} savedHotels={search.savedHotels} onSave={search.toggleSavedHotel} />
    </div></Container>
  </main>;
}