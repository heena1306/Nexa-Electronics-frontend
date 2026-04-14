import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { CATEGORIES_PAGE_ITEMS } from "../data/catalog";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

export default function Categories() {
  return (
    <div className="bg-neutral-50/80 pb-16 pt-6 sm:pt-8">
      <div className={PAGE_WRAP}>
        <nav
          className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-neutral-500"
          aria-label="Breadcrumb"
        >
          <Link
            to="/home"
            className="font-medium text-neutral-600 transition hover:text-neutral-900"
          >
            Home
          </Link>
          <FaChevronRight className="h-3 w-3 text-neutral-300" aria-hidden />
          <span className="font-semibold text-neutral-900">Categories</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
            Shop by category
          </h1>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            Pick a category to browse curated Nexa picks—same quality standards
            across every aisle.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CATEGORIES_PAGE_ITEMS.map((c) => (
            <Link
              key={c.id}
              to={c.to}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
                <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  <p className="text-lg font-bold tracking-tight">{c.label}</p>
                  <p className="mt-1 text-sm font-medium text-white/85">
                    {c.blurb}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-sm font-semibold text-neutral-900">
                  Explore
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
      </div>
    </div>
  );
}
