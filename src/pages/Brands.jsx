import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronRight, FaHome } from "react-icons/fa";
import {
  SiApple,
  SiAsus,
  SiDell,
  SiHp,
  SiLenovo,
  SiSamsung,
  SiSony,
} from "react-icons/si";
import { SHOP_BRANDS } from "../data/catalog";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

const BRAND_ICONS = {
  apple: SiApple,
  samsung: SiSamsung,
  sony: SiSony,
  hp: SiHp,
  dell: SiDell,
  lenovo: SiLenovo,
  asus: SiAsus,
};

const USE_CASES = [
  {
    id: "gaming",
    label: "Gaming",
    blurb: "High-refresh displays, mice, and headsets",
    to: "/shop/gaming",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "work",
    label: "Work",
    blurb: "Laptops, monitors, and desk essentials",
    to: "/shop/laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "audio",
    label: "Audio",
    blurb: "Headphones, ANC, and home speakers",
    to: "/shop/headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "smart-home",
    label: "Smart Home",
    blurb: "Plugs, cameras, and sensors",
    to: "/shop/accessories",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80&auto=format&fit=crop",
  },
];

export default function Brands() {
  return (
    <div className="bg-neutral-50/80 pb-16 pt-6 sm:pt-8">
      <div className={PAGE_WRAP}>
        <nav
          className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-neutral-500"
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
          <span className="font-semibold text-neutral-900">Brands</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
            Shop by Brands
          </h1>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            Explore top electronics brands and their products
          </p>
        </div>

        <section className="mb-12" aria-labelledby="popular-brands-heading">
          <h2
            id="popular-brands-heading"
            className="text-lg font-bold text-neutral-900 sm:text-xl"
          >
            Popular brands
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Choose a brand—each card opens its dedicated storefront.
          </p>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]">
            {SHOP_BRANDS.map((b) => {
              const Icon = BRAND_ICONS[b.slug];
              return (
                <Link
                  key={b.slug}
                  to={`/brands/${b.slug}`}
                  className="group flex min-w-[9.5rem] shrink-0 flex-col items-center rounded-2xl border border-neutral-200/90 bg-white px-5 py-5 text-center shadow-sm ring-1 ring-black/[0.04] transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-neutral-300 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-50 shadow-inner ring-1 ring-neutral-200/80 transition duration-300 group-hover:bg-white group-hover:ring-neutral-300">
                    {Icon && (
                      <Icon className="h-8 w-8 text-neutral-900" aria-hidden />
                    )}
                  </div>
                  <span className="mt-3 text-sm font-bold text-neutral-900">
                    {b.name}
                  </span>
                  <span className="mt-1 text-[11px] font-medium text-neutral-500">
                    View storefront
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-14" aria-labelledby="use-case-heading">
          <h2
            id="use-case-heading"
            className="text-lg font-bold text-neutral-900 sm:text-xl"
          >
            Shop by use case
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Opens the matching category in the shop (UI-only filters).
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((u) => (
              <Link
                key={u.id}
                to={u.to}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm ring-1 ring-black/[0.04] transition duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={u.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-2xl font-bold text-white drop-shadow-sm">
                      {u.label}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-white/90">
                      {u.blurb}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="brands-grid-heading">
          <h2
            id="brands-grid-heading"
            className="text-lg font-bold text-neutral-900 sm:text-xl"
          >
            All brands
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Image-led cards—hover for a quick cue, tap to open the brand page.
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SHOP_BRANDS.map((b) => (
              <Link
                key={`card-${b.slug}`}
                to={`/brands/${b.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-md shadow-black/[0.06] ring-1 ring-black/[0.05] transition duration-500 ease-out hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F3F3]">
                  <img
                    src={b.image}
                    alt=""
                    className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/45" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition duration-500 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white drop-shadow">
                      Explore
                      <FaArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition duration-300 group-hover:opacity-0">
                    <p className="text-lg font-bold tracking-tight">{b.name}</p>
                    <p className="mt-1 text-sm font-medium text-white/85">
                      {b.tagline}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <span className="text-sm font-semibold text-neutral-900">
                    {b.name}
                  </span>
                  <span
                    className="text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-neutral-700"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
