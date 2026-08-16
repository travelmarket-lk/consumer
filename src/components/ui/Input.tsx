import type { InputHTMLAttributes } from "react";

export function Input({ label, error, className = "", ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      {label}
      <input className={`rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 ${className}`} {...props} />
      {error ? <span className="text-xs font-normal text-red-600">{error}</span> : null}
    </label>
  );
}
