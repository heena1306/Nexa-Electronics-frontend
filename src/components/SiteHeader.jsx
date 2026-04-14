import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import SearchWithSuggestions from "./SearchWithSuggestions";

const AVATAR_IMG =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&q=80";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

export default function SiteHeader({ variant = "light" }) {
  const { cartCount } = useCart();

  const bar =
    variant === "dark"
      ? "border-b border-white/10 bg-black/40 backdrop-blur-md"
      : "border-b border-[var(--nexa-border)] bg-white/95 backdrop-blur-md";

  const logoClass =
    variant === "dark"
      ? "text-lg font-bold tracking-tight text-white drop-shadow-sm"
      : "text-lg font-bold tracking-tight text-neutral-900";

  const linkClass =
    variant === "dark"
      ? "text-sm font-medium text-white/90 transition hover:text-white"
      : "text-sm font-medium text-neutral-700 transition hover:text-[var(--nexa-accent)]";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${bar}`}>
      <div className={`${PAGE_WRAP} py-3.5 sm:py-4`}>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
          <Link to="/home" className={`shrink-0 ${logoClass}`}>
            Nexa Electronics
          </Link>

          <div className="order-3 flex min-w-0 flex-[1_1_100%] items-center sm:order-none sm:mx-6 sm:max-w-lg sm:flex-[1_1_auto] lg:max-w-2xl">
            <SearchWithSuggestions
              variant="header"
              inputId="site-search-input"
              className="w-full"
            />
          </div>

          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Secondary"
          >
            <Link to="/shop/all" className={linkClass}>
              Shop
            </Link>
            <Link to="/categories" className={linkClass}>
              Categories
            </Link>
            <Link to="/brands" className={linkClass}>
              Brands
            </Link>
            <Link to="/track-order" className={linkClass}>
              Track order
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/cart"
              className="nexa-cart-pill relative hidden sm:inline-flex"
              aria-label={`Cart, ${cartCount} items`}
            >
              <FaShoppingBag className="h-4 w-4 shrink-0 !text-white" aria-hidden />
              <span className="sr-only">Cart</span>
              {cartCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[10px] font-bold !text-white shadow-sm ring-2 ring-white"
                  style={{ backgroundColor: "var(--nexa-accent)" }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:border-neutral-300 hover:shadow-md sm:hidden"
              aria-label={`Cart, ${cartCount} items`}
            >
              <FaShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
                  style={{ backgroundColor: "var(--nexa-accent)" }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className="hidden h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-neutral-200 shadow-sm sm:block"
              aria-label="Account"
            >
              <img
                src={AVATAR_IMG}
                alt=""
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
