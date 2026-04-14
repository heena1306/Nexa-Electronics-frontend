import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight, FaFire, FaHome, FaStar } from "react-icons/fa";
import { PRODUCT_IMAGES, PRODUCTS } from "../data/catalog";
import { useCart } from "../context/CartContext";
import { formatCatalogPrice } from "../utils/currency";
import {
  NEXA_BLACK_BUY_PRIMARY,
  NEXA_OUTLINE_CART_MATCH,
} from "../constants/nexaButtons";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";
const DEAL_GRID =
  "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7";
const DEAL_IMAGE_BY_PRODUCT_ID = PRODUCT_IMAGES;

function pad(n) {
  return String(n).padStart(2, "0");
}

function useCountdown(endMs) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const left = Math.max(0, endMs - now);
  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

function dealScore(p) {
  const hasDeal =
    p.compareAtPrice != null && p.compareAtPrice > p.price ? 1 : 0;
  const discount = hasDeal
    ? (p.compareAtPrice - p.price) / p.compareAtPrice
    : 0.08 + (p.id % 9) * 0.01;
  return discount * 1000 + (p.reviews ?? 0);
}

function toDeal(p) {
  const hasDeal = p.compareAtPrice != null && p.compareAtPrice > p.price;
  const compareAt = hasDeal
    ? p.compareAtPrice
    : Number((p.price * (1.16 + (p.id % 5) * 0.03)).toFixed(2));
  const pct = Math.max(8, Math.round(((compareAt - p.price) / compareAt) * 100));
  const total = 120 + (p.id % 6) * 35;
  const left = Math.max(4, total - (Math.floor((total * (55 + (p.id % 35))) / 100)));
  const soldPct = Math.min(96, Math.max(55, Math.round(((total - left) / total) * 100)));
  const tags = ["Hot Deal"];
  if (left <= 16) tags.push("Limited Stock");
  if (pct >= 25) tags.push("Ending Soon");
  return {
    ...p,
    image: DEAL_IMAGE_BY_PRODUCT_ID[p.id] ?? p.image,
    compareAt,
    pct,
    left,
    soldPct,
    tags,
  };
}

function DealCard({ p, onAddToCart, onBuyNow }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-neutral-200/90 bg-white shadow-sm ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${p.id}`} className="relative block aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={p.image}
          alt=""
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <span className="absolute left-2.5 top-2.5 rounded-md bg-rose-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          -{p.pct}%
        </span>
      </Link>
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={`${p.id}-${t}`}
              className={
                "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide " +
                (t === "Hot Deal"
                  ? "bg-rose-100 text-rose-700"
                  : t === "Limited Stock"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-orange-100 text-orange-700")
              }
            >
              {t}
            </span>
          ))}
        </div>
        <Link to={`/product/${p.id}`} className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900 hover:underline">
          {p.title}
        </Link>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-extrabold text-[var(--nexa-accent)]">{formatCatalogPrice(p.price)}</p>
            <p className="text-xs text-neutral-400 line-through">{formatCatalogPrice(p.compareAt)}</p>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-700">
            <FaStar className="h-3 w-3 text-amber-400" />
            {(p.rating ?? 4.5).toFixed(1)}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-rose-600">Only {p.left} left</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500"
              style={{ width: `${p.soldPct}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-neutral-500">{p.soldPct}% sold</p>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onAddToCart(p)}
            className={NEXA_OUTLINE_CART_MATCH + " !h-[2.75rem] w-full !min-h-[2.75rem] !border-neutral-200 !bg-white !text-neutral-900"}
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => onBuyNow(p)}
            className={NEXA_BLACK_BUY_PRIMARY + " !h-[2.75rem] w-full !min-h-[2.75rem] !text-white"}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

function DealSection({ title, subtitle, items, onAddToCart, onBuyNow }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">{title}</h2>
        <p className="mt-1.5 text-sm text-neutral-500">{subtitle}</p>
      </div>
      <div className={DEAL_GRID}>
        {items.map((p) => (
          <DealCard key={`${title}-${p.id}`} p={p} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
        ))}
      </div>
    </section>
  );
}

export default function Deals() {
  const navigate = useNavigate();
  const { addToCart: addLine } = useCart();

  const end = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  }, []);
  const cd = useCountdown(end);

  const deals = useMemo(
    () => PRODUCTS.map(toDeal).sort((a, b) => dealScore(b) - dealScore(a)),
    []
  );
  const flashDeals = useMemo(() => deals.slice(0, 8), [deals]);
  const todaysDeals = useMemo(() => {
    const used = new Set(flashDeals.map((x) => x.id));
    return deals.filter((p) => !used.has(p.id)).slice(0, 8);
  }, [deals, flashDeals]);
  const trendingDeals = useMemo(() => {
    const used = new Set([...flashDeals, ...todaysDeals].map((x) => x.id));
    return deals.filter((p) => !used.has(p.id) && (p.reviews ?? 0) >= 300).slice(0, 8);
  }, [deals, flashDeals, todaysDeals]);
  const budgetDeals = useMemo(() => {
    const used = new Set(
      [...flashDeals, ...todaysDeals, ...trendingDeals].map((x) => x.id)
    );
    return deals
      .filter((p) => !used.has(p.id))
      .sort((a, b) => a.price - b.price)
      .slice(0, 8);
  }, [deals, flashDeals, todaysDeals, trendingDeals]);

  const onAddToCart = (p) => addLine(p.id, 1);
  const onBuyNow = (p) => {
    addLine(p.id, 1);
    navigate("/order-confirmation");
  };

  return (
    <div className="bg-neutral-50/80 pb-20 pt-8 sm:pt-10">
      <div className={`${PAGE_WRAP} space-y-12`}>
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-500" aria-label="Breadcrumb">
          <Link to="/home" className="inline-flex items-center gap-1 font-medium text-neutral-600 transition hover:text-neutral-900">
            <FaHome className="h-3.5 w-3.5" />
            Home
          </Link>
          <FaChevronRight className="h-3 w-3 text-neutral-300" />
          <span className="font-semibold text-neutral-900">Deals</span>
        </nav>

        <section className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-900 px-6 py-10 shadow-lg sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1800&q=80&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          <div className="relative space-y-6">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-200">
                <FaFire className="h-3 w-3" />
                Flash Sale
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Flash Sale - Limited Time Deals
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
                Save big on phones, laptops, audio, and smart accessories before the timer runs out.
              </p>
            </div>
            <div className="grid max-w-xl grid-cols-4 gap-3">
              {[
                ["Days", cd.days],
                ["Hours", cd.hours],
                ["Minutes", cd.mins],
                ["Seconds", cd.secs],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white px-2 py-4 text-center shadow-sm">
                  <p className="text-2xl font-extrabold tabular-nums text-neutral-900">{pad(value)}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <DealSection
          title="Flash Deals"
          subtitle="Urgent picks with the steepest drops right now."
          items={flashDeals}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
        <DealSection
          title="Today's Deals"
          subtitle="Fresh discounts selected for today."
          items={todaysDeals}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
        <DealSection
          title="Trending Deals"
          subtitle="Most-loved electronics with active discounts."
          items={trendingDeals}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
        <DealSection
          title="Budget Deals (Under ₹999)"
          subtitle="Value picks for everyday essentials."
          items={budgetDeals}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      </div>
    </div>
  );
}

