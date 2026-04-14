import { useMemo, useState, useEffect, useCallback } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FaChevronRight, FaHeart, FaHome, FaRegHeart } from "react-icons/fa";
import ActiveFiltersBar from "../components/ActiveFiltersBar";
import CatalogToolbar from "../components/CatalogToolbar";
import ProductCard from "../components/ProductCard";
import Sidebar, {
  ALL_BRAND_ROWS,
  COLORS,
  PRICE_BANDS,
  PRODUCT_CATEGORIES,
} from "../components/Sidebar";
import { useWishlist } from "../hooks/useWishlist";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import {
  applyCatalogFilters,
  INITIAL_CATALOG_FILTERS,
} from "../utils/catalogFilterApply";
import {
  BRAND_SLUG_TO_LABEL,
  PRODUCTS,
  filterProductsByBrandSlug,
  filterProductsByShopSlug,
} from "../data/catalog";
import { buildPageList } from "../utils/pagination";
import { useCart } from "../context/CartContext";
import {
  NEXA_BLACK_BUY_PRIMARY,
  NEXA_OUTLINE_CART_MATCH,
} from "../constants/nexaButtons";
import { formatCatalogPrice } from "../utils/currency";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

const PRODUCT_GRID_SHOP =
  "grid grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8";

const ITEMS_PER_PAGE = 24;

const CATEGORY_TITLES = {
  all: "All products",
  electronics: "Electronics",
  mobiles: "Mobiles",
  laptops: "Laptops",
  headphones: "Headphones",
  "smart-watches": "Smart Watches",
  accessories: "Accessories",
  gaming: "Gaming",
};

