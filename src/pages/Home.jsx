import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaChevronRight,
  FaFacebookF,
  FaLinkedinIn,
  FaHome,
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaPlug,
  FaGamepad,
  FaTruck,
  FaLock,
  FaUndo,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import ActiveFiltersBar from "../components/ActiveFiltersBar";
import BestSellersCarousel from "../components/BestSellersCarousel";
import CatalogToolbar from "../components/CatalogToolbar";
import ProductCard from "../components/ProductCard";
import PromoBanner from "../components/PromoBanner";
import Sidebar, {
  ALL_BRAND_ROWS,
  COLORS,
  PRICE_BANDS,
  PRODUCT_CATEGORIES,
} from "../components/Sidebar";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useWishlist } from "../hooks/useWishlist";
import {
  applyCatalogFilters,
  INITIAL_CATALOG_FILTERS,
} from "../utils/catalogFilterApply";
import {
  NEXA_BLACK_BUY_PRIMARY,
  NEXA_BLACK_PILL_SEARCH,
  NEXA_OUTLINE_CART_MATCH,
} from "../constants/nexaButtons";
import {
  formatCatalogPrice,
  formatINR,
  inrFromCatalog,
  USD_TO_INR,
} from "../utils/currency";

const HERO_IMG =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2400&q=85";

const CTA_BG =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80";

const AVATAR_IMG =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&q=80";

const ITEMS_PER_PAGE = 10;

