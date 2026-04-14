import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaChevronRight,
  FaHome,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaTruck,
  FaLock,
  FaHeadset,
} from "react-icons/fa";
import {
  NEXA_BLACK_BUY_PRIMARY,
  NEXA_OUTLINE_CART_MATCH,
} from "../constants/nexaButtons";
import {
  getProductById,
  productGalleryImages,
  PRODUCTS,
} from "../data/catalog";
import { useCart } from "../context/CartContext";
import { formatCatalogPrice } from "../utils/currency";
import ProductCard from "../components/ProductCard";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

const DEFAULT_COLORS = [
  { id: "blk", label: "Black", hex: "#171717" },
  { id: "slv", label: "Silver", hex: "#d4d4d4" },
  { id: "blu", label: "Blue", hex: "#2563eb" },
];

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
          <FaStar key={i} className="h-4 w-4 shrink-0 text-amber-400" />
        ) : t === "half" ? (
          <FaStarHalfAlt key={i} className="h-4 w-4 shrink-0 text-amber-400" />
        ) : (
          <FaRegStar key={i} className="h-4 w-4 shrink-0 text-neutral-300" />
        )
      )}
    </span>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductById(id);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const colors = product?.colors?.length ? product.colors : DEFAULT_COLORS;
  const [colorId, setColorId] = useState(() => colors[0]?.id ?? "blk");

  const images = product ? productGalleryImages(product) : [];

  const related = !product
    ? []
    : PRODUCTS.filter(
        (p) => p.id !== product.id && p.category === product.category
      ).slice(0, 4);

  if (!product) {
    return (
      <div className={PAGE_WRAP + " py-20 text-center"}>
        <p className="text-lg font-semibold text-neutral-800">
          Product not found.
        </p>
        <Link
          to="/shop/all"
          className="mt-4 inline-block font-medium text-neutral-600 underline"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const rating = product.rating ?? 4.5;
  const reviews = product.reviews ?? 0;

  return (
    <div key={id} className="bg-white pb-20 pt-6 sm:pt-8">
      <div className={PAGE_WRAP}>
        <nav
          className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-neutral-500"
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
          <Link
            to="/shop/all"
            className="font-medium text-neutral-600 transition hover:text-neutral-900"
          >
            Shop
          </Link>
          <FaChevronRight className="h-3 w-3 text-neutral-300" aria-hidden />
          <span className="font-medium text-neutral-600">{product.category}</span>
          <FaChevronRight className="h-3 w-3 text-neutral-300" aria-hidden />
          <span className="font-semibold text-neutral-900 line-clamp-1">
            {product.title}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="overflow-hidden rounded-3xl border border-neutral-200/90 bg-[#F3F3F3] shadow-sm ring-1 ring-black/[0.04]">
              <img
                src={images[activeImg] ?? product.image}
                alt=""
                className="aspect-square w-full object-contain object-center p-8 sm:p-10"
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={
                      "relative h-20 w-20 overflow-hidden rounded-xl border bg-white p-2 transition sm:h-24 sm:w-24 " +
                      (activeImg === i
                        ? "border-black ring-2 ring-black/10"
                        : "border-neutral-200 hover:border-neutral-400")
                    }
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              {product.description ??
                "Engineered by Nexa for reliable everyday performance—backed by our standard warranty and support."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <StarRow value={rating} />
              <span className="text-sm font-semibold text-neutral-900">
                {rating.toFixed(1)}
              </span>
              <span className="text-sm text-neutral-500">
                ({reviews.toLocaleString("en-IN")} reviews)
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold text-[var(--nexa-accent)]">
                {formatCatalogPrice(product.price)}
              </span>
              {product.compareAtPrice != null &&
                product.compareAtPrice > product.price && (
                  <span className="text-lg font-medium text-neutral-400 line-through">
                    {formatCatalogPrice(product.compareAtPrice)}
                  </span>
                )}
            </div>
            {product.compareAtPrice != null &&
              product.compareAtPrice > product.price && (
                <p className="mt-2 text-sm font-medium text-emerald-700">
                  Discount only for this weekend — Nexa Electronics
                </p>
              )}

            <div className="mt-8">
              <p className="text-sm font-semibold text-neutral-900">
                Pick a color
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColorId(c.id)}
                    title={c.label}
                    className={
                      "h-9 w-9 rounded-lg border-2 transition " +
                      (colorId === c.id
                        ? "border-black ring-2 ring-black/15"
                        : "border-neutral-200 hover:border-neutral-400")
                    }
                    style={{ backgroundColor: c.hex }}
                  >
                    <span className="sr-only">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-1">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-neutral-800 transition hover:bg-white"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-neutral-800 transition hover:bg-white"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="text-sm font-medium text-neutral-600">
                Only 10 items left in this color — hurry up!
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className={NEXA_BLACK_BUY_PRIMARY + " sm:min-w-[11rem]"}
                onClick={() => {
                  addToCart(product.id, qty, { colorId });
                  navigate("/cart");
                }}
              >
                Buy now
              </button>
              <button
                type="button"
                className={NEXA_OUTLINE_CART_MATCH + " sm:min-w-[11rem]"}
                onClick={() => addToCart(product.id, qty, { colorId })}
              >
                Add to cart
              </button>
            </div>

            <ul className="mt-10 space-y-4 border-t border-neutral-200 pt-8">
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800">
                  <FaTruck className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-neutral-900">Free delivery</p>
                  <p className="text-sm text-neutral-600">
                    On qualifying orders—see checkout for delivery dates.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800">
                  <FaLock className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-neutral-900">
                    Secure payments
                  </p>
                  <p className="text-sm text-neutral-600">
                    Encrypted checkout with trusted processors.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800">
                  <FaHeadset className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-neutral-900">24/7 support</p>
                  <p className="text-sm text-neutral-600">
                    Nexa specialists for orders, returns, and setup help.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-neutral-200 pt-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              Related products
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={() => addToCart(p.id, 1)}
                  onBuyNow={() => {
                    addToCart(p.id, 1);
                    navigate("/cart");
                  }}
                  detailTo={`/product/${p.id}`}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
