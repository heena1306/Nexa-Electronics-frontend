/** Thin promotional strip — theme neutrals only */
export default function PromoBanner({ title, subtitle, href = "#shop" }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200/90 bg-white px-4 py-3.5 shadow-sm ring-1 ring-black/[0.04] transition duration-300 hover:border-neutral-300 hover:shadow-md sm:px-6 sm:py-4"
    >
      <div className="min-w-0">
        <p className="text-sm font-bold text-neutral-900 sm:text-base">{title}</p>
        {subtitle && (
          <p className="mt-0.5 text-xs text-neutral-600 sm:text-sm">{subtitle}</p>
        )}
      </div>
      <span className="shrink-0 text-sm font-semibold text-neutral-900 transition group-hover:translate-x-0.5">
        Shop →
      </span>
    </a>
  );
}
