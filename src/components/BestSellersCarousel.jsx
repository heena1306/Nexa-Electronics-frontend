import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

const GAP_PX = 16; // matches gap-4

/**
 * Horizontal best-sellers row: arrows, swipe (native), mouse drag; 4–5 visible on lg/xl.
 * Theme-only neutrals / white; ProductCard unchanged.
 */
export default function BestSellersCarousel({
  products,
  onAddToCart,
  onBuyNow,
  onQuickView,
  isWishlisted,
  onWishlistToggle,
}) {
  const scrollerRef = useRef(null);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startScroll: 0,
  });
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanLeft(scrollLeft > 2);
    setCanRight(scrollLeft < max - 2);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [products, updateArrows]);

  const scrollStep = useCallback((dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector("[data-carousel-slide]");
    const w = slide?.getBoundingClientRect().width ?? 280;
    el.scrollBy({
      left: dir * (w + GAP_PX),
      behavior: "smooth",
    });
  }, []);

  const onPointerDown = useCallback((e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    if (e.target.closest?.("button, a, input, select, textarea, [data-no-drag]")) {
      return;
    }
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const endDrag = useCallback((e) => {
    const el = scrollerRef.current;
    const d = dragRef.current;
    if (!d.active || (e && e.pointerId !== d.pointerId)) return;
    dragRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      startScroll: 0,
    };
    document.body.style.userSelect = "";
    if (el) {
      el.style.cursor = "grab";
      if (e) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
    }
  }, []);

  const onLostPointerCapture = useCallback(() => {
    const el = scrollerRef.current;
    dragRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      startScroll: 0,
    };
    document.body.style.userSelect = "";
    if (el) el.style.cursor = "grab";
  }, []);

  const onPointerMove = useCallback((e) => {
    const el = scrollerRef.current;
    const d = dragRef.current;
    if (!d.active || !el || e.pointerId !== d.pointerId) return;
    if (e.pointerType !== "mouse") return;
    e.preventDefault();
    const dx = e.clientX - d.startX;
    el.scrollLeft = d.startScroll - dx;
  }, []);

  return (
    <div className="relative">
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#F9F9F9] to-transparent sm:w-12 transition-opacity duration-300 ${
          canLeft ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#F9F9F9] to-transparent sm:w-12 transition-opacity duration-300 ${
          canRight ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

      <button
        type="button"
        data-no-drag
        aria-label="Scroll best sellers left"
        disabled={!canLeft}
        onClick={() => scrollStep(-1)}
        className="nexa-btn-surface absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-md ring-1 ring-black/[0.04] transition duration-300 hover:border-neutral-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-25 sm:flex md:left-1"
      >
        <FaChevronLeft className="h-4 w-4" aria-hidden />
      </button>
      <button
        type="button"
        data-no-drag
        aria-label="Scroll best sellers right"
        disabled={!canRight}
        onClick={() => scrollStep(1)}
        className="nexa-btn-surface absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-md ring-1 ring-black/[0.04] transition duration-300 hover:border-neutral-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-25 sm:flex md:right-1"
      >
        <FaChevronRight className="h-4 w-4" aria-hidden />
      </button>

      <div
        ref={scrollerRef}
        className="rec-scroll -mx-1 flex cursor-grab touch-pan-x gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-1 pb-2 pt-1 [-webkit-overflow-scrolling:touch] snap-x snap-mandatory md:px-0"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={onLostPointerCapture}
        role="region"
        aria-roledescription="carousel"
        aria-label="Best sellers"
      >
        {products.map((p) => (
          <div
            key={p.id}
            data-carousel-slide
            className={`flex h-full min-h-0 min-w-0 shrink-0 snap-start transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [will-change:transform] hover:z-[1] hover:scale-[1.02] motion-reduce:transition-transform motion-reduce:hover:scale-100 ${
              // 1 + peek → 2 → 3 → 4 → 5 visible (width = scrollport %)
              "w-[min(20rem,calc(100%-1.25rem))] sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)] xl:w-[calc((100%-4rem)/5)]"
            }`}
          >
            <div className="flex h-full min-h-0 w-full min-w-0 items-stretch">
              <ProductCard
                product={p}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onQuickView={onQuickView}
                wishlisted={
                  isWishlisted ? isWishlisted(p.id) : undefined
                }
                onWishlistToggle={
                  onWishlistToggle
                    ? () => onWishlistToggle(p.id)
                    : undefined
                }
                className="h-full min-h-0 w-full min-w-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
