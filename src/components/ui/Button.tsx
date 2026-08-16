import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cyan-600 text-white hover:bg-cyan-700 focus-visible:ring-cyan-600",
  secondary: "border border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:text-cyan-700 focus-visible:ring-cyan-600",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-slate-400",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={`rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`} {...props} />;
}
