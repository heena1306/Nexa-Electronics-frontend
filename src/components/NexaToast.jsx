import { useCart } from "../context/CartContext";

export default function NexaToast() {
  const { toast, dismissToast } = useCart();
  if (!toast) return null;
  return (
    <div
      className="fixed bottom-6 left-1/2 z-[300] flex max-w-[min(100%,22rem)] -translate-x-1/2 px-4"
      role="status"
    >
      <div className="flex w-full items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-[0_16px_48px_rgba(0,0,0,0.14)] ring-1 ring-black/[0.06]">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
          ✓
        </span>
        <span className="min-w-0 flex-1 leading-snug">{toast}</span>
        <button
          type="button"
          className="shrink-0 rounded-full px-2 py-1 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800"
          onClick={dismissToast}
        >
          Close
        </button>
      </div>
    </div>
  );
}
