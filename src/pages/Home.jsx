import { useState, useRef, useMemo, useEffect } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import { NEXA_BLACK_PILL_SEARCH } from "../constants/nexaButtons";

/* Living-room hero: wide interior, TV wall — matches e‑commerce reference mood */
const HERO_IMG =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2400&q=85";

const CTA_BG =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80";

const AVATAR_IMG =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&q=80";

const ITEMS_PER_PAGE = 3;

/** Pexels hotlinks — reliable loads vs Unsplash in some environments */
const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900&dpr=1`;

const PRODUCTS = [
  {
    id: 1,
    title: "Wireless Noise-Cancel Headphones",
    price: 199.99,
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
    image: pexels(5082579),
    category: "Audio",
    tag: "Music",
    rating: 5.0,
    reviews: 1200,
  },
];

const RECOMMENDED = [
  {
    id: "r1",
    title: "Studio Monitor Speakers",
    price: 349.0,
    image: pexels(1571458),
    category: "Speakers",
    tag: "Music",
    rating: 4.8,
    reviews: 640,
  },
  {
    id: "r2",
    title: "4K Action Camera",
    price: 279.0,
    image: pexels(320617),
    category: "Cameras",
    tag: "Other",
    rating: 4.5,
    reviews: 112,
  },
  {
    id: "r3",
    title: "Wireless Earbuds Pro",
    price: 159.0,
    image: pexels(3394650),
    category: "Audio",
    tag: "Music",
    rating: 4.7,
    reviews: 890,
  },
  {
    id: "r4",
    title: "Ultrawide USB-C Monitor",
    price: 449.0,
    image: pexels(2882521),
    category: "TV",
    tag: "Home",
    rating: 4.6,
    reviews: 203,
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
  if (key === "brand" || key === "shop" || key === "categories") return key;
  return "shop";
}

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [heroSearch, setHeroSearch] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");
  const [page, setPage] = useState(1);
  const [activeNav, setActiveNav] = useState("shop");
  const recScrollRef = useRef(null);

  useEffect(() => {
    setActiveNav(hashToNav(typeof window !== "undefined" ? window.location.hash : ""));
    const onHash = () => setActiveNav(hashToNav(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const addToCart = () => setCartCount((c) => c + 1);

  const totalPages = Math.max(1, Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE));
  const pageItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return PRODUCTS.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  const pageNumbers = useMemo(
    () => buildPageList(page, totalPages),
    [page, totalPages]
  );

  const scrollRec = (dir) => {
    const el = recScrollRef.current;
    if (!el) return;
    const delta = dir === "left" ? -340 : 340;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-neutral-900">
      <section className="relative overflow-hidden">
        {/* Nav: transparent over hero — overrides global <a> hover colors */}
        <header className="absolute inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <a
              href="/"
              className="group relative inline-block text-lg font-bold tracking-tight !text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:!text-white hover:after:scale-x-100 hover:drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]"
            >
              Nexa Electronics
            </a>
            <nav className="flex min-w-0 flex-1 items-center justify-center gap-5 text-xs sm:gap-10 sm:text-sm md:gap-12">
              <a
                href="#brand"
                onClick={() => setActiveNav("brand")}
                className={navLinkClass(activeNav === "brand")}
              >
                Brand
              </a>
              <a
                href="#shop"
                onClick={() => setActiveNav("shop")}
                className={navLinkClass(activeNav === "shop")}
              >
                Shop
              </a>
              <a
                href="#categories"
                onClick={() => setActiveNav("categories")}
                className={navLinkClass(activeNav === "categories")}
              >
                Categories
              </a>
            </nav>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                className="nexa-btn-ghost-light group relative flex h-12 w-12 items-center justify-center rounded-full !text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="Search"
              >
                <FaSearch className="h-6 w-6 transition-transform duration-500 ease-out group-hover:scale-105" />
              </button>
              <button
                type="button"
                className="nexa-btn-ghost-light group relative flex h-12 w-12 items-center justify-center rounded-full !text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <FaShoppingBag className="h-6 w-6 transition-transform duration-500 ease-out group-hover:scale-105" />
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
                className="nexa-btn-ghost-light ml-0.5 hidden h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:block"
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
        </header>

        {/* Hero: “Shop” scales with viewport so it fills the banner (width + height) */}
        <div className="relative isolate mx-auto w-full max-w-[1920px] overflow-hidden">
          <div className="relative h-[min(82vh,1020px)] w-full sm:h-[min(86vh,1080px)] lg:h-[min(88vh,1120px)]">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${HERO_IMG})`,
                transform: "scale(1.02)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.6)_100%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/55"
              aria-hidden
            />
            <div className="relative box-border flex h-full w-full items-center justify-center px-2 pt-28 pb-[18%] sm:px-4 sm:pt-32 sm:pb-[16%] lg:pt-36">
              <h1
                className="nexa-hero-title w-full max-w-none select-none text-center font-sans font-extrabold uppercase leading-[0.82] tracking-[-0.04em] text-white"
                style={{
                  fontSize:
                    "clamp(6.25rem, min(36vw, 42vh), 44rem)",
                  width: "100%",
                }}
              >
                Shop
              </h1>
            </div>
          </div>
        </div>

        {/* Overlaps hero bottom — rounded top only (reference) */}
        <div className="relative z-10 mx-auto -mt-12 mb-10 w-[calc(100%-1.5rem)] max-w-7xl rounded-t-3xl border border-neutral-100 border-b-neutral-100 bg-white px-4 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:mx-auto sm:-mt-14 sm:mb-12 sm:w-full sm:rounded-t-[1.75rem] sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="shrink-0 text-xl font-bold text-black sm:text-2xl">
              Give All You Need
            </p>
            <form
              className="flex w-full min-w-0 max-w-[min(100%,36rem)] flex-1 items-center sm:justify-end"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex h-12 w-full min-w-0 items-center gap-2 overflow-hidden rounded-full border border-neutral-300 bg-[#F5F5F5] pl-3.5 pr-1.5">
                <FaSearch className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                <input
                  type="search"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search on Nexa Electronics"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                />
                <button type="submit" className={NEXA_BLACK_PILL_SEARCH}>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <main id="shop" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div id="brand" className="flex flex-col gap-10 scroll-mt-28 lg:flex-row lg:items-start">
          <div id="categories" className="shrink-0 scroll-mt-28 lg:w-[260px]">
            <Sidebar />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-black">All products</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Nine featured items — add to cart or buy now.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={addToCart}
                  onBuyNow={() => addToCart()}
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

        <section
          id="recommendations"
          className="mt-16 border-t border-neutral-200 pt-14"
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-black md:text-3xl">
                Explore our recommendations
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Staff picks — scroll to explore.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollRec("left")}
                className="nexa-btn-surface rounded-full border border-solid border-neutral-200 bg-white p-3 !text-neutral-800 shadow-sm"
                aria-label="Scroll recommendations left"
              >
                <FaChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollRec("right")}
                className="nexa-btn-surface rounded-full border border-solid border-neutral-200 bg-white p-3 !text-neutral-800 shadow-sm"
                aria-label="Scroll recommendations right"
              >
                <FaChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            ref={recScrollRef}
            className="rec-scroll -mx-1 flex gap-5 overflow-x-auto pb-3"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {RECOMMENDED.map((p) => (
              <div
                key={p.id}
                className="w-[min(100%,320px)] min-w-[280px] shrink-0 scroll-mx-1 sm:min-w-[300px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <ProductCard
                  product={p}
                  onAddToCart={addToCart}
                  onBuyNow={() => addToCart()}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <section
        id="deals"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-neutral-500 sm:flex-row sm:px-6 lg:px-8">
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
    </div>
  );
}
