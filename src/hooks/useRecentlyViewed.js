import { useCallback, useEffect, useState } from "react";

const KEY = "nexa-recently-viewed-ids";
const MAX = 8;

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

export function useRecentlyViewed() {
  const [ids, setIds] = useState(readIds);

  const recordProduct = useCallback((productId) => {
    setIds((prev) => {
      const next = [
        productId,
        ...prev.filter((id) => id !== productId),
      ].slice(0, MAX);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) setIds(readIds());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { recentlyViewedIds: ids, recordRecentlyViewed: recordProduct };
}
