import { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaHeart,
  FaRegHeart,
  FaEye,
} from "react-icons/fa";
import {
  NEXA_BLACK_BUY_PRIMARY,
  NEXA_OUTLINE_CART_MATCH,
} from "../constants/nexaButtons";
import { formatCatalogPrice, formatINR, inrFromCatalog } from "../utils/currency";

function formatReviewLabel(n) {
  const formatted = n.toLocaleString("en-IN");
  return `(${formatted} ${n === 1 ? "review" : "reviews"})`;
}

function StarRow({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) stars.push("full");
    else if (value >= i - 0.5) stars.push("half");
    else stars.push("empty");
  }
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {stars.map((t, i) =>
        t === "full" ? (
          <FaStar key={i} className="h-3.5 w-3.5 shrink-0 text-amber-400" />
        ) : t === "half" ? (
          <FaStarHalfAlt key={i} className="h-3.5 w-3.5 shrink-0 text-amber-400" />
        ) : (
          <FaRegStar key={i} className="h-3.5 w-3.5 shrink-0 text-neutral-300" />
        )
      )}
    </span>
  );
}

function stockForProduct(product) {
  if (product.stock === "low") return "low";
  if (product.stock === "out") return "out";
  if (product.stock === "in") return "in";
  return product.id % 9 === 0 ? "low" : "in";
}

export default function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
  onQuickView,
  /** "grid" | "list" — list is horizontal row for catalog */
  layout = "grid",
  /** Controlled wishlist (optional; falls back to local state) */
  wishlisted: wishlistedProp,
  onWishlistToggle,
  className = "",
}) {
  const [wishlistedLocal, setWishlistedLocal] = useState(false);
  const wishlisted =
    wishlistedProp !== undefined ? wishlistedProp : wishlistedLocal;
  const toggleWishlist = () => {
    if (onWishlistToggle) onWishlistToggle();
    else setWishlistedLocal((w) => !w);
  };
  const rating = product.rating ?? 4.5;
  const reviews = product.reviews ?? 128;
  const tag = product.tag ?? product.category ?? "Other";
  const discountPct =
    product.discountPercent ??
    (product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100
        )
      : null);

  const hasDeal =
    product.compareAtPrice != null && product.compareAtPrice > product.price;
  const saveRupees = hasDeal
    ? inrFromCatalog(product.compareAtPrice - product.price)
    : 0;
  const stock = stockForProduct(product);

  const isList = layout === "list";

  return (
    <article
      className={`group relative flex min-h-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/[0.06] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:ring-black/[0.08] ${
        isList
          ? "flex-row items-stretch sm:min-h-[11rem]"
          : "h-full min-h-0 flex-col"
      } ${className}`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-[#F0F0F0] ${
          isList
            ? "aspect-square w-[7.5rem] sm:w-36 md:w-40"
            : "aspect-square w-full"
        }`}
      >
        {discountPct != null && discountPct > 0 && (
          <span
            className="absolute left-2.5 top-2.5 z-20 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm"
            style={{ backgroundColor: "#FF4D4D" }}
          >
            −{discountPct}%
          </span>
        )}
        <span className="absolute right-2.5 top-2.5 z-20 max-w-[42%] truncate rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-600 shadow-sm ring-1 ring-black/[0.05] backdrop-blur-sm">
          {tag}
        </span>

        {/* Hover actions */}
        <div className="pointer-events-none absolute right-2.5 top-12 z-20 flex flex-col gap-2 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist();
            }}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/90 bg-white/95 text-neutral-700 shadow-md ring-1 ring-black/[0.04] transition duration-300 hover:scale-105 hover:border-neutral-300 hover:shadow-lg"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
          >
            {wishlisted ? (
              <FaHeart className="h-3.5 w-3.5 text-[#FF4D4D]" aria-hidden />
            ) : (
              <FaRegHeart className="h-3.5 w-3.5 text-neutral-600" aria-hidden />
            )}
          </button>
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/90 bg-white/95 text-neutral-700 shadow-md ring-1 ring-black/[0.04] transition duration-300 hover:scale-105 hover:border-neutral-300 hover:shadow-lg"
              aria-label="Quick view"
            >
              <FaEye className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <img
          src={product.image}
          alt=""
          className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.06]"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>

      <div
        className={`flex min-h-0 flex-1 flex-col px-3.5 pb-3.5 pt-3 sm:px-4 sm:pb-4 sm:pt-3.5 ${
          isList ? "min-w-0 justify-between py-2 sm:py-3" : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {stock === "in" && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-600/15">
              In Stock
            </span>
          )}
          {stock === "low" && (
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ring-1 ring-black/10"
              style={{ backgroundColor: "#FF4D4D" }}
            >
              Only few left
            </span>
          )}
          {stock === "out" && (
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-600 ring-1 ring-neutral-200">
              Out of Stock
            </span>
          )}
        </div>

        <h3
          className={`mt-2 line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-neutral-900 ${
            isList ? "" : "min-h-[2.5rem] sm:min-h-[2.75rem]"
          }`}
        >
          {product.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <StarRow value={rating} />
          <span className="text-xs font-semibold tabular-nums text-neutral-800">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-neutral-500">{formatReviewLabel(reviews)}</span>
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className="text-lg font-bold leading-none tracking-tight text-neutral-900 sm:text-xl">
              {formatCatalogPrice(product.price)}
            </p>
            {hasDeal && (
              <span className="text-sm font-medium text-neutral-400 line-through">
                {formatCatalogPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          {hasDeal && discountPct != null && discountPct > 0 && (
            <p className="text-xs font-semibold text-emerald-700">
              Save {formatINR(saveRupees)} ({discountPct}%)
            </p>
          )}
        </div>

        <div
          className={`mt-auto flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3 ${
            isList ? "pt-2 sm:pt-3" : "pt-4"
          }`}
        >
          <button
            type="button"
            onClick={onAddToCart}
            className={NEXA_OUTLINE_CART_MATCH}
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={onBuyNow}
            className={NEXA_BLACK_BUY_PRIMARY + " flex-1 basis-0 min-w-0"}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
