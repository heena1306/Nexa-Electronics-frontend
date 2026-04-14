import { useState } from "react";
import { Link } from "react-router-dom";
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

function StockRow({ stock }) {
  if (stock === "in") return null;
  return (
    <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
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
  );
}

export default function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
  onQuickView,
  layout = "grid",
  wishlisted: wishlistedProp,
  onWishlistToggle,
  className = "",
  detailTo,
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
  const showNew =
    product.badge === "new" ||
    /^new$/i.test(String(product.tag ?? "").trim());
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

  const cardShell =
    "group relative flex min-h-0 overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.05] transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.09)] motion-reduce:transition-shadow motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[0_2px_16px_rgba(0,0,0,0.06)] ";

  const imageShell = isList
    ? "relative flex shrink-0 items-center justify-center overflow-hidden bg-[#F3F3F3] aspect-square w-[7.5rem] rounded-l-3xl sm:w-36 md:w-40"
    : "relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-3xl bg-gradient-to-b from-neutral-50 via-neutral-50 to-neutral-100/95 ring-1 ring-inset ring-black/[0.04]";

  const bodyPad = isList
    ? "flex min-h-0 min-w-0 flex-1 flex-col justify-between px-4 py-3.5 sm:px-5 sm:py-4"
    : "flex min-h-0 flex-1 flex-col gap-0 px-5 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5";

  return (
    <article
      className={
        cardShell +
        (isList ? "flex-row items-stretch sm:min-h-[11rem]" : "h-full min-h-0 flex-col") +
        " " +
        className
      }
    >
      <div className={imageShell}>
        {discountPct != null && discountPct > 0 && (
          <span
            className="absolute left-2.5 top-2.5 z-20 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm"
            style={{ backgroundColor: "#FF4D4D" }}
          >
            −{discountPct}%
          </span>
        )}
        {showNew ? (
          <span className="absolute right-2.5 top-2.5 z-20 rounded-md bg-[var(--nexa-accent)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ring-1 ring-black/10">
            New
          </span>
        ) : (
          <span className="absolute right-2.5 top-2.5 z-20 max-w-[46%] truncate rounded-full bg-neutral-200/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-700 ring-1 ring-neutral-300/60">
            {tag}
          </span>
        )}

        <div className="pointer-events-none absolute right-2.5 top-12 z-20 flex flex-col gap-2 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist();
            }}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/90 bg-white text-neutral-700 shadow-md ring-1 ring-black/[0.04] transition duration-300 hover:scale-105 hover:border-neutral-300 hover:shadow-lg"
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
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/90 bg-white text-neutral-700 shadow-md ring-1 ring-black/[0.04] transition duration-300 hover:scale-105 hover:border-neutral-300 hover:shadow-lg"
              aria-label="Quick view"
            >
              <FaEye className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {detailTo ? (
          <Link
            to={detailTo}
            className="absolute inset-0 z-[5]"
            aria-label={`View ${product.title}`}
          >
            <span className="sr-only">{product.title}</span>
          </Link>
        ) : null}
        <img
          src={product.image}
          alt=""
          sizes={
            isList
              ? "(max-width: 640px) 42vw, 168px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
          className="h-full w-full object-cover object-center transition-[transform] duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className={bodyPad}>
        <StockRow stock={stock} />

        {detailTo ? (
          <h3
            className={
              "line-clamp-2 text-left text-[15px] font-bold leading-snug tracking-tight text-neutral-900 sm:text-[15px] " +
              (isList ? "" : "min-h-[2.5rem]")
            }
          >
            <Link
              to={detailTo}
              className="transition hover:text-neutral-600"
            >
              {product.title}
            </Link>
          </h3>
        ) : (
          <h3
            className={
              "line-clamp-2 text-left text-[15px] font-bold leading-snug tracking-tight text-neutral-900 sm:text-[15px] " +
              (isList ? "" : "min-h-[2.5rem]")
            }
          >
            {product.title}
          </h3>
        )}

        {product.category && product.category !== tag && (
          <p className="mt-1 line-clamp-1 text-[11px] font-medium text-neutral-400">
            {product.category}
          </p>
        )}

        <div className="mt-3 flex items-start justify-between gap-3 sm:mt-3.5">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <StarRow value={rating} />
            <span className="text-sm font-semibold tabular-nums text-neutral-900">
              {rating.toFixed(1)}
            </span>
            <span className="text-[12px] text-neutral-500">
              {formatReviewLabel(reviews)}
            </span>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-base font-bold leading-none tracking-tight text-[var(--nexa-accent)] sm:text-lg">
              {formatCatalogPrice(product.price)}
            </p>
            {hasDeal && (
              <span className="mt-0.5 block text-[11px] font-medium text-neutral-400 line-through">
                {formatCatalogPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {hasDeal && discountPct != null && discountPct > 0 && (
          <p className="mt-2 text-xs font-semibold leading-snug text-emerald-700">
            Save {formatINR(saveRupees)} ({discountPct}%)
          </p>
        )}

        <div
          className={
            "mt-auto grid w-full grid-cols-2 gap-3 " +
            (isList ? "pt-4 sm:pt-5" : "pt-5")
          }
        >
          <button
            type="button"
            onClick={onAddToCart}
            className={
              NEXA_OUTLINE_CART_MATCH +
              " !h-12 w-full !min-h-12 !rounded-full !border-neutral-200 !bg-white !text-sm !font-semibold !text-neutral-900 shadow-sm hover:!border-neutral-300 hover:!bg-neutral-50"
            }
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={onBuyNow}
            className={
              NEXA_BLACK_BUY_PRIMARY +
              " !h-12 w-full !min-h-12 !rounded-full !text-sm !font-semibold !text-white"
            }
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
