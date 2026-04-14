import { Link } from "react-router-dom";

export default function SectionHeading({
  title,
  subtitle,
  action,
  viewAllHref,
  viewAllTo,
}) {
  const viewAll =
    action !== undefined ? (
      action
    ) : viewAllTo != null ? (
      <Link
        to={viewAllTo}
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-black/[0.04] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md active:translate-y-0 active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
      >
        <span>View all</span>
        <span className="text-base font-bold leading-none" aria-hidden>
          →
        </span>
      </Link>
    ) : viewAllHref != null ? (
      <a
        href={viewAllHref}
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-black/[0.04] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md active:translate-y-0 active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
      >
        <span>View All</span>
        <span className="text-base font-bold leading-none" aria-hidden>
          →
        </span>
      </a>
    ) : null;

  return (
    <div className="mb-8 flex flex-col gap-5 border-b border-neutral-200/80 pb-8 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="min-w-0 space-y-2.5">
        <h2 className="text-xl font-extrabold tracking-[-0.025em] text-neutral-900 sm:text-2xl lg:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {viewAll}
    </div>
  );
}
