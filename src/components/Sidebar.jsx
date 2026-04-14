import { useMemo, useState } from "react";
import { formatCatalogPrice, formatINR, USD_TO_INR } from "../utils/currency";
import {
  FaChevronDown,
  FaChevronRight,
  FaGem,
  FaPlus,
  FaStar,
  FaTag,
} from "react-icons/fa";

const PRICE_SLIDER_MAX = 800;
const PRICE_GAP = 8;

const PRODUCT_CATEGORIES = [
  { id: "c1", label: "Computers & Laptop", count: 8 },
  { id: "c2", label: "Electric accessories", count: 12 },
  { id: "c3", label: "Mainboard & CPU", count: 5 },
  { id: "c4", label: "Storage & Memory", count: 14 },
  { id: "c5", label: "Monitors & Displays", count: 9 },
  { id: "c6", label: "Audio & Headphones", count: 11 },
  { id: "c7", label: "Networking", count: 6 },
  { id: "c8", label: "Gaming gear", count: 7 },
  { id: "c9", label: "Smart home", count: 4 },
  { id: "c10", label: "Cameras & drones", count: 3 },
];

const PRICE_BANDS = [
  {
    id: "b1",
    label: `Under ${formatINR(100 * USD_TO_INR)}`,
    count: 42,
  },
  {
    id: "b2",
    label: `${formatINR(100 * USD_TO_INR)} — ${formatINR(200 * USD_TO_INR)}`,
    count: 28,
  },
  {
    id: "b3",
    label: `${formatINR(200 * USD_TO_INR)} — ${formatINR(400 * USD_TO_INR)}`,
    count: 15,
  },
  {
    id: "b4",
    label: `${formatINR(400 * USD_TO_INR)}+`,
    count: 9,
  },
];