/** Wider than max-w-7xl — centered, full-width up to ~1472px */
const PAGE_CONTAINER =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=2`;

const SEARCH_SUGGESTIONS = [
  { label: "iPhone", value: "iPhone" },
  { label: "Headphones", value: "Headphones" },
  {
    label: "Laptop under ₹50,000",
    value: "Laptop",
    preset: "laptop-under-50k",
  },
];

const PRODUCTS = [
  {
    id: 1,
    title: "Wireless Noise-Cancel Headphones",
    price: 199.99,
    compareAtPrice: 249.99,
    image: pexels(3780681),
    category: "Audio",
    tag: "Music",
    rating: 5.0,
    reviews: 1200,
  },
  {
    id: 2,
    title: "4K Smart LED Television",
    price: 849.0,
    compareAtPrice: 999.0,
    image: pexels(4342090),
    category: "TV",
    tag: "Home",
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 3,
    title: "Mirrorless Camera Kit",
    price: 1249.5,
    compareAtPrice: 1399.0,
    image: pexels(274924),
    category: "Cameras",
    tag: "Other",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 4,
    title: "Portable Bluetooth Speaker",
    price: 79.95,
    compareAtPrice: 99.99,
    image: pexels(1647451),
    category: "Speakers",
    tag: "Music",
    rating: 4.5,
    reviews: 256,
  },
  {
    id: 5,
    title: "Ergonomic Laptop Stand",
    price: 49.0,
    compareAtPrice: 69.0,
    image: pexels(1229861),
    category: "Accessories",
    tag: "Home",
    rating: 4.7,
    reviews: 412,
  },
  {
    id: 6,
    title: "Mechanical Gaming Keyboard",
    price: 129.0,
    compareAtPrice: 159.0,
    image: pexels(1779487),
    category: "Accessories",
    tag: "Other",
    rating: 4.4,
    reviews: 167,
  },
  {
    id: 7,
    title: "Smart Watch Pro",
    price: 299.0,
    compareAtPrice: 349.0,
    image: pexels(437037),
    category: "Wearables",
    tag: "Phone",
    rating: 4.6,
    reviews: 521,
  },
  {
    id: 8,
    title: "USB-C Hub 7-in-1",
    price: 39.99,
    compareAtPrice: 49.99,
    image: pexels(3861969),
    category: "Accessories",
    tag: "Storage",
    rating: 4.3,
    reviews: 98,
  },
  {
    id: 9,
    title: "Smart Soundbar Mini",
    price: 29.9,
    compareAtPrice: 39.99,
    image: pexels(5082579),
    category: "Audio",
    tag: "Music",
    rating: 5.0,
    reviews: 1200,
  },
  {
    id: 10,
    title: "Wireless Earbuds Pro",
    price: 119.0,
    compareAtPrice: 159.0,
    image: pexels(3394650),
    category: "Audio",
    tag: "Music",
    rating: 4.7,
    reviews: 890,
  },
  {
    id: 11,
    title: "Ultrawide USB-C Monitor",
    price: 449.0,
    compareAtPrice: 529.0,
    image: pexels(2882521),
    category: "TV",
    tag: "Home",
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 12,
    title: "4K Action Camera",
    price: 279.0,
    compareAtPrice: 329.0,
    image: pexels(320617),
    category: "Cameras",
    tag: "Other",
    rating: 4.5,
    reviews: 112,
  },
  {
    id: 13,
    title: "Studio Monitor Pair",
    price: 329.0,
    compareAtPrice: 399.0,
    image: pexels(1571458),
    category: "Audio",
    tag: "Music",
    rating: 4.8,
    reviews: 640,
  },
  {
    id: 14,
    title: "Compact Photo Printer",
    price: 89.0,
    compareAtPrice: 119.0,
    image: pexels(767648),
    category: "Accessories",
    tag: "Home",
    rating: 4.2,
    reviews: 54,
  },
  {
    id: 15,
    title: "Mesh Wi-Fi Router",
    price: 149.0,
    compareAtPrice: 189.0,
    image: pexels(248533),
    category: "Networking",
    tag: "Home",
    rating: 4.4,
    reviews: 312,
  },
  {
    id: 16,
    title: "Portable SSD 1TB",
    price: 109.0,
    compareAtPrice: 139.0,
    image: pexels(1714208),
    category: "Storage",
    tag: "Storage",
    rating: 4.8,
    reviews: 441,
  },
  {
    id: 17,
    title: "Noise-Cancel Earbuds Lite",
    price: 59.0,
    compareAtPrice: 79.0,
    image: pexels(2399840),
    category: "Audio",
    tag: "Music",
    rating: 4.3,
    reviews: 678,
  },
  {
    id: 18,
    title: "Streaming Stick 4K",
    price: 39.0,
    compareAtPrice: 54.99,
    image: pexels(265667),
    category: "TV",
    tag: "Home",
    rating: 4.5,
    reviews: 920,
  },
  {
    id: 19,
    title: "RGB Gaming Mouse",
    price: 49.0,
    compareAtPrice: 69.0,
    image: pexels(1779487),
    category: "Gaming",
    tag: "Other",
    rating: 4.6,
    reviews: 334,
  },
  {
    id: 20,
    title: "Bluetooth Turntable",
    price: 179.0,
    compareAtPrice: 229.0,
    image: pexels(164821),
    category: "Audio",
    tag: "Music",
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 21,
    title: "Car Dash Cam HD",
    price: 89.0,
    compareAtPrice: 119.0,
    image: pexels(274924),
    category: "Cameras",
    tag: "Other",
    rating: 4.4,
    reviews: 267,
  },
];

/** 2 → 3 → 4 → 5 cols; balanced gaps for dense desktop rows (Top Deals & other full-width rows) */
const PRODUCT_GRID =
  "grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-7 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8 2xl:grid-cols-5";

/**
 * All Products (beside sidebar): same breakpoints as Top Deals until lg, then auto-fit
 * columns with ~Top-Deals-sized tracks so card + button row match full-width sections.
 */
const PRODUCT_GRID_SHOP =
  "grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-7 md:grid-cols-3 md:gap-x-5 lg:gap-x-6 lg:gap-y-8 lg:[grid-template-columns:repeat(auto-fill,minmax(min(100%,17rem),1fr))]";

const CATEGORY_ITEMS = [
  {
    id: "mobiles",
    label: "Mobiles",
    href: "#shop",
    icon: FaMobileAlt,
    image: pexels(437037),
  },
  {
    id: "laptops",
    label: "Laptops",
    href: "#shop",
    icon: FaLaptop,
    image: pexels(1229861),
  },
  {
    id: "audio",
    label: "Audio",
    href: "#shop",
    icon: FaHeadphones,
    image: pexels(3780681),
  },
  {
    id: "accessories",
    label: "Accessories",
    href: "#shop",
    icon: FaPlug,
    image: pexels(3861969),
  },
  {
    id: "gaming",
    label: "Gaming",
    href: "#shop",
    icon: FaGamepad,
    image: pexels(1779487),
  },
];

const NAV_UNDERLINE =
  "relative inline-block py-2 text-sm !text-white/90 transition-all duration-300 ease-out after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:!text-white hover:after:scale-x-100 hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.3)]";

function navLinkClass(active) {
  return (
    NAV_UNDERLINE +
    (active ? " font-bold !text-white after:!scale-x-100" : " font-medium")
  );
}

function buildPageList(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push("ellipsis");
    out.push(p);
    prev = p;
  }
  return out;
}

function hashToNav(h) {
  const key = (h || "").replace(/^#/, "");
  if (key === "brand") return "brands";
  if (key === "shop") return "shop";
  if (key === "deals-of-the-day" || key === "deals") return "deals";
  // Hero sections + category discovery grid: keep nav minimal (no duplicate “Categories”)
  if (
    key === "browse-categories" ||
    key === "best-sellers" ||
    key === "new-arrivals" ||
    key === "categories"
  ) {
    return "shop";
  }
  return "shop";
}

function SectionHeading({ title, subtitle, action, viewAllHref }) {
  const viewAll =
    action !== undefined
      ? action
      : viewAllHref != null ? (
          <a
            href={viewAllHref}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-black/[0.04] transition duration-500 ease-out hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
          >
            <span>View All</span>
            <span className="text-base font-bold leading-none" aria-hidden>
              →
            </span>
          </a>
        ) : null;

  return (
    <div className="mb-8 flex flex-col gap-5 border-b border-neutral-200/80 pb-8 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="min-w-0 space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {viewAll}
    </div>
  );
}

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [navSearch, setNavSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [catalogPreset, setCatalogPreset] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const searchBoxRef = useRef(null);
  const [ctaEmail, setCtaEmail] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [activeNav, setActiveNav] = useState("shop");
  const [catalogFilters, setCatalogFilters] = useState(() => ({
    ...INITIAL_CATALOG_FILTERS,
    bands: [],
    brands: [],
    colors: [],
  }));
  const [viewMode, setViewMode] = useState("grid");

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { recentlyViewedIds, recordRecentlyViewed } = useRecentlyViewed();

  const getBrandLabel = useCallback(
    (id) => ALL_BRAND_ROWS.find((b) => b.id === id)?.label,
    []
  );

  const sortedCatalog = useMemo(() => {
    const list = [...PRODUCTS];
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
        return list;
    }
  }, [sortBy]);

  const filteredCatalog = useMemo(() => {
    let list = sortedCatalog;
    if (catalogPreset === "laptop-under-50k") {
      list = list.filter(
        (p) =>
          inrFromCatalog(p.price) <= 50000 &&
          /\b(laptop|macbook|chromebook|notebook)\b/i.test(p.title)
      );
    }
    const q = searchQuery.trim().toLowerCase();
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
  }, [sortedCatalog, searchQuery, catalogPreset, catalogFilters, getBrandLabel]);

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

  const bestSellers = useMemo(
    () => [...PRODUCTS].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 5),
    []
  );

  const newArrivals = useMemo(() => PRODUCTS.slice(-5), []);

  const dealsOfDay = useMemo(
    () =>
      PRODUCTS.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price).slice(
        0,
        15
      ),
    []
  );

  useEffect(() => {
    setPage(1);
  }, [sortBy, searchQuery, catalogPreset, catalogFilters]);

  useEffect(() => {
    if (quickViewProduct?.id != null) {
      recordRecentlyViewed(quickViewProduct.id);
    }
  }, [quickViewProduct, recordRecentlyViewed]);

  useEffect(() => {
    const onDoc = (e) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

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

  useEffect(() => {
    setActiveNav(hashToNav(typeof window !== "undefined" ? window.location.hash : ""));
    const onHash = () => setActiveNav(hashToNav(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const addToCart = () => setCartCount((c) => c + 1);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCatalog.length / ITEMS_PER_PAGE)
  );
  const pageItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredCatalog.slice(start, start + ITEMS_PER_PAGE);
  }, [page, filteredCatalog]);

  const visibleSuggestions = useMemo(() => {
    const q = navSearch.trim().toLowerCase();
    if (!q) return SEARCH_SUGGESTIONS;
    return SEARCH_SUGGESTIONS.filter((s) =>
      s.label.toLowerCase().includes(q)
    );
  }, [navSearch]);

  const pageNumbers = useMemo(
    () => buildPageList(page, totalPages),
    [page, totalPages]
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-neutral-900">
      <section className="relative overflow-hidden">
        <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
          <div className={`${PAGE_CONTAINER} space-y-3 sm:space-y-4`}>
            <div className="flex items-center justify-between gap-3">
              <a
                href="/"
                className="group relative inline-block shrink-0 text-lg font-bold tracking-tight !text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:!text-white hover:after:scale-x-100 hover:drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]"
              >
                Nexa Electronics
              </a>

              <nav
                className="hidden min-w-0 flex-1 items-center justify-center gap-6 text-xs md:flex sm:gap-10 sm:text-sm lg:gap-12"
                aria-label="Primary"
              >
                <a
                  href="#shop"
                  onClick={() => setActiveNav("shop")}
                  className={navLinkClass(activeNav === "shop")}
                >
                  Shop
                </a>
                <a
                  href="#deals-of-the-day"
                  onClick={() => setActiveNav("deals")}
                  className={navLinkClass(activeNav === "deals")}
                >
                  Deals
                </a>
                <a
                  href="#brand"
                  onClick={() => setActiveNav("brands")}
                  className={navLinkClass(activeNav === "brands")}
                >
                  Brands
                </a>
              </nav>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  className="nexa-btn-ghost-light relative flex h-11 w-11 items-center justify-center rounded-full !text-white md:hidden"
                  aria-label="Search"
                >
                  <FaSearch className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="nexa-btn-ghost-light group relative flex h-11 w-11 items-center justify-center rounded-full !text-white sm:h-12 sm:w-12"
                  aria-label={`Shopping bag, ${cartCount} items`}
                >
                  <FaShoppingBag className="h-5 w-5 transition-transform duration-500 ease-out group-hover:scale-105 sm:h-6 sm:w-6" />
                  {cartCount > 0 && (
                    <span
                      className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white/30"
                      style={{ backgroundColor: "#FF4D4D" }}
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  className="nexa-btn-ghost-light ml-0.5 hidden h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:block"
                  aria-label="Account"
                >
                  <img
                    src={AVATAR_IMG}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              </div>
            </div>

            <form
              ref={searchBoxRef}
              className="relative z-[60] mx-auto w-full max-w-2xl md:max-w-3xl"
              onSubmit={(e) => {
                e.preventDefault();
                setCatalogPreset(null);
                setSearchQuery(navSearch.trim());
                setSearchFocused(false);
                document.getElementById("shop")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <div className="flex h-11 w-full items-center gap-2 overflow-hidden rounded-full border border-white/25 bg-black/25 pl-4 pr-2 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md sm:h-12">
                <FaSearch className="h-4 w-4 shrink-0 text-white/70" aria-hidden />
                <input
                  type="search"
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search for mobiles, laptops, headphones…"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/45 sm:text-[15px]"
                  aria-label="Search products"
                  aria-expanded={searchFocused}
                  aria-controls="search-suggestions"
                  autoComplete="off"
                />
                <button type="submit" className={NEXA_BLACK_PILL_SEARCH}>
                  Search
                </button>
              </div>
              {searchFocused && visibleSuggestions.length > 0 && (
                <div
                  id="search-suggestions"
                  className="absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-white/15 bg-black/88 shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur-xl"
                  role="listbox"
                >
                  <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                    Suggestions
                  </p>
                  <ul className="pb-2">
                    {visibleSuggestions.map((s) => (
                      <li key={s.label} role="option">
                        <button
                          type="button"
                          className="flex w-full px-4 py-2.5 text-left text-sm font-medium text-white transition duration-200 hover:bg-white/10"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            if (s.preset === "laptop-under-50k") {
                              setCatalogPreset("laptop-under-50k");
                              setSearchQuery("");
                              setNavSearch("");
                            } else {
                              setCatalogPreset(null);
                              setNavSearch(s.value);
                              setSearchQuery(s.value);
                            }
                            setSearchFocused(false);
                            document.getElementById("shop")?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                        >
                          {s.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </header>

        {/* Hero — headline + CTAs, product-forward background */}
        <div className="relative isolate mx-auto w-full max-w-[1920px] overflow-hidden">
          <div className="relative min-h-[min(72vh,760px)] w-full sm:min-h-[min(76vh,820px)] lg:min-h-[min(78vh,880px)]">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${HERO_IMG})`,
                transform: "scale(1.02)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_90%_at_50%_45%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.72)_100%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/60"
              aria-hidden
            />

            <div className="relative flex min-h-[inherit] flex-col justify-center px-4 pb-28 pt-36 sm:px-8 sm:pb-32 sm:pt-40 lg:px-14 lg:pb-36 lg:pt-44">
              <div className="mx-auto w-full max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                  New season · Curated tech
                </p>
                <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl">
                  Nexa Electronics
                </h1>
                <p className="mt-5 text-xl font-semibold leading-snug tracking-tight text-white/95 sm:text-2xl lg:text-[1.65rem]">
                  Premium Electronics for Modern Living
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0 lg:max-w-lg">
                  Phones, displays, audio, and accessories—chosen for performance
                  and the calm, considered look you expect from Nexa.
                </p>
                <div className="mt-10 flex flex-col items-stretch gap-3.5 sm:mt-11 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
                  <a
                    href="#shop"
                    className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-black bg-black px-10 py-3.5 text-sm font-semibold text-white shadow-md shadow-black/25 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/35"
                  >
                    Shop Now
                  </a>
                  <a
                    href="#deals-of-the-day"
                    className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/80 bg-white/[0.08] px-10 py-3.5 text-sm font-semibold !text-white backdrop-blur-md transition duration-500 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/[0.14] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
                  >
                    Explore Deals
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div
          className={`relative z-10 -mt-10 mb-10 w-[calc(100%-1.5rem)] rounded-t-3xl border border-neutral-100 bg-white px-4 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.03] sm:-mt-12 sm:mb-12 sm:w-full sm:rounded-t-[1.75rem] sm:px-8 sm:py-7 lg:px-10 ${PAGE_CONTAINER}`}
        >
          <ul className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-0 sm:divide-x sm:divide-neutral-200">
            <li className="flex items-center justify-center gap-3 px-4 sm:justify-start sm:py-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 ring-1 ring-black/[0.05]">
                <FaTruck className="h-4 w-4" aria-hidden />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-neutral-900">Free Delivery</p>
                <p className="text-xs text-neutral-500">
                  On orders over {formatINR(50 * USD_TO_INR)}
                </p>
              </div>
            </li>
            <li className="flex items-center justify-center gap-3 px-4 sm:justify-start sm:py-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 ring-1 ring-black/[0.05]">
                <FaLock className="h-4 w-4" aria-hidden />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-neutral-900">Secure Payment</p>
                <p className="text-xs text-neutral-500">Encrypted checkout</p>
              </div>
            </li>
            <li className="flex items-center justify-center gap-3 px-4 sm:justify-start sm:border-0 sm:py-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 ring-1 ring-black/[0.05]">
                <FaUndo className="h-4 w-4" aria-hidden />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-neutral-900">Easy Returns</p>
                <p className="text-xs text-neutral-500">30-day policy</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Category grid */}
      <section
        id="browse-categories"
        className={`${PAGE_CONTAINER} scroll-mt-28 pb-12 sm:pb-14`}
      >
        <div className="mb-8 border-b border-neutral-200/80 pb-8 text-center sm:mb-10 sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Shop by category
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            Jump into the range that fits your setup—each tile opens the full shop.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {CATEGORY_ITEMS.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.id}
                href={c.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-md shadow-black/[0.06] ring-1 ring-black/[0.05] transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/[0.1]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F3F3]">
                  <img
                    src={c.image}
                    alt=""
                    className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-85 transition duration-500 group-hover:opacity-95" />
                  <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2.5 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 transition duration-500 group-hover:bg-white/25">
                      <Icon className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold tracking-tight">{c.label}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <main
        className={`${PAGE_CONTAINER} space-y-20 pb-16 sm:space-y-24 md:space-y-28`}
      >
        {/* Best Sellers — horizontal carousel */}
        <section id="best-sellers" className="scroll-mt-28">
          <SectionHeading
            title="Best Sellers"
            subtitle="Top-rated gear customers buy again and again—proven by reviews and restocks."
            viewAllHref="#shop"
          />
          <BestSellersCarousel
            products={bestSellers}
            onAddToCart={addToCart}
            onBuyNow={() => addToCart()}
            onQuickView={setQuickViewProduct}
            isWishlisted={isWishlisted}
            onWishlistToggle={toggleWishlist}
          />
        </section>

        <div className={`${PAGE_CONTAINER} -mt-4 pb-4`}>
          <PromoBanner
            title="Member perks this week"
            subtitle="Extra savings on audio and accessories when you bundle."
            href="#deals-of-the-day"
          />
        </div>

        {/* New Arrivals */}
        <section id="new-arrivals" className="scroll-mt-28">
          <SectionHeading
            title="New Arrivals"
            subtitle="Fresh drops across audio, wearables, and desk setups—updated regularly."
            viewAllHref="#shop"
          />
          <div className={`${PRODUCT_GRID} items-stretch`}>
            {newArrivals.map((p) => (
              <ProductCard
                key={`new-${p.id}`}
                product={p}
                onAddToCart={addToCart}
                onBuyNow={() => addToCart()}
                onQuickView={setQuickViewProduct}
                wishlisted={isWishlisted(p.id)}
                onWishlistToggle={() => toggleWishlist(p.id)}
              />
            ))}
          </div>
        </section>

        <div className={`${PAGE_CONTAINER} -mt-4 pb-4`}>
          <PromoBanner
            title="Free delivery over ₹4,000"
            subtitle="Checkout securely—same Nexa quality, straight to your door."
            href="#shop"
          />
        </div>

        {/* Deals of the Day */}
        <section id="deals-of-the-day" className="scroll-mt-28">
          <SectionHeading
            title="Top Deals Today"
            subtitle="Limited-time savings on popular picks—while supplies last."
            viewAllHref="#shop"
          />
          <div className={`${PRODUCT_GRID} items-stretch`}>
            {dealsOfDay.map((p) => (
              <ProductCard
                key={`deal-${p.id}`}
                product={p}
                onAddToCart={addToCart}
                onBuyNow={() => addToCart()}
                onQuickView={setQuickViewProduct}
                wishlisted={isWishlisted(p.id)}
                onWishlistToggle={() => toggleWishlist(p.id)}
              />
            ))}
          </div>
        </section>

        {/* Catalog + sidebar */}
        <div
          id="shop"
          className="flex scroll-mt-28 flex-col gap-8 border-t border-neutral-200 pt-14 lg:flex-row lg:items-start lg:gap-8 xl:gap-10"
        >
          <div
            id="categories"
            className="w-full shrink-0 scroll-mt-28 lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px]"
          >
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
              <a
                href="/"
                className="inline-flex items-center gap-1 font-medium text-neutral-600 transition hover:text-neutral-900"
              >
                <FaHome className="h-3.5 w-3.5" aria-hidden />
                Home
              </a>
              <FaChevronRight className="h-3 w-3 text-neutral-300" aria-hidden />
              <a
                href="#shop"
                className="font-medium text-neutral-600 transition hover:text-neutral-900"
              >
                Shop
              </a>
              <FaChevronRight className="h-3 w-3 text-neutral-300" aria-hidden />
              <span className="font-semibold text-neutral-900">Electronics</span>
            </nav>

            <div id="brand" className="mb-7 border-b border-neutral-200/90 pb-7 scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
                All products
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Browse the full catalog—use filters on the left to narrow by price,
                brand, and more.
              </p>
            </div>

            <CatalogToolbar
              sortBy={sortBy}
              onSortChange={setSortBy}
              count={filteredCatalog.length}
              totalPages={totalPages}
              page={page}
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

            {recentlyViewedProducts.length > 0 && (
              <section
                className="mb-8 rounded-xl border border-neutral-200/90 bg-white p-4 shadow-sm ring-1 ring-black/[0.04] sm:p-5"
                aria-label="Recently viewed"
              >
                <h3 className="text-sm font-bold text-neutral-900 sm:text-base">
                  Recently viewed
                </h3>
                <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 rec-scroll">
                  {recentlyViewedProducts.map((p) => (
                    <div
                      key={`rv-${p.id}`}
                      className="w-[min(16rem,calc(100vw-3rem))] shrink-0 snap-start sm:w-64"
                    >
                      <ProductCard
                        product={p}
                        onAddToCart={addToCart}
                        onBuyNow={() => addToCart()}
                        onQuickView={setQuickViewProduct}
                        wishlisted={isWishlisted(p.id)}
                        onWishlistToggle={() => toggleWishlist(p.id)}
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
                  : `${PRODUCT_GRID_SHOP} items-stretch gap-y-6 sm:gap-y-7`
              }
            >
              {pageItems.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  layout={viewMode === "list" ? "list" : "grid"}
                  onAddToCart={addToCart}
                  onBuyNow={() => addToCart()}
                  onQuickView={setQuickViewProduct}
                  wishlisted={isWishlisted(p.id)}
                  onWishlistToggle={() => toggleWishlist(p.id)}
                  className={
                    viewMode === "list"
                      ? "transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)]"
                      : ""
                  }
                />
              ))}
            </div>

            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
              aria-label="Product pagination"
            >
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                      (page === item
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
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="nexa-btn-surface rounded-full border border-solid border-neutral-200 bg-white px-4 py-2 text-sm font-medium !text-neutral-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </main>

      <section
        id="newsletter"
        className={`${PAGE_CONTAINER} pb-16`}
      >
        <div className="relative overflow-hidden rounded-[1.25rem] bg-[#1a1a1a] shadow-xl sm:rounded-[1.5rem]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${CTA_BG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 via-neutral-900/92 to-black/95" />
          <div className="relative grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:items-start lg:gap-14 lg:px-12 lg:py-14">
            <div className="min-w-0">
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:max-w-xl">
                Ready to Get Our New Stuff?
              </h2>
              <form
                className="mt-8 max-w-lg"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex h-12 w-full max-w-lg items-center gap-2 overflow-hidden rounded-full border border-neutral-300 bg-white pl-4 pr-1.5 shadow-md">
                  <input
                    type="email"
                    value={ctaEmail}
                    onChange={(e) => setCtaEmail(e.target.value)}
                    placeholder="Your Email"
                    className="min-w-0 flex-1 bg-transparent py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                  <button type="submit" className={NEXA_BLACK_PILL_SEARCH}>
                    Send
                  </button>
                </div>
              </form>
            </div>
            <div className="min-w-0 lg:pt-1">
              <p className="text-lg font-semibold text-white sm:text-xl">
                Nexa for Homes and Needs
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
                We listen to your needs, identify the best approach, and help you
                build a home setup with reliable electronics and smart devices
                that fit how you live and work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer id="support" className="border-t border-neutral-200 bg-white">
        <div className={`${PAGE_CONTAINER} py-12`}>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-lg font-bold text-black">Nexa Electronics</p>
              <p className="mt-2 text-sm text-neutral-500">
                Your destination for quality tech and accessories.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-black">About</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li>
                  <a href="#blog" className="!text-neutral-600 no-underline hover:!text-black">
                    Blog
                  </a>
                </li>
                <li>
                  <span className="text-neutral-600">Meet The Team</span>
                </li>
                <li>
                  <a href="#support" className="!text-neutral-600 no-underline hover:!text-black">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Support</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li>
                  <a href="#support" className="!text-neutral-600 no-underline hover:!text-black">
                    Contact Us
                  </a>
                </li>
                <li>
                  <span className="text-neutral-600">Shipping</span>
                </li>
                <li>
                  <span className="text-neutral-600">Return</span>
                </li>
                <li>
                  <span className="text-neutral-600">FAQ</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500">Social Media</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://x.com"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-sm ring-1 ring-black transition hover:bg-neutral-900"
                  aria-label="X"
                >
                  <FaXTwitter className="h-5 w-5 fill-current text-white" />
                </a>
                <a
                  href="https://facebook.com"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-sm ring-1 ring-black transition hover:bg-neutral-900"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="h-[18px] w-[18px] fill-current text-white" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-sm ring-1 ring-black transition hover:bg-neutral-900"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="h-[18px] w-[18px] fill-current text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-sm ring-1 ring-black transition hover:bg-neutral-900"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5 fill-current text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-200 bg-[#F5F5F5]">
          <div className={`${PAGE_CONTAINER} flex flex-col items-center justify-between gap-4 py-5 text-xs text-neutral-500 sm:flex-row`}>
            <p className="!text-neutral-500">
              Copyright © {new Date().getFullYear()} Nexa Electronics. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#terms"
                className="!text-neutral-500 no-underline hover:!text-neutral-800"
              >
                Terms of Service
              </a>
              <a
                href="#privacy"
                className="!text-neutral-500 no-underline hover:!text-neutral-800"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div id="blog" className="sr-only">
          Blog and updates from Nexa Electronics.
        </div>
        <div id="terms" className="sr-only" />
        <div id="privacy" className="sr-only" />
      </footer>

      {quickViewProduct && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/50 px-4 pb-10 pt-16 sm:pt-24"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
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
                <FaRegHeart className="h-4 w-4" aria-hidden />
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
              id="quick-view-title"
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
                  addToCart();
                  setQuickViewProduct(null);
                }}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className={NEXA_BLACK_BUY_PRIMARY + " flex-1 basis-0"}
                onClick={() => {
                  addToCart();
                  setQuickViewProduct(null);
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
