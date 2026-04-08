import { FaTimes } from "react-icons/fa";
import {
  INITIAL_CATALOG_FILTERS,
  catalogFiltersAreActive,
} from "../utils/catalogFilterApply";
import { formatINR, USD_TO_INR } from "../utils/currency";

/**
 * Chips for controlled catalog filters + clear all.
 */
export default function ActiveFiltersBar({
  filters,
  onFiltersChange,
  categoryLabels,
  bandLabels,
  brandLabel,
  colorLabel,
}) {
  if (!catalogFiltersAreActive(filters)) return null;

  const clearAll = () => onFiltersChange({ ...INITIAL_CATALOG_FILTERS });

  const chips = [];

  if (
    filters.priceMin !== INITIAL_CATALOG_FILTERS.priceMin ||
    filters.priceMax !== INITIAL_CATALOG_FILTERS.priceMax
  ) {
    chips.push({
      key: "price",
      label: `${formatINR(filters.priceMin * USD_TO_INR)} — ${formatINR(filters.priceMax * USD_TO_INR)}`,
      remove: () =>
        onFiltersChange({
          ...filters,
          priceMin: INITIAL_CATALOG_FILTERS.priceMin,
          priceMax: INITIAL_CATALOG_FILTERS.priceMax,
        }),
    });
  }

  if (filters.activeCategoryId) {
    const label =
      categoryLabels[filters.activeCategoryId] ?? filters.activeCategoryId;
    chips.push({
      key: "cat",
      label,
      remove: () => onFiltersChange({ ...filters, activeCategoryId: null }),
    });
  }

  filters.bands.forEach((id) => {
    chips.push({
      key: `band-${id}`,
      label: bandLabels[id] ?? id,
      remove: () =>
        onFiltersChange({
          ...filters,
          bands: filters.bands.filter((x) => x !== id),
        }),
    });
  });

  filters.brands.forEach((id) => {
    chips.push({
      key: `brand-${id}`,
      label: brandLabel(id) ?? id,
      remove: () =>
        onFiltersChange({
          ...filters,
          brands: filters.brands.filter((x) => x !== id),
        }),
    });
  });

  filters.colors.forEach((id) => {
    chips.push({
      key: `color-${id}`,
      label: colorLabel(id),
      remove: () =>
        onFiltersChange({
          ...filters,
          colors: filters.colors.filter((x) => x !== id),
        }),
    });
  });

  if (filters.minStars > 0) {
    chips.push({
      key: "stars",
      label: `${filters.minStars}+ stars`,
      remove: () => onFiltersChange({ ...filters, minStars: 0 }),
    });
  }

  if (filters.inStockOnly) {
    chips.push({
      key: "stock",
      label: "In stock only",
      remove: () => onFiltersChange({ ...filters, inStockOnly: false }),
    });
  }

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-neutral-200/90 bg-white px-4 py-3 shadow-sm ring-1 ring-black/[0.04] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3.5">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Active
        </span>
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={c.remove}
            className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 py-1 pl-3 pr-2 text-xs font-medium text-neutral-800 transition duration-200 hover:border-neutral-300 hover:bg-white hover:shadow-sm"
          >
            <span className="truncate">{c.label}</span>
            <FaTimes className="h-3 w-3 shrink-0 text-neutral-500" aria-hidden />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={clearAll}
        className="shrink-0 text-sm font-semibold text-neutral-700 underline-offset-4 transition hover:text-neutral-900 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
