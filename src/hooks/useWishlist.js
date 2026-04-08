import { useCallback, useEffect, useState } from "react";

const KEY = "nexa-wishlist-ids";

function readIds() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.map(Number).filter((n) => !Number.isNaN(n)) : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [ids, setIds] = useState(readIds);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) setIds(readIds());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next) => {
    setIds(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback((productId) => {
    setIds((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const has = useCallback((productId) => ids.includes(productId), [ids]);

  return { wishlistIds: ids, toggleWishlist: toggle, isWishlisted: has };
}
