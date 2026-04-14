import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
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
import HomeBelowFold from "../components/home/HomeBelowFold";
import SiteFooter from "../components/SiteFooter";
import SearchWithSuggestions from "../components/SearchWithSuggestions";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useWishlist } from "../hooks/useWishlist";
import {
  NEXA_BLACK_BUY_PRIMARY,
  NEXA_OUTLINE_CART_MATCH,
} from "../constants/nexaButtons";
import { formatCatalogPrice, formatINR, USD_TO_INR } from "../utils/currency";
import { HOME_CATEGORY_SHOP_LINKS } from "../data/catalog";
import { useCart } from "../context/CartContext";

const HERO_IMG =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2400&q=85";

const AVATAR_IMG =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&q=80";

const PAGE_CONTAINER =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

const CATEGORY_ITEMS = [
  {
    id: "mobiles",
    label: "Mobiles",
    icon: FaMobileAlt,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "laptops",
    label: "Laptops",
    icon: FaLaptop,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "audio",
    label: "Audio",
    icon: FaHeadphones,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "accessories",
    label: "Accessories",
    icon: FaPlug,
    image:
      "https://images.unsplash.com/photo-1625948515291-4a4e2f6d0c1?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: FaGamepad,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&auto=format&fit=crop",
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

function hashToNav(h) {
  const key = (h || "").replace(/^#/, "");
  if (key === "brand") return "brands";
  if (key === "shop" || key === "browse-categories") return "shop";
  if (key === "deals-banner" || key === "deals-of-the-day" || key === "deals")
    return "deals";
  return "shop";
}

export default function Home() {
  const navigate = useNavigate();
  const { cartCount, addToCart: addLine } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeNav, setActiveNav] = useState(() =>
    typeof window !== "undefined" ? hashToNav(window.location.hash) : "shop"
  );

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { recordRecentlyViewed } = useRecentlyViewed();

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
    if (quickViewProduct?.id != null) {
      recordRecentlyViewed(quickViewProduct.id);
    }
  }, [quickViewProduct, recordRecentlyViewed]);

  useEffect(() => {
    const onHash = () => setActiveNav(hashToNav(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      addLine(product.id, 1);
    },
    [addLine]
  );

  const handleBuyNow = useCallback(
    (product) => {
      addLine(product.id, 1);
      navigate("/cart");
    },
    [addLine, navigate]
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <section className="relative overflow-hidden">
        <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
          <div className={`${PAGE_CONTAINER} space-y-3 sm:space-y-4`}>
            <div className="flex items-center justify-between gap-3">
              <Link
                to="/"
                className="group relative inline-block shrink-0 text-lg font-bold tracking-tight !text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:!text-white hover:after:scale-x-100 hover:drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]"
              >
                Nexa Electronics
              </Link>

              <nav
                className="hidden min-w-0 flex-1 items-center justify-center gap-6 text-xs md:flex sm:gap-10 sm:text-sm lg:gap-12"
                aria-label="Primary"
              >
                <Link
                  to="/shop/all"
                  onClick={() => setActiveNav("shop")}
                  className={navLinkClass(activeNav === "shop")}
                >
                  Shop
                </Link>
                <a
                  href="#deals-banner"
                  onClick={() => setActiveNav("deals")}
                  className={navLinkClass(activeNav === "deals")}
                >
                  Deals
                </a>
                <Link
                  to="/brands"
                  onClick={() => setActiveNav("brands")}
                  className={navLinkClass(activeNav === "brands")}
                >
                  Brands
                </Link>
              </nav>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  className="nexa-btn-ghost-light relative flex h-11 w-11 items-center justify-center rounded-full !text-white md:hidden"
                  aria-label="Search"
                  onClick={() =>
                    document.getElementById("hero-search-input")?.focus()
                  }
                >
                  <FaSearch className="h-5 w-5" aria-hidden />
                </button>
                <Link
                  to="/cart"
                  className="nexa-cart-pill group relative hidden sm:inline-flex"
                  aria-label={`Cart, ${cartCount} items`}
                >
                  <FaShoppingBag className="h-4 w-4 shrink-0 !text-white" aria-hidden />
                  <span className="sr-only">Cart</span>
                  {cartCount > 0 && (
                    <span
                      className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[10px] font-bold !text-white shadow-sm ring-2 ring-white"
                      style={{ backgroundColor: "var(--nexa-accent)" }}
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="nexa-btn-ghost-light relative flex h-11 w-11 items-center justify-center rounded-full !text-white sm:hidden"
                  aria-label={`Cart, ${cartCount} items`}
                >
                  <FaShoppingBag className="h-5 w-5" aria-hidden />
                  {cartCount > 0 && (
                    <span
                      className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white/30"
                      style={{ backgroundColor: "var(--nexa-accent)" }}
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/login"
                  className="nexa-btn-ghost-light ml-0.5 hidden h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:block"
                  aria-label="Account"
                >
                  <img
                    src={AVATAR_IMG}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </Link>
              </div>
            </div>
          </div>
        </header>

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

            <div className="relative z-10 flex min-h-[inherit] flex-col px-4 pb-12 pt-36 sm:px-8 sm:pb-14 sm:pt-40 lg:px-14 lg:pb-16 lg:pt-44">
              <div className="flex w-full flex-1 flex-col justify-center">
                <div className="mx-auto w-full max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                    New season · Curated tech
                  </p>
                  <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl">
                    Nexa Electronics
                  </h1>
                  <p className="mt-5 text-lg font-semibold leading-snug tracking-tight text-white/95 sm:text-xl lg:text-[1.35rem]">
                    Premium Electronics for Modern Living
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base lg:mx-0 lg:max-w-lg">
                    Phones, displays, audio, and accessories—chosen for performance
                    and the calm, considered look you expect from Nexa.
                  </p>
                  <div className="mt-10 flex flex-col items-stretch gap-3.5 sm:mt-11 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
                    <Link
                      to="/shop/all"
                      className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-black bg-black px-10 py-3.5 text-sm font-semibold text-white shadow-md shadow-black/25 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/35 active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                    >
                      Shop Now
                    </Link>
                    <a
                      href="#deals-banner"
                      className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/80 bg-white/[0.08] px-10 py-3.5 text-sm font-semibold !text-white backdrop-blur-md transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white hover:bg-white/[0.14] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] active:translate-y-0 active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                    >
                      Explore Deals
                    </a>
                  </div>
                </div>
              </div>

              <div
                id="hero-search"
                className="relative z-[60] mx-auto mt-12 w-full max-w-2xl md:max-w-3xl"
              >
                <div className="rounded-2xl border border-white/90 bg-white p-4 shadow-[0_16px_48px_rgba(0,0,0,0.15)] ring-1 ring-black/[0.05] sm:rounded-3xl sm:p-5">
                  <p className="text-center text-sm font-semibold text-neutral-800 sm:text-[15px]">
                    Give All You Need
                  </p>
                  <div className="relative mt-3">
                    <SearchWithSuggestions
                      variant="hero"
                      inputId="hero-search-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`relative z-10 -mt-6 mb-10 w-[calc(100%-1.5rem)] rounded-t-3xl border border-neutral-100 bg-white px-4 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] sm:-mt-8 sm:mb-12 sm:w-full sm:rounded-t-[1.75rem] sm:px-8 sm:py-7 lg:px-10 ${PAGE_CONTAINER}`}
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

      <section
        id="browse-categories"
        className={`${PAGE_CONTAINER} scroll-mt-28 pb-12 sm:pb-14`}
      >
        <div className="mb-8 border-b border-neutral-200/80 pb-8 text-center sm:mb-10 sm:text-left">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            Shop by category
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
            Jump into the range that fits your setup—each tile opens the full shop.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {CATEGORY_ITEMS.map((c) => {
            const Icon = c.icon;
            const to = HOME_CATEGORY_SHOP_LINKS[c.id];
            return (
              <Link
                key={c.id}
                to={to}
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
              </Link>
            );
          })}
        </div>
      </section>

      <HomeBelowFold
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onQuickView={setQuickViewProduct}
        isWishlisted={isWishlisted}
        onWishlistToggle={toggleWishlist}
      />

      <SiteFooter />

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
