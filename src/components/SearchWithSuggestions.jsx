import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getSearchSuggestions } from "../data/catalog";
import { formatCatalogPrice } from "../utils/currency";
import { NEXA_BLACK_PILL_SEARCH } from "../constants/nexaButtons";

/**
 * Pill search bar with nested black Search button (reference layout).
 * Live suggestions: product names + category shortcuts.
 */
export default function SearchWithSuggestions({
  variant = "header",
  className = "",
  inputId = "nexa-search-input",
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef(null);

  const { products, categories } = useMemo(
    () => getSearchSuggestions(q),
    [q]
  );

  const flatItems = useMemo(() => {
    const rows = [];
    categories.forEach((c) => {
      rows.push({ type: "category", key: `c-${c.id}`, data: c });
    });
    products.forEach((p) => {
      rows.push({ type: "product", key: `p-${p.id}`, data: p });
    });
    return rows;
  }, [categories, products]);

  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
        setHighlight(-1);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const goProduct = useCallback(
    (id) => {
      navigate(`/product/${id}`);
      setOpen(false);
      setQ("");
    },
    [navigate]
  );

  const goCategory = useCallback(
    (to) => {
      navigate(to);
      setOpen(false);
      setQ("");
    },
    [navigate]
  );

  const submitSearch = useCallback(() => {
    const s = q.trim();
    navigate(s ? `/shop/all?q=${encodeURIComponent(s)}` : "/shop/all");
    setOpen(false);
  }, [q, navigate]);

  const onKeyDown = (e) => {
    if (!open || flatItems.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        submitSearch();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && highlight >= 0) {
      e.preventDefault();
      const row = flatItems[highlight];
      if (row.type === "product") goProduct(row.data.id);
      else goCategory(row.data.to);
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  };

  const shell =
    variant === "hero"
      ? "nexa-search-shell nexa-search-shell--hero"
      : "nexa-search-shell";

  const inputClass =
    variant === "hero"
      ? "min-w-0 flex-1 bg-transparent py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-[15px]"
      : "min-w-0 flex-1 bg-transparent py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form
        className={shell}
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch();
        }}
      >
        <FaSearch
          className="nexa-search-shell__icon h-4 w-4 shrink-0 text-neutral-400"
          aria-hidden
        />
        <input
          id={inputId}
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setHighlight(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search for mobiles, laptops, headphones…"
          className={inputClass}
          autoComplete="off"
          aria-label="Search products"
          aria-expanded={open && flatItems.length > 0}
          aria-controls="nexa-search-dropdown"
        />
        <button type="submit" className={NEXA_BLACK_PILL_SEARCH + " nexa-search-shell__btn"}>
          Search
        </button>
      </form>

      {open && q.trim().length > 0 && flatItems.length > 0 && (
        <div
          id="nexa-search-dropdown"
          className="nexa-suggest-dropdown absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[120] overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.05]"
          role="listbox"
        >
          <p className="border-b border-neutral-100 px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Suggestions
          </p>
          <ul className="max-h-[min(70vh,22rem)] overflow-y-auto py-1">
            {flatItems.map((row, i) => {
              const active = highlight === i;
              if (row.type === "category") {
                const c = row.data;
                return (
                  <li key={row.key} role="option">
                    <button
                      type="button"
                      className={
                        "flex w-full items-center gap-3 px-4 py-2.5 text-left transition " +
                        (active
                          ? "bg-[color-mix(in_srgb,var(--nexa-accent)_12%,white)]"
                          : "hover:bg-neutral-50")
                      }
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => goCategory(c.to)}
                    >
                      <img
                        src={c.thumb}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-black/[0.06]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-neutral-900">
                          {c.label}
                        </p>
                        <p className="text-[11px] font-medium text-[var(--nexa-accent)]">
                          Category
                        </p>
                      </div>
                    </button>
                  </li>
                );
              }
              const p = row.data;
              return (
                <li key={row.key} role="option">
                  <button
                    type="button"
                    className={
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition " +
                      (active
                        ? "bg-[color-mix(in_srgb,var(--nexa-accent)_12%,white)]"
                        : "hover:bg-neutral-50")
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => goProduct(p.id)}
                  >
                    <img
                      src={p.image}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-lg bg-neutral-100 object-contain p-0.5 ring-1 ring-black/[0.06]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-neutral-900">
                        {p.title}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        {p.category}
                        {" · "}
                        <span className="font-semibold text-[var(--nexa-accent)]">
                          {formatCatalogPrice(p.price)}
                        </span>
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
