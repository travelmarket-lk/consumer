"use client";

import Image from "next/image";
import { Star, ThumbsUp, MessageSquare, Award } from "lucide-react";
import type { ReviewsSectionProps } from "../types/hotel-data";



export function ReviewsSection({ score, reviewCount, label, categories, reviews }: ReviewsSectionProps) {
  return (
    <div className="space-y-8">
      {/* Overview Scorecard */}
      <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center h-20 w-20 rounded-2xl bg-cyan-600 text-white font-black text-3xl shadow-lg shadow-cyan-600/30">
              <span>{score}</span>
              <span className="text-[10px] font-normal opacity-80">/ 10</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">{label}</h3>
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <Award className="h-3.5 w-3.5" /> Top Rated
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Based on {reviewCount.toLocaleString()} verified Agoda guest reviews</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400" />
            ))}
          </div>
        </div>

        {/* Sub-Category Ratings Breakdown Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 pt-6">
          {Object.entries(categories).map(([key, value]) => {
            const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
            return (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{formattedKey}</span>
                  <span className="text-cyan-700 font-bold">{value}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-cyan-600 transition-all duration-500"
                    style={{ width: `${(value / 10) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Reviews List */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-cyan-600" /> Verified Guest Feedback
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="flex flex-col justify-between rounded-2xl bg-white p-5 border border-slate-200 shadow-sm space-y-4">
              <div>
                {/* Author Info & Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200">
                      <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">{rev.author}</h5>
                      <p className="text-xs text-slate-500">{rev.country} • Stayed {rev.stayDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-100 text-cyan-700 font-bold text-xs">
                    <span>{rev.rating}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {rev.roomType}
                  </span>
                  <h6 className="text-sm font-bold text-slate-900 mt-2">{rev.title}</h6>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rev.comment}</p>
                </div>
              </div>

              {rev.positivePoints && (
                <div className="pt-3 border-t border-slate-100 space-y-1">
                  {rev.positivePoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                      <ThumbsUp className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
