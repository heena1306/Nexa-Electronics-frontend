/** Mirror ProductCard stock heuristic */
function stockForProduct(product) {
  if (product.stock === "low") return "low";
  if (product.stock === "out") return "out";
  if (product.stock === "in") return "in";
  return product.id % 9 === 0 ? "low" : "in";
}

function matchesPriceBand(priceUsd, bandId) {
  switch (bandId) {
    case "b1":
      return priceUsd < 100;
    case "b2":
      return priceUsd >= 100 && priceUsd < 200;
    case "b3":
      return priceUsd >= 200 && priceUsd < 400;
    case "b4":
      return priceUsd >= 400;
    default:
      return true;
  }
}

/** Keyword heuristics for sidebar category ids → product data */
function categoryMatch(product, categoryId) {
  if (!categoryId) return true;
  const t = `${product.title} ${product.category ?? ""}`.toLowerCase();
  const checks = {
    c1: /laptop|computer|monitor|display|keyboard|mouse|hub|stand|wearable|watch|ssd|router/,
    c2: /accessories|hub|cable|plug|adapter|stand|case/,
    c3: /cpu|board|memory|ram/,
    c4: /storage|ssd|memory/,
    c5: /monitor|display|television|\btv\b|ultrawide|led/,
    c6: /audio|headphone|speaker|earbud|soundbar|turntable|noise/,
    c7: /router|mesh|wi-?fi|network/,
    c8: /gaming|rgb/,
    c9: /smart|streaming|stick|home/,
    c10: /camera|dash|action|photo|printer|mirrorless/,
  };
  const re = checks[categoryId];
  return re ? re.test(t) : true;
}

function brandMatch(product, brandIds, getBrandLabel) {
  if (!brandIds.length) return true;
  const hay = `${product.title} ${product.category ?? ""}`.toLowerCase();
  return brandIds.some((id) => {
    const label = getBrandLabel(id);
    if (!label) return false;
    const token = label.toLowerCase().split(/\s+/)[0];
    return hay.includes(token);
  });
}

/**
 * @param {object[]} products
 * @param {object} f - catalog filter model from Home/Sidebar
 * @param {(id: string) => string|undefined} getBrandLabel
 */
export function applyCatalogFilters(products, f, getBrandLabel) {
  return products.filter((p) => {
    if (p.price < f.priceMin || p.price > f.priceMax) return false;
    if (f.minStars > 0 && (p.rating ?? 0) < f.minStars) return false;
    if (f.bands.length && !f.bands.some((bid) => matchesPriceBand(p.price, bid))) {
      return false;
    }
    if (f.activeCategoryId && !categoryMatch(p, f.activeCategoryId)) {
      return false;
    }
    if (f.brands.length && !brandMatch(p, f.brands, getBrandLabel)) {
      return false;
    }
    if (f.inStockOnly) {
      const s = stockForProduct(p);
      if (s === "low" || s === "out") return false;
    }
    return true;
  });
}

export const INITIAL_CATALOG_FILTERS = {
  activeCategoryId: null,
  priceMin: 10,
  priceMax: 2000,
  bands: [],
  brands: [],
  colors: [],
  minStars: 0,
  inStockOnly: false,
  includeOutOfStock: true,
};

export function catalogFiltersAreActive(f) {
  return (
    f.activeCategoryId != null ||
    f.bands.length > 0 ||
    f.brands.length > 0 ||
    f.colors.length > 0 ||
    f.minStars > 0 ||
    f.inStockOnly ||
    f.priceMin !== INITIAL_CATALOG_FILTERS.priceMin ||
    f.priceMax !== INITIAL_CATALOG_FILTERS.priceMax
  );
}