/** Clearbit logos — initials fallback on error */
function BrandLogo({ domain, label, size = "md" }) {
  const [failed, setFailed] = useState(false);
  const wh = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const textSize = size === "sm" ? "text-[9px]" : "text-[10px]";
  if (failed) {
    return (
      <span
        className={`flex ${wh} shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 font-bold uppercase text-neutral-600 ${textSize}`}
      >
        {label.replace(/[^A-Z]/gi, "").slice(0, 2) || "?"}
      </span>
    );
  }
  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt=""
      className={`${wh} shrink-0 rounded-lg border border-neutral-200/80 bg-white object-contain p-1`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

function BrandCheckboxRow({ b, checked, onToggle, checkboxClass }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-lg border border-transparent py-2 pl-0.5 pr-1 transition hover:border-neutral-200 hover:bg-neutral-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className={checkboxClass}
      />
      <BrandLogo domain={b.domain} label={b.label} size="sm" />
      <span className="min-w-0 flex-1 text-sm font-medium text-neutral-800">
        {b.label}
      </span>
      <span className="text-xs tabular-nums text-neutral-400">({b.count})</span>
    </label>
  );
}

const POPULAR_BRANDS = [
  { id: "samsung", label: "Samsung", domain: "samsung.com", count: 31 },
  { id: "sony", label: "Sony", domain: "sony.com", count: 18 },
  { id: "asus", label: "Asus", domain: "asus.com", count: 22 },
  { id: "lg", label: "LG", domain: "lg.com", count: 14 },
];

const BUDGET_BRANDS = [
  { id: "anker", label: "Anker", domain: "anker.com", count: 26 },
  { id: "tcl", label: "TCL", domain: "tcl.com", count: 11 },
  { id: "tplink", label: "TP-Link", domain: "tp-link.com", count: 9 },
  { id: "acer", label: "Acer", domain: "acer.com", count: 15 },
];

const PREMIUM_BRANDS = [
  { id: "apple", label: "Apple", domain: "apple.com", count: 34 },
  { id: "dell", label: "Dell", domain: "dell.com", count: 19 },
  { id: "microsoft", label: "Microsoft", domain: "microsoft.com", count: 12 },
  { id: "bose", label: "Bose", domain: "bose.com", count: 8 },
];

const MORE_BRANDS = [
  { id: "toshiba", label: "Toshiba", domain: "toshiba.com", count: 7 },
  { id: "hp", label: "HP", domain: "hp.com", count: 21 },
  { id: "lenovo", label: "Lenovo", domain: "lenovo.com", count: 17 },
  { id: "xiaomi", label: "Xiaomi", domain: "mi.com", count: 13 },
  { id: "oneplus", label: "OnePlus", domain: "oneplus.com", count: 6 },
  { id: "jbl", label: "JBL", domain: "jbl.com", count: 10 },
];

const COLORS = [
  { id: "red", label: "Red", hex: "#ef4444" },
  { id: "green", label: "Green", hex: "#22c55e" },
  { id: "blue", label: "Blue", hex: "#3b82f6" },
  { id: "purple", label: "Purple", hex: "#a855f7" },
  { id: "black", label: "Black", hex: "#171717" },
  { id: "gray", label: "Gray", hex: "#9ca3af" },
  { id: "pink", label: "Pink", hex: "#fbcfe8", darkText: true },
  { id: "brown", label: "Brown", hex: "#78350f" },
  { id: "yellow", label: "Yellow", hex: "#eab308" },
];

export const ALL_BRAND_ROWS = [
  ...POPULAR_BRANDS,
  ...BUDGET_BRANDS,
  ...PREMIUM_BRANDS,
  ...MORE_BRANDS,
];

export { PRODUCT_CATEGORIES, PRICE_BANDS, COLORS };

const TAGS = [
  "Games",
  "Electronics",
  "Video",
  "iPhone",
  "Laptop",
  "SSD",
  "4K",
  "USB-C",
  "Wireless",
  "Smart TV",
  "Deals",
  "Office",
];

const BEST_SELLERS = [
  {
    id: "bs1",
    title: "Wireless ANC Headphones",
    price: 199.99,
    was: 239.99,
    rating: 5,
    reviews: 1200,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "bs2",
    title: "4K Smart Display 27\"",
    price: 349.0,
    was: null,
    rating: 4,
    reviews: 86,
    image:
      "https://images.unsplash.com/photo-1527443224154-c8a3942d3d1a?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "bs3",
    title: "USB-C Hub 7-in-1",
    price: 39.99,
    was: 49.99,
    rating: 4,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1625948515291-4a4e2f6d0c1?w=120&h=120&auto=format&fit=crop&q=80",
  },
];

function SectionTitle({ children }) {
  return (
    <h2 className="text-base font-semibold leading-snug tracking-tight text-neutral-900">
      {children}
    </h2>
  );
}

function Subheading({ icon: Icon, children, className = "" }) {
  return (
    <p
      className={
        "mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500 " +
        className
      }
    >
      {Icon && <Icon className="h-3.5 w-3.5 text-neutral-400" aria-hidden />}
      {children}
    </p>
  );
}

function ToggleChip({ pressed, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={
        "rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 " +
        (pressed
          ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
          : "border-neutral-200 bg-white text-neutral-700 shadow-sm hover:border-neutral-300 hover:shadow") +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}

const cb =
  "h-4 w-4 shrink-0 rounded border-neutral-300 bg-white accent-neutral-900";

export default function Sidebar({ filters, onFiltersChange }) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [colorsExpanded, setColorsExpanded] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const { priceMin, priceMax } = filters;
  const visualMin = Math.max(0, Math.min(priceMin, PRICE_SLIDER_MAX));
  const visualMax = Math.max(
    visualMin + PRICE_GAP,
    Math.min(priceMax, PRICE_SLIDER_MAX)
  );

  const visibleCategories = showAllCategories
    ? PRODUCT_CATEGORIES
    : PRODUCT_CATEGORIES.slice(0, 6);

  const fillStyle = useMemo(() => {
    const minP = (visualMin / PRICE_SLIDER_MAX) * 100;
    const maxP = (visualMax / PRICE_SLIDER_MAX) * 100;
    return { left: `${minP}%`, width: `${Math.max(maxP - minP, 0)}%` };
  }, [visualMin, visualMax]);

  const toggleBand = (id) => {
    const next = filters.bands.includes(id)
      ? filters.bands.filter((x) => x !== id)
      : [...filters.bands, id];
    onFiltersChange({ ...filters, bands: next });
  };

  const toggleBrand = (id) => {
    const next = filters.brands.includes(id)
      ? filters.brands.filter((x) => x !== id)
      : [...filters.brands, id];
    onFiltersChange({ ...filters, brands: next });
  };

  const toggleColor = (id) => {
    const next = filters.colors.includes(id)
      ? filters.colors.filter((x) => x !== id)
      : [...filters.colors, id];
    onFiltersChange({ ...filters, colors: next });
  };

  const onMinChange = (e) => {
    const v = Math.min(Number(e.target.value), visualMax - PRICE_GAP);
    onFiltersChange({ ...filters, priceMin: Math.max(0, v) });
  };

  const onMaxChange = (e) => {
    const v = Math.max(Number(e.target.value), visualMin + PRICE_GAP);
    onFiltersChange({ ...filters, priceMax: Math.min(PRICE_SLIDER_MAX, v) });
  };

  const visibleColors = colorsExpanded ? COLORS : COLORS.slice(0, 6);
  const visibleTags = tagsExpanded ? TAGS : TAGS.slice(0, 8);

  return (
    <aside className="nexa-filter-sidebar z-20 w-full lg:sticky lg:top-28 lg:self-start">
      <div className="nexa-filter-scroll rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] sm:p-7">
        {/* Product categories */}
        <section className="border-b border-neutral-100 pb-7">
          <SectionTitle>Product categories</SectionTitle>
          <ul className="mt-4 space-y-0">
            {visibleCategories.map((c) => {
              const active = filters.activeCategoryId === c.id;
              return (
                <li key={c.id} className="border-b border-neutral-100/90 last:border-0">
                  <button
                    type="button"
                    onClick={() =>
                      onFiltersChange({
                        ...filters,
                        activeCategoryId: active ? null : c.id,
                      })
                    }
                    className={
                      "nexa-btn-sidebar-row flex w-full items-center gap-2.5 py-3 pl-0.5 pr-1 text-left text-sm " +
                      (active
                        ? "font-semibold text-neutral-900"
                        : "font-medium text-neutral-600")
                    }
                  >
                    <FaChevronRight
                      className={
                        "h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform duration-200 " +
                        (active ? "rotate-90 text-neutral-900" : "group-hover:text-neutral-600")
                      }
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1 truncate">{c.label}</span>
                    <span className="shrink-0 text-xs tabular-nums text-neutral-400">
                      {String(c.count).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => setShowAllCategories((v) => !v)}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
          >
            {showAllCategories ? "Show less" : "See more"}
            <FaChevronDown
              className={
                "h-3.5 w-3.5 transition-transform duration-200 " +
                (showAllCategories ? "rotate-180" : "")
              }
            />
          </button>
        </section>

        {/* Price */}
        <section className="border-b border-neutral-100 py-7">
          <SectionTitle>Price range</SectionTitle>
          <p className="mt-1.5 text-sm text-neutral-500">
            Drag handles to set min and max.
          </p>
          <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50/70 p-3.5">
            <div className="nexa-dual-range">
              <div className="nexa-dual-range__track" aria-hidden />
              <div
                className="nexa-dual-range__fill"
                style={fillStyle}
                aria-hidden
              />
              <input
                type="range"
                min={0}
                max={PRICE_SLIDER_MAX}
                value={visualMin}
                onChange={onMinChange}
                className="nexa-range-min"
                aria-label="Minimum price"
              />
              <input
                type="range"
                min={0}
                max={PRICE_SLIDER_MAX}
                value={visualMax}
                onChange={onMaxChange}
                className="nexa-range-max"
                aria-label="Maximum price"
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">Min</p>
                <p className="mt-0.5 font-bold text-neutral-900">{formatINR(priceMin * USD_TO_INR)}</p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">Max</p>
                <p className="mt-0.5 font-bold text-neutral-900">{formatINR(priceMax * USD_TO_INR)}</p>
              </div>
            </div>
          </div>
          <ul className="mt-5 space-y-3">
            {PRICE_BANDS.map((b) => (
              <li key={b.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg py-1.5 pl-0.5 transition hover:bg-neutral-50">
                  <input
                    type="checkbox"
                    checked={filters.bands.includes(b.id)}
                    onChange={() => toggleBand(b.id)}
                    className={cb}
                  />
                  <span className="min-w-0 flex-1 text-sm text-neutral-700">
                    {b.label}
                  </span>
                  <span className="text-xs tabular-nums text-neutral-400">
                    ({b.count})
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        {/* Brands */}
        <section className="border-b border-neutral-100 py-7">
          <SectionTitle>Brands</SectionTitle>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
            Filter by manufacturer. Tap a popular brand or use the lists below.
          </p>

          <Subheading icon={FaStar} className="mt-6">
            Popular brands
          </Subheading>
          <div className="grid grid-cols-2 gap-3">
            {POPULAR_BRANDS.map((b) => {
              const on = filters.brands.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => toggleBrand(b.id)}
                  aria-pressed={on}
                  className={
                    "flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all duration-200 " +
                    (on
                      ? "border-neutral-900 bg-neutral-900 text-white shadow-md"
                      : "border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:border-neutral-300 hover:shadow-sm")
                  }
                >
                  <BrandLogo domain={b.domain} label={b.label} />
                  <span className="line-clamp-1 text-xs font-semibold">{b.label}</span>
                  <span
                    className={
                      "text-[11px] tabular-nums " +
                      (on ? "text-white/80" : "text-neutral-400")
                    }
                  >
                    {b.count} items
                  </span>
                </button>
              );
            })}
          </div>

          <Subheading icon={FaTag} className="mt-6">
            Budget
          </Subheading>
          <div className="space-y-0.5 rounded-xl border border-neutral-100 bg-[#FAFAFA] p-2">
            {BUDGET_BRANDS.map((b) => (
              <BrandCheckboxRow
                key={b.id}
                b={b}
                checked={filters.brands.includes(b.id)}
                onToggle={() => toggleBrand(b.id)}
                checkboxClass={cb}
              />
            ))}
          </div>

          <Subheading icon={FaGem} className="mt-6">
            Premium
          </Subheading>
          <div className="space-y-0.5 rounded-xl border border-neutral-100 bg-[#FAFAFA] p-2">
            {PREMIUM_BRANDS.map((b) => (
              <BrandCheckboxRow
                key={b.id}
                b={b}
                checked={filters.brands.includes(b.id)}
                onToggle={() => toggleBrand(b.id)}
                checkboxClass={cb}
              />
            ))}
          </div>

          {showAllBrands && (
            <div className="mt-3 space-y-0.5 rounded-xl border border-neutral-100 bg-white p-2 pr-1">
              {MORE_BRANDS.map((b) => (
                <BrandCheckboxRow
                  key={b.id}
                  b={b}
                  checked={filters.brands.includes(b.id)}
                  onToggle={() => toggleBrand(b.id)}
                  checkboxClass={cb}
                />
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowAllBrands((v) => !v)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 py-2.5 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            <FaPlus className="h-3.5 w-3.5 text-neutral-600" />
            {showAllBrands ? "Show fewer brands" : "Show all brands"}
          </button>
        </section>

        {/* Color */}
        <section className="border-b border-neutral-100 py-7">
          <SectionTitle>Color</SectionTitle>
          <div className="mt-4 grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-3">
            {visibleColors.map((c) => {
              const selected = filters.colors.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleColor(c.id)}
                  className="group flex flex-col items-center gap-2 rounded-lg py-1 transition hover:bg-neutral-50"
                >
                  <span
                    className={
                      "h-9 w-9 rounded-full border-2 shadow-inner transition duration-200 " +
                      (selected
                        ? "border-neutral-900 ring-2 ring-neutral-200"
                        : "border-white ring-1 ring-neutral-200 group-hover:ring-neutral-300")
                    }
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                  <span
                    className={
                      "max-w-full truncate text-xs " +
                      (c.darkText ? "text-neutral-800" : "text-neutral-600")
                    }
                  >
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setColorsExpanded((v) => !v)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
          >
            <FaPlus className="h-3.5 w-3.5" />
            {colorsExpanded ? "Fewer colors" : "More color options"}
          </button>
        </section>

        {/* Ratings */}
        <section className="border-b border-neutral-100 py-7">
          <SectionTitle>Customer rating</SectionTitle>
          <p className="mt-1.5 text-sm text-neutral-500">
            Show products rated at least:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <ToggleChip
                key={n}
                pressed={filters.minStars === n}
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    minStars: filters.minStars === n ? 0 : n,
                  })
                }
              >
                <span className="inline-flex items-center gap-1">
                  <FaStar className="h-3.5 w-3.5 text-amber-400" />
                  {n}+
                </span>
              </ToggleChip>
            ))}
          </div>
        </section>

        {/* Availability */}
        <section className="border-b border-neutral-100 py-7">
          <SectionTitle>Availability</SectionTitle>
          <ul className="mt-4 space-y-3">
            <li>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg py-1.5 pl-0.5 text-sm text-neutral-700 transition hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, inStockOnly: e.target.checked })
                  }
                  className={cb}
                />
                In stock only
              </label>
            </li>
            <li>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg py-1.5 pl-0.5 text-sm text-neutral-700 transition hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={filters.includeOutOfStock}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      includeOutOfStock: e.target.checked,
                    })
                  }
                  className={cb}
                />
                Include out of stock
              </label>
            </li>
          </ul>
        </section>

        {/* Best seller */}
        <section className="border-b border-neutral-100 py-7">
          <SectionTitle>Best seller & offers</SectionTitle>
          <p className="mt-1.5 text-sm text-neutral-500">
            Top picks and limited-time deals.
          </p>
          <ul className="mt-4 space-y-3">
            {BEST_SELLERS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="nexa-btn-sidebar-row flex w-full gap-3 rounded-xl border border-transparent p-2 text-left transition hover:border-neutral-200 hover:bg-neutral-50"
                >
                  <img
                    src={p.image}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-lg bg-neutral-100 object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900">
                      {p.title}
                    </p>
                    <div className="mt-1 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < p.rating
                              ? "h-3 w-3 text-amber-400"
                              : "h-3 w-3 text-neutral-300"
                          }
                        />
                      ))}
                      <span className="ml-1 text-xs text-neutral-400">
                        ({p.reviews})
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                      <span className="text-base font-bold text-neutral-900">
                        {formatCatalogPrice(p.price)}
                      </span>
                      {p.was != null && (
                        <span className="text-sm text-neutral-400 line-through">
                          {formatCatalogPrice(p.was)}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Tags */}
        <section className="pt-2">
          <SectionTitle>Product tags</SectionTitle>
          <div className="mt-4 flex flex-wrap gap-2">
            {visibleTags.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700"
              >
                {t}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setTagsExpanded((v) => !v)}
            className="mt-4 text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            {tagsExpanded ? "Show fewer tags" : "Show all tags"}
          </button>
        </section>
      </div>
    </aside>
  );
}
