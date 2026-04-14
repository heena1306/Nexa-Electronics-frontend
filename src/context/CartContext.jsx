/* eslint-disable react-refresh/only-export-components -- provider + hook */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { getProductById } from "../data/catalog";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (productId, qty = 1, opts = {}) => {
      const p = getProductById(productId);
      if (!p) return;
      const colorId = opts.colorId ?? null;
      setItems((prev) => {
        const idx = prev.findIndex(
          (l) => l.productId === productId && l.colorId === colorId
        );
        if (idx === -1) {
          return [
            ...prev,
            {
              productId,
              qty: Math.max(1, qty),
              colorId,
              title: p.title,
              image: p.image,
              price: p.price,
            },
          ];
        }
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          qty: next[idx].qty + Math.max(1, qty),
        };
        return next;
      });
      if (opts.silent !== true) showToast("Added to cart");
    },
    [showToast]
  );

  const setQty = useCallback((productId, colorId, qty) => {
    const q = Math.max(0, Math.floor(Number(qty) || 0));
    setItems((prev) => {
      const idx = prev.findIndex(
        (l) => l.productId === productId && l.colorId === colorId
      );
      if (idx === -1) return prev;
      if (q === 0) return prev.filter((_, i) => i !== idx);
      const next = [...prev];
      next[idx] = { ...next[idx], qty: q };
      return next;
    });
  }, []);

  const removeLine = useCallback((productId, colorId) => {
    setItems((prev) =>
      prev.filter(
        (l) => !(l.productId === productId && l.colorId === colorId)
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartCount = useMemo(
    () => items.reduce((a, l) => a + l.qty, 0),
    [items]
  );

  const subtotalUsd = useMemo(
    () => items.reduce((a, l) => a + l.price * l.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      cartCount,
      subtotalUsd,
      toast,
      dismissToast: () => setToast(null),
    }),
    [
      items,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      cartCount,
      subtotalUsd,
      toast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
