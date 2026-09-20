import type { TabButtonProps } from "../../types/hotel-props";

export function TabButton({
  id,
  label,
  isActive,
  onClick,
  className = "",
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
        isActive
          ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
      } ${className}`}
    >
      {label}
    </button>
  );
}
