import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";
import {
  SiApple,
  SiAsus,
  SiDell,
  SiHp,
  SiLenovo,
  SiSamsung,
  SiSony,
} from "react-icons/si";
import ProductCard from "../components/ProductCard";
import {
  BRAND_SLUG_TO_LABEL,
  PRODUCTS,
  filterProductsByBrandSlug,
  getShopBrandBySlug,
} from "../data/catalog";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../hooks/useWishlist";

const BRAND_ICONS = {
  apple: SiApple,
  samsung: SiSamsung,
  sony: SiSony,
  hp: SiHp,
  dell: SiDell,
  lenovo: SiLenovo,
  asus: SiAsus,
};

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

const PRODUCT_GRID =
  "grid grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8";

export default function BrandDetail() {
  const { brandSlug } = useParams();
  const slug = (brandSlug || "").trim().toLowerCase();
  const navigate = useNavigate();
  const brand = getShopBrandBySlug(slug);
  const name = BRAND_SLUG_TO_LABEL[slug];
  const { addToCart: addLine } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const Icon = BRAND_ICONS[slug];

  const products = useMemo(
    () => filterProductsByBrandSlug(PRODUCTS, slug),
    [slug]
  );

  if (!brand || !name) {
    return <Navigate to="/brands" replace />;
  }

  return (
    <div className="bg-neutral-50/90 pb-20 pt-6 sm:pt-8">
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
          <Link
            to="/brands"
            className="font-medium text-neutral-600 transition hover:text-neutral-900"
          >
            Brands
          </Link>
          <FaChevronRight className="h-3 w-3 text-neutral-300" aria-hidden />
          <span className="font-semibold text-neutral-900">{name}</span>
        </nav>

        <section className="relative mb-10 overflow-hidden rounded-3xl border border-neutral-200/90 bg-neutral-900 shadow-lg ring-1 ring-black/[0.06]">
          <img
            src={brand.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
          <div className="relative flex flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:items-center sm:gap-8 sm:px-10 sm:py-12">
            {Icon && (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg ring-2 ring-white/30 sm:h-24 sm:w-24">
                <Icon
                  className="h-10 w-10 text-neutral-900 sm:h-12 sm:w-12"
                  aria-hidden
                />
              </div>
            )}
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">
                Official brand store
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                {brand.tagline} — Curated Nexa listings for this brand.
              </p>
            </div>
          </div>
        </section>

        <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
          Products ({products.length})
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Same product cards as the rest of the store.
        </p>

        <div className={`${PRODUCT_GRID} mt-8 items-stretch`}>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={() => addLine(p.id, 1)}
              onBuyNow={() => {
                addLine(p.id, 1);
                navigate("/cart");
              }}
              wishlisted={isWishlisted(p.id)}
              onWishlistToggle={() => toggleWishlist(p.id)}
              detailTo={`/product/${p.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