export default function ProductListing() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart: addLine } = useCart();
  const searchQuery = (searchParams.get("q") || "").trim();
  const brandParam = (searchParams.get("brand") || "").trim().toLowerCase();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [catalogFilters, setCatalogFilters] = useState(() => ({
    ...INITIAL_CATALOG_FILTERS,
    bands: [],
    brands: [],
    colors: [],
  }));

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { recentlyViewedIds, recordRecentlyViewed } = useRecentlyViewed();

  const getBrandLabel = useCallback(
    (id) => ALL_BRAND_ROWS.find((b) => b.id === id)?.label,
    []
  );

  const slug = (category || "all").toLowerCase();
  const categoryTitle =
    CATEGORY_TITLES[slug] || CATEGORY_TITLES.electronics;

  const brandLabel = brandParam ? BRAND_SLUG_TO_LABEL[brandParam] : "";
  const hasBrandFilter = Boolean(brandParam && brandLabel);
  const pageHeading = hasBrandFilter
    ? `${brandLabel} products`
    : slug === "all"
      ? "All products"
      : categoryTitle;

  const baseList = useMemo(() => {
    let list = filterProductsByShopSlug(PRODUCTS, slug);
    list = filterProductsByBrandSlug(list, brandParam);
    return list;
  }, [slug, brandParam]);

  const sortedCatalog = useMemo(() => {
    const list = [...baseList];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "popularity":
        return list.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
      default:
        // Default mix: latest launches + best sellers first.
        return list.sort((a, b) => {
          const aNew = a.badge === "new" || /^new$/i.test(String(a.tag ?? "").trim()) ? 1 : 0;
          const bNew = b.badge === "new" || /^new$/i.test(String(b.tag ?? "").trim()) ? 1 : 0;
          const aScore = aNew * 5000 + (a.reviews ?? 0) + (a.rating ?? 0) * 100;
          const bScore = bNew * 5000 + (b.reviews ?? 0) + (b.rating ?? 0) * 100;
          return bScore - aScore;
        });
    }
  }, [baseList, sortBy]);

  const filteredCatalog = useMemo(() => {
    let list = sortedCatalog;
    const q = searchQuery.toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.tag && p.tag.toLowerCase().includes(q))
      );
    }
    list = applyCatalogFilters(list, catalogFilters, getBrandLabel);
    return list;
  }, [sortedCatalog, searchQuery, catalogFilters, getBrandLabel]);

  const categoryLabelMap = useMemo(
    () => Object.fromEntries(PRODUCT_CATEGORIES.map((c) => [c.id, c.label])),
    []
  );
  const bandLabelMap = useMemo(
    () => Object.fromEntries(PRICE_BANDS.map((b) => [b.id, b.label])),
    []
  );

  const recentlyViewedProducts = useMemo(() => {
    const map = new Map(PRODUCTS.map((p) => [p.id, p]));
    return recentlyViewedIds.map((id) => map.get(id)).filter(Boolean);
  }, [recentlyViewedIds]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCatalog.length / ITEMS_PER_PAGE)
  );
  const safePage = Math.min(Math.max(1, page), totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredCatalog.slice(start, start + ITEMS_PER_PAGE);
  }, [safePage, filteredCatalog]);

  const pageNumbers = useMemo(
    () => buildPageList(safePage, totalPages),
    [safePage, totalPages]
  );

  useEffect(() => {
    if (quickViewProduct?.id != null) {
      recordRecentlyViewed(quickViewProduct.id);
    }
  }, [quickViewProduct, recordRecentlyViewed]);

  useEffect(() => {
    setPage(1);
  }, [slug, brandParam, searchQuery]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setQuickViewProduct(null);
    };
    if (!quickViewProduct) {
      document.body.style.overflow = "";
      return undefined;
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [quickViewProduct]);

  return (
    <div className="bg-[var(--nexa-surface)]/50 pb-20 pt-8 sm:pt-10">
      <div className={`${PAGE_WRAP} flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8 xl:gap-10`}>
        <div className="w-full shrink-0 lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px]">
          <Sidebar
            filters={catalogFilters}
            onFiltersChange={setCatalogFilters}
          />
        </div>

        <div className="min-w-0 flex-1 lg:min-w-0">
          <nav
            className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-neutral-500"
            aria-label="Breadcrumb"
          >
            <Link
              to="/home"
              className="inline-flex items-center gap-1 font-medium text-neutral-600 transition hover:text-neutral-900"
            >
              <FaHome className="h-3.5 w-3.5" aria-hidden />
              Home
            </Link>
            <FaChevronRight className="h-3 w-3 text-neutral-300" aria-hidden />
            {hasBrandFilter ? (
              <>
                <Link
                  to="/brands"
                  className="font-medium text-neutral-600 transition hover:text-neutral-900"
                >
                  Brands
                </Link>
                <FaChevronRight
                  className="h-3 w-3 text-neutral-300"
                  aria-hidden
                />
                <Link
                  to={`/brands/${brandParam}`}
                  className="font-semibold text-neutral-900 transition hover:text-[var(--nexa-accent)]"
                >
                  {brandLabel}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/shop/all"
                  className="font-medium text-neutral-600 transition hover:text-neutral-900"
                >
                  Shop
                </Link>
                <FaChevronRight
                  className="h-3 w-3 text-neutral-300"
                  aria-hidden
                />
                <span className="font-semibold text-neutral-900">
                  {categoryTitle}
                </span>
              </>
            )}
          </nav>

          <div className="mb-7 border-b border-neutral-200/90 pb-7">
            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              {pageHeading}
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
              {hasBrandFilter
                ? `Curated picks aligned with ${brandLabel}—refine further with filters on the left.`
                : "Browse the full catalog—use filters on the left to narrow by price, brand, and more."}
            </p>
          </div>

          <CatalogToolbar
            sortBy={sortBy}
            onSortChange={setSortBy}
            count={filteredCatalog.length}
            totalPages={totalPages}
            page={safePage}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <ActiveFiltersBar
            filters={catalogFilters}
            onFiltersChange={setCatalogFilters}
            categoryLabels={categoryLabelMap}
            bandLabels={bandLabelMap}
            brandLabel={getBrandLabel}
            colorLabel={(id) => COLORS.find((c) => c.id === id)?.label ?? id}
          />

          {recentlyViewedProducts.length >= 3 && (
            <section
              className="mb-8 rounded-xl border border-neutral-200/90 bg-white p-4 shadow-sm ring-1 ring-black/[0.04] sm:p-5"
              aria-label="Recently viewed"
            >
              <h2 className="text-sm font-bold text-neutral-900 sm:text-base">
                Recently viewed
              </h2>
              <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 rec-scroll">
                {recentlyViewedProducts.map((p) => (
                  <div
                    key={`rv-${p.id}`}
                    className="w-[min(16rem,calc(100vw-3rem))] shrink-0 snap-start sm:w-64"
                  >
                    <ProductCard
                      product={p}
                      onAddToCart={() => addLine(p.id, 1)}
                      onBuyNow={() => {
                        addLine(p.id, 1);
                        navigate("/cart");
                      }}
                      onQuickView={setQuickViewProduct}
                      wishlisted={isWishlisted(p.id)}
                      onWishlistToggle={() => toggleWishlist(p.id)}
                      detailTo={`/product/${p.id}`}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div
            className={
              viewMode === "list"
                ? "flex flex-col gap-4 sm:gap-5"
                : `${PRODUCT_GRID_SHOP} items-stretch`
            }
          >
            {pageItems.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                layout={viewMode === "list" ? "list" : "grid"}
                onAddToCart={() => addLine(p.id, 1)}
                onBuyNow={() => {
                  addLine(p.id, 1);
                  navigate("/cart");
                }}
                onQuickView={setQuickViewProduct}
                wishlisted={isWishlisted(p.id)}
                onWishlistToggle={() => toggleWishlist(p.id)}
                detailTo={`/product/${p.id}`}
                className={
                  viewMode === "list"
                    ? "transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)]"
                    : ""
                }
              />
            ))}
          </div>

          {pageItems.length === 0 && (
            <p className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-10 text-center text-sm font-medium text-neutral-600">
              No products match your filters. Try adjusting price or clear
              filters.
            </p>
          )}

          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
            aria-label="Product pagination"
          >
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((x) => Math.max(1, x - 1))}
              className="nexa-btn-surface rounded-full border border-solid border-neutral-200 bg-white px-4 py-2 text-sm font-medium !text-neutral-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Previous
            </button>
            {pageNumbers.map((item, i) =>
              item === "ellipsis" ? (
                <span
                  key={`e-${i}`}
                  className="px-2 text-sm text-neutral-400"
                  aria-hidden
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPage(item)}
                    className={
                    "min-w-[2.5rem] rounded-full border border-solid px-3 py-2 text-sm font-semibold " +
                    (safePage === item
                      ? "nexa-btn-surface-dark border-black !bg-black !text-white"
                      : "nexa-btn-surface border-neutral-200 bg-white !text-neutral-800")
                    }
                >
                  {item}
                </button>
              )
            )}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((x) => Math.min(totalPages, x + 1))}
              className="nexa-btn-surface rounded-full border border-solid border-neutral-200 bg-white px-4 py-2 text-sm font-medium !text-neutral-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Next
            </button>
          </nav>
        </div>
      </div>

      {quickViewProduct && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/50 px-4 pb-10 pt-16 sm:pt-24"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qv-title"
        >
          <button
            type="button"
            className="fixed inset-0 cursor-default border-0 bg-transparent p-0"
            aria-label="Close quick view"
            onClick={() => setQuickViewProduct(null)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl ring-1 ring-black/[0.06] sm:p-6">
            <button
              type="button"
              className="absolute right-14 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition duration-300 hover:bg-neutral-50"
              onClick={() => toggleWishlist(quickViewProduct.id)}
              aria-label={
                isWishlisted(quickViewProduct.id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              aria-pressed={isWishlisted(quickViewProduct.id)}
            >
              {isWishlisted(quickViewProduct.id) ? (
                <FaHeart className="h-4 w-4 text-[#FF4D4D]" aria-hidden />
              ) : (
                <FaRegHeart className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg font-semibold leading-none text-neutral-600 transition duration-300 hover:bg-neutral-50"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={quickViewProduct.image}
              alt=""
              className="mt-2 aspect-square w-full rounded-xl bg-[#F0F0F0] object-cover"
            />
            <h2
              id="qv-title"
              className="mt-4 text-lg font-bold leading-snug text-neutral-900"
            >
              {quickViewProduct.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <p className="text-2xl font-bold text-neutral-900">
                {formatCatalogPrice(quickViewProduct.price)}
              </p>
              {quickViewProduct.compareAtPrice != null &&
                quickViewProduct.compareAtPrice > quickViewProduct.price && (
                  <span className="text-sm font-medium text-neutral-400 line-through">
                    {formatCatalogPrice(quickViewProduct.compareAtPrice)}
                  </span>
                )}
            </div>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <button
                type="button"
                className={NEXA_OUTLINE_CART_MATCH}
                onClick={() => {
                  addLine(quickViewProduct.id, 1);
                  setQuickViewProduct(null);
                }}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className={NEXA_BLACK_BUY_PRIMARY + " flex-1 basis-0"}
                onClick={() => {
                  addLine(quickViewProduct.id, 1);
                  setQuickViewProduct(null);
                  navigate("/cart");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
