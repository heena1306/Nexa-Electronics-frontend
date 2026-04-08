/**
 * Layout-only classes — colors come from index.css `.nexa-btn-solid-black` / `.nexa-btn-outline-white`
 * so the global `button { background: transparent }` reset cannot hide Buy Now / Search / Send.
 */
export const NEXA_BLACK_PILL_SEARCH =
  "nexa-btn-solid-black inline-flex shrink-0 items-center justify-center rounded-full text-sm font-semibold min-w-[6.75rem]";

export const NEXA_BLACK_PILL_PRODUCT =
  "nexa-btn-solid-black nexa-btn-product inline-flex flex-1 items-center justify-center rounded-full text-sm font-semibold min-w-0 sm:min-w-[6.5rem]";

export const NEXA_OUTLINE_PILL_PRODUCT =
  "nexa-btn-outline-white nexa-btn-product inline-flex flex-1 items-center justify-center rounded-full text-sm font-semibold min-w-0";

/** Smaller secondary “Add to cart” on product cards */
export const NEXA_OUTLINE_CART_COMPACT =
  "nexa-btn-outline-subtle inline-flex items-center justify-center rounded-full min-w-0 max-w-full";

/** Add to cart — same footprint as Buy Now on product cards */
export const NEXA_OUTLINE_CART_MATCH =
  "nexa-btn-outline-subtle nexa-btn-card-cart inline-flex flex-1 items-center justify-center rounded-full min-w-0 basis-0";

/** Primary “Buy now” on product cards */
export const NEXA_BLACK_BUY_PRIMARY =
  "nexa-btn-solid-black nexa-btn-card-buy inline-flex flex-1 items-center justify-center rounded-full min-w-0";

/** Black pill for “View more” — uses `.nexa-btn-slow-hover` in index.css */
export const NEXA_BLACK_VIEW_MORE =
  "nexa-btn-solid-black nexa-btn-slow-hover inline-flex items-center justify-center rounded-full px-10 py-3 text-sm font-semibold min-w-[11rem]";
