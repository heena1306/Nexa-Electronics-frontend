import { FaThLarge, FaListUl } from "react-icons/fa";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "rating", label: "Rating" },
  { value: "popularity", label: "Popular" },
];

export default function CatalogToolbar({
  sortBy,
  onSortChange,
  count,
  totalPages,
  page,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="mb-6 space-y-4 rounded-xl border border-neutral-200/90 bg-white p-4 shadow-sm ring-1 ring-black/[0.04] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-neutral-600">
          <span className="tabular-nums text-lg font-bold text-neutral-900">
            {count}
          </span>{" "}
          <span className="text-neutral-800">products</span>
          {totalPages > 1 && (
            <span className="text-neutral-400">
              {" "}
              · Page {page} of {totalPages}
            </span>
          )}
        </p>

        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50/80 p-1 ring-1 ring-black/[0.03]">
          <span className="sr-only" id="view-mode-label">
            Layout
          </span>
          <button
            type="button"
            aria-labelledby="view-mode-label"
            aria-pressed={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
            className={
              "flex h-9 w-9 items-center justify-center rounded-full transition duration-200 " +
              (viewMode === "grid"
                ? "bg-white text-neutral-900 shadow-sm ring-1 ring-neutral-200"
                : "text-neutral-500 hover:text-neutral-800")
            }
          >
            <FaThLarge className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-labelledby="view-mode-label"
            aria-pressed={viewMode === "list"}
            onClick={() => onViewModeChange("list")}
            className={
              "flex h-9 w-9 items-center justify-center rounded-full transition duration-200 " +
              (viewMode === "list"
                ? "bg-white text-neutral-900 shadow-sm ring-1 ring-neutral-200"
                : "text-neutral-500 hover:text-neutral-800")
            }
          >
            <FaListUl className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4">
        <span className="w-full text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:mb-0 sm:mr-2 sm:w-auto">
          Sort
        </span>
        {SORT_OPTIONS.map((opt) => {
          const active = sortBy === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSortChange(opt.value)}
              className={
                "rounded-full border px-3 py-2 text-sm font-medium transition duration-200 " +
                (active
                  ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                  : "border-neutral-200 bg-white text-neutral-700 shadow-sm hover:border-neutral-300 hover:shadow")
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
