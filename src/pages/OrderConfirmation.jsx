import { Link } from "react-router-dom";
import { FaCheck, FaChevronRight, FaHome, FaLeaf } from "react-icons/fa";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

export default function OrderConfirmation() {
  return (
    <div className="bg-white pb-20 pt-8 sm:pt-12">
      <div className={PAGE_WRAP}>
        <nav
          className="mb-10 flex flex-wrap items-center gap-1.5 text-sm text-neutral-500"
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
          <span className="font-semibold text-neutral-900">Confirmation</span>
        </nav>

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-2xl" aria-hidden>
            ★
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Woohoo! Your order is confirmed.
          </h1>
          <p className="mt-2 text-2xl" aria-hidden>
            ★
          </p>
          <p className="mx-auto mt-6 max-w-lg text-neutral-600">
            Nexa Electronics will send you updates as your order moves. You will
            receive an email when it ships.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative flex items-start justify-between gap-4 px-2">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-neutral-200" />
            <div className="relative z-10 flex flex-1 flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <FaCheck className="h-4 w-4" />
              </span>
              <p className="mt-3 text-xs font-semibold text-neutral-900">
                Ordered
              </p>
              <p className="text-[11px] text-neutral-500">Feb 17</p>
            </div>
            <div className="relative z-10 flex flex-1 flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-300 bg-white" />
              <p className="mt-3 text-xs font-semibold text-neutral-900">
                Ready to ship
              </p>
            </div>
            <div className="relative z-10 flex flex-1 flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-300 bg-white" />
              <p className="mt-3 text-xs font-semibold text-neutral-900">
                Expected delivery
              </p>
              <p className="text-[11px] text-neutral-500">Feb 22 – 26</p>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/track-order"
              className="nexa-btn-solid-black inline-flex rounded-full px-10 py-3 text-sm font-semibold"
            >
              View your order
            </Link>
          </div>
          <p className="mx-auto mt-4 max-w-md text-center text-xs text-neutral-500">
            Estimated delivery times are approximate.{" "}
            <span className="underline">Contact Nexa support</span> anytime.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-xl font-bold text-neutral-900">Order details</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Confirmation{" "}
            <span className="font-semibold text-neutral-900 underline">
              NE-2026-88421
            </span>
          </p>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex gap-4 border-b border-neutral-100 pb-5">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F3F3F3]">
                <img
                  src="https://images.pexels.com/photos/274924/pexels-photo-274924.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-neutral-900">
                  Mirrorless Camera Kit
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Transaction ID: TXN-928374
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Qty: 1 · Color: Black
                </p>
              </div>
              <p className="shrink-0 text-sm font-bold text-neutral-900">
                ₹1,03,709
              </p>
            </div>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-neutral-500">
                  Shipping address
                </p>
                <p className="mt-2 text-sm font-semibold text-neutral-900">
                  John Doe
                </p>
                <p className="text-sm text-neutral-600">
                  221B Baker Street
                  <br />
                  Bengaluru, KA 560001
                  <br />
                  India
                </p>
                <p className="mt-2 text-sm text-neutral-600">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-neutral-500">
                  Payment
                </p>
                <p className="mt-2 text-sm text-neutral-800">
                  Paid with Credit card · **** 4242
                </p>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>₹1,03,709</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-100 pt-2 font-bold text-neutral-900">
                    <span>Total (1 item)</span>
                    <span>₹1,03,709</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-3 text-xs text-neutral-600">
              <FaLeaf className="h-4 w-4 text-emerald-600" aria-hidden />
              Nexa offsets carbon emissions from every delivery where possible.
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-xl font-bold text-neutral-900">Shop information</h2>
          <div className="mt-4 rounded-2xl border border-neutral-200 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&q=80"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Nexa Electronics</p>
                  <p className="text-sm text-neutral-600">
                    Official store · Curated tech
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Support available 24/7
                  </p>
                </div>
              </div>
              <Link
                to="/track-order"
                className="nexa-btn-solid-black inline-flex shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold"
              >
                Help with order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
