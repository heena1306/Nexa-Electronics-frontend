import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import ProductCard from "../ProductCard";
import SectionHeading from "../SectionHeading";
import { BLOG_POSTS, PRODUCTS, TRENDING_CIRCLES } from "../../data/catalog";

const GAP_SECTION = "space-y-16 sm:space-y-20 md:space-y-24";

const PRODUCT_GRID =
  "grid grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-8";

const PRODUCT_GRID_LATEST =
  "grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-5 lg:gap-9 lg:items-stretch";

const CTA_BG =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80";

const PROMO_A_IMG =
  "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80&auto=format&fit=crop";
const PROMO_B_IMG =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80&auto=format&fit=crop";

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
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return { days, hours, mins, secs };
}

export default function HomeBelowFold({
  onAddToCart,
  onBuyNow,
  onQuickView,
  isWishlisted,
  onWishlistToggle,
}) {
  const featured = useMemo(() => PRODUCTS.slice(0, 16), []);
  const latest = useMemo(() => PRODUCTS.slice(16, 21), []);
  const [featuredLimit, setFeaturedLimit] = useState(8);

  const end = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  }, []);
  const cd = useCountdown(end);

  return (
    <>
      <main
        className={`mx-auto w-full max-w-[min(100%,92rem)] px-4 pb-20 sm:px-6 lg:px-8 xl:px-10 ${GAP_SECTION}`}
      >
        {/* Trending categories — circular row */}
        <section
          id="trending-categories"
          className="scroll-mt-28 rounded-3xl bg-[var(--nexa-surface)] px-4 py-12 sm:px-8 sm:py-14"
        >
          <div className="mb-8 text-center sm:mb-10 sm:text-left">
            <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">
              Trending categories
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Quick links to what everyone is shopping this week.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
            {TRENDING_CIRCLES.map((t) => (
              <Link
                key={t.id}
                to={t.to}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative aspect-square w-full max-w-[8.5rem] overflow-hidden rounded-full border border-neutral-200/90 bg-white shadow-md ring-1 ring-black/[0.04] transition duration-500 group-hover:scale-[1.04] group-hover:shadow-lg sm:max-w-[9.5rem]">
                  <img
                    src={t.image}
                    alt=""
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <span className="mt-3 text-sm font-semibold text-neutral-900">
                  {t.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Dual promo banners */}
        <section className="scroll-mt-28 grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-100 ring-1 ring-black/[0.06]">
            <div className="grid min-h-[220px] grid-cols-1 sm:grid-cols-2 sm:items-center">
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nexa-accent)]">
                  Smart home
                </p>
                <h3 className="mt-2 text-lg font-extrabold text-neutral-900 sm:text-xl">
                  Start smart home
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Plugs, cameras, and sensors that work together.
                </p>
                <Link
                  to="/shop/accessories"
                  className="nexa-btn-solid-black mt-6 inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 py-2.5 text-sm font-semibold !text-white"
                >
                  Shop now
                </Link>
              </div>
              <div className="relative min-h-[180px] sm:min-h-[220px]">
                <img
                  src={PROMO_A_IMG}
                  alt=""
                  className="h-full w-full object-cover object-center sm:absolute sm:inset-0"
                />
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-neutral-100 ring-1 ring-black/[0.06]">
            <div className="grid min-h-[220px] grid-cols-1 sm:grid-cols-2 sm:items-center">
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nexa-accent)]">
                  Gaming
                </p>
                <h3 className="mt-2 text-lg font-extrabold text-neutral-900 sm:text-xl">
                  Best gamer&apos;s choice
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Mice, keyboards, and headsets built to compete.
                </p>
                <Link
                  to="/shop/gaming"
                  className="nexa-btn-solid-black mt-6 inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 py-2.5 text-sm font-semibold !text-white"
                >
                  Shop now
                </Link>
              </div>
              <div className="relative min-h-[180px] sm:min-h-[220px]">
                <img
                  src={PROMO_B_IMG}
                  alt=""
                  className="h-full w-full object-cover object-center sm:absolute sm:inset-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Latest products — single row of 5 */}
        <section id="latest-products" className="scroll-mt-28">
          <SectionHeading
            title="Latest products"
            subtitle="Fresh arrivals across audio, wearables, and desk upgrades."
            viewAllTo="/shop/all"
          />
          <div className={`${PRODUCT_GRID_LATEST} items-stretch`}>
            {latest.map((p) => (
              <ProductCard
                key={`latest-${p.id}`}
                product={p}
                onAddToCart={() => onAddToCart(p)}
                onBuyNow={() => onBuyNow(p)}
                onQuickView={onQuickView ? () => onQuickView(p) : undefined}
                wishlisted={isWishlisted(p.id)}
                onWishlistToggle={() => onWishlistToggle(p.id)}
                detailTo={`/product/${p.id}`}
              />
            ))}
          </div>
        </section>

        <section id="featured-products" className="scroll-mt-28">
          <SectionHeading
            title="Featured products"
            subtitle="Hand-picked bestsellers with Nexa-backed quality and fast delivery."
            viewAllTo="/shop/all"
          />
          <div className={`${PRODUCT_GRID} items-stretch`}>
            {featured.slice(0, featuredLimit).map((p) => (
              <ProductCard
                key={`feat-${p.id}`}
                product={p}
                onAddToCart={() => onAddToCart(p)}
                onBuyNow={() => onBuyNow(p)}
                onQuickView={onQuickView ? () => onQuickView(p) : undefined}
                wishlisted={isWishlisted(p.id)}
                onWishlistToggle={() => onWishlistToggle(p.id)}
                detailTo={`/product/${p.id}`}
              />
            ))}
          </div>
          {featured.length > featuredLimit && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setFeaturedLimit((n) => n + 4)}
                className="nexa-btn-solid-black inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 py-2.5 text-sm font-semibold !text-white"
              >
                View more
              </button>
            </div>
          )}
        </section>

        <section
          id="deals-banner"
          className="scroll-mt-28 overflow-hidden rounded-3xl bg-[var(--nexa-surface)] ring-1 ring-black/[0.06]"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="px-6 py-10 sm:px-10 sm:py-12 lg:py-14">
              <span className="inline-flex rounded-full bg-[var(--nexa-accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Hot deal
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                Up to 25% off — check it out
              </h2>
              <p className="mt-3 max-w-md text-neutral-600">
                Limited-time savings on audio, wearables, and accessories. Ends
                when the timer hits zero.
              </p>
              <div className="mt-8 grid max-w-md grid-cols-4 gap-3">
                {[
                  ["Days", cd.days],
                  ["Hours", cd.hours],
                  ["Mins", cd.mins],
                  ["Secs", cd.secs],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-neutral-200 bg-white px-2 py-4 text-center shadow-sm"
                  >
                    <p className="text-2xl font-extrabold tabular-nums text-neutral-900 sm:text-3xl">
                      {pad(val)}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to="/deals"
                className="nexa-btn-solid-black mt-8 inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-8 py-2.5 text-sm font-semibold !text-white transition hover:gap-3"
              >
                Shop now
                <FaArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative min-h-[260px] lg:min-h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1400&q=80&auto=format&fit=crop"
                alt=""
                className="h-full w-full object-cover object-center lg:absolute lg:inset-0"
              />
            </div>
          </div>
        </section>

        <section
          id="value-props"
          className="scroll-mt-28 rounded-3xl border border-neutral-200/80 bg-white px-6 py-10 shadow-sm sm:px-10"
        >
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {[
              {
                title: "Free delivery",
                text: "On qualifying orders—see checkout for delivery dates.",
              },
              {
                title: "Pay monthly at 0% APR",
                text: "Where available on select products at checkout.",
              },
              {
                title: "Personalize it",
                text: "Engrave or bundle accessories with your new device.",
              },
            ].map((row) => (
              <div key={row.title}>
                <p className="text-lg font-bold text-neutral-900">{row.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {row.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="blog-events" className="scroll-mt-28">
          <SectionHeading
            title="Blog & events"
            subtitle="Stories, guides, and Nexa happenings—stay in the loop."
            viewAllTo="/shop/all"
          />
          <div className="grid gap-7 md:grid-cols-3 md:gap-8">
            {BLOG_POSTS.map((b) => (
              <article
                key={b.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-md shadow-black/[0.05] ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--nexa-surface)]">
                  <img
                    src={b.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium text-neutral-500">
                    {b.date} · {b.author}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-neutral-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                    {b.excerpt}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-[var(--nexa-accent)] underline-offset-4 group-hover:underline">
                    Read more
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="newsletter" className="scroll-mt-28">
          <div className="relative overflow-hidden rounded-3xl bg-[#1a1a1a] shadow-[0_16px_48px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] sm:rounded-[1.75rem]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${CTA_BG})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 via-neutral-900/92 to-black/95" />
            <div className="relative grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:items-start lg:gap-14 lg:px-12 lg:py-14">
              <div className="min-w-0">
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:max-w-xl">
                  Ready to get our new stuff?
                </h2>
                <form
                  className="mt-8 max-w-lg"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="flex h-12 w-full max-w-lg items-center gap-2 overflow-hidden rounded-full border border-neutral-300 bg-white pl-4 pr-1.5 shadow-md">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="min-w-0 flex-1 bg-transparent py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                    />
                    <button
                      type="submit"
                      className="nexa-btn-solid-black inline-flex shrink-0 items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold !text-white"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
              <div className="min-w-0 lg:pt-1">
                <p className="text-lg font-semibold text-white sm:text-xl">
                  Nexa for homes and needs
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
                  We listen to your needs, identify the best approach, and help
                  you build a home setup with reliable electronics and smart
                  devices that fit how you live and work.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
