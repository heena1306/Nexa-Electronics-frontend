import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight, FaHome, FaTrash } from "react-icons/fa";
import { getProductById } from "../data/catalog";
import { useCart } from "../context/CartContext";
import { formatCatalogPrice } from "../utils/currency";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

function colorLabel(productId, colorId) {
  if (!colorId) return null;
  const p = getProductById(productId);
  const c = p?.colors?.find((x) => x.id === colorId);
  return c?.label ?? null;
}

export default function Cart() {
  const navigate = useNavigate();
  const { items, setQty, removeLine, subtotalUsd } = useCart();

  return (
    <div className="bg-neutral-50/90 pb-20 pt-6 sm:pt-8">
      <div className={PAGE_WRAP}>
        <nav
          className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-neutral-500"
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
          <span className="font-semibold text-neutral-900">Cart</span>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
          Your cart
        </h1>
        <p className="mt-2 text-neutral-600">
          Review items and checkout when you are ready.
        </p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-neutral-200 bg-white px-6 py-14 text-center shadow-sm">
            <p className="text-lg font-semibold text-neutral-800">
              Your cart is empty.
            </p>
            <Link
              to="/shop/all"
              className="nexa-btn-solid-black mt-4 inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 py-2.5 text-sm font-semibold !text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_min(24rem,100%)] lg:items-start">
            <ul className="space-y-4">
              {items.map((line) => {
                const cl = colorLabel(line.productId, line.colorId);
                return (
                  <li
                    key={`${line.productId}-${line.colorId ?? "x"}`}
                    className="flex flex-col gap-4 rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm ring-1 ring-black/[0.04] sm:flex-row sm:items-center sm:gap-6 sm:p-5"
                  >
                    <Link
                      to={`/product/${line.productId}`}
                      className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#F3F3F3] sm:h-24 sm:w-24"
                    >
                      <img
                        src={line.image}
                        alt=""
                        className="h-full w-full object-contain p-2"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/product/${line.productId}`}
                        className="text-base font-bold text-neutral-900 hover:underline"
                      >
                        {line.title}
                      </Link>
                      {cl && (
                        <p className="mt-1 text-sm text-neutral-500">
                          Color: {cl}
                        </p>
                      )}
                      <p className="mt-1 text-sm font-semibold text-neutral-900">
                        {formatCatalogPrice(line.price)} each
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:flex-col sm:items-end">
                      <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-1">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-neutral-800 transition hover:bg-white"
                          onClick={() =>
                            setQty(line.productId, line.colorId, line.qty - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-neutral-800 transition hover:bg-white"
                          onClick={() =>
                            setQty(line.productId, line.colorId, line.qty + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={() =>
                          removeLine(line.productId, line.colorId)
                        }
                      >
                        <FaTrash className="h-3 w-3" aria-hidden />
                        Remove
                      </button>
                    </div>
                    <p className="text-right text-lg font-bold text-neutral-900 sm:min-w-[6.5rem]">
                      {formatCatalogPrice(line.price * line.qty)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <aside className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-[0_8px_28px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]">
              <h2 className="text-lg font-bold text-neutral-900">
                Order summary
              </h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">
                    {formatCatalogPrice(subtotalUsd)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-neutral-900">
                    Calculated at checkout
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t border-neutral-200 pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-base font-bold text-neutral-900">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-neutral-900">
                    {formatCatalogPrice(subtotalUsd)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="nexa-btn-solid-black mt-6 flex w-full items-center justify-center rounded-full py-3.5 text-sm font-semibold"
                onClick={() => navigate("/order-confirmation")}
              >
                Checkout
              </button>
              <Link
                to="/shop/all"
                className="mt-4 block text-center text-sm font-semibold text-neutral-600 underline hover:text-neutral-900"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
