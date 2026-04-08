/** Catalog `price` / `compareAtPrice` values are treated as USD-equivalent for display conversion. */
export const USD_TO_INR = 83;

export function inrFromCatalog(usdAmount) {
  return Math.round(Number(usdAmount) * USD_TO_INR);
}

export function formatINR(amountRupees) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountRupees);
}

export function formatCatalogPrice(usdAmount) {
  return formatINR(inrFromCatalog(usdAmount));
}
