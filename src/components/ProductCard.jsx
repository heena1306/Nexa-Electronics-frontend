import { FaStar } from 'react-icons/fa';
import { NEXA_BLACK_PILL_PRODUCT, NEXA_OUTLINE_PILL_PRODUCT } from '../constants/nexaButtons';

function formatReviewCount(n) {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}k`;
  }
  return String(n);
}

export default function ProductCard({ product, onAddToCart, onBuyNow, className = '' }) {
  const rating = product.rating ?? 4.5;
  const reviews = product.reviews ?? 128;
  const tag = product.tag ?? product.category ?? 'Other';

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-md ${className}`}
    >
      <div className="relative aspect-[4/3] rounded-t-2xl bg-[#F3F3F3] p-4">
        <span className="absolute right-4 top-4 z-10 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-900 shadow-sm">
          {tag}
        </span>
        <img
          src={product.image}
          alt=""
          className="h-full w-full object-contain object-center"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-1 flex-col bg-white px-4 pb-4 pt-3">
        <h3 className="text-[15px] font-bold leading-snug text-black">{product.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-1 text-sm text-neutral-700">
          <FaStar className="text-amber-500" aria-hidden />
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-neutral-500">
            ({formatReviewCount(reviews)} Reviews)
          </span>
        </div>
        <p className="mt-2 text-lg font-bold text-black">{'$' + product.price.toFixed(2)}</p>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <button type="button" onClick={onAddToCart} className={NEXA_OUTLINE_PILL_PRODUCT}>
            Add to Chart
          </button>
          <button type="button" onClick={onBuyNow} className={NEXA_BLACK_PILL_PRODUCT}>
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
