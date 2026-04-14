import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaChevronRight,
  FaHome,
  FaPrint,
  FaSearch,
  FaFileInvoice,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

const STEPS = [
  { key: "placed", label: "Order placed", date: "Jan 15, 2024" },
  { key: "confirmed", label: "Confirmed", date: "Jan 15, 2024" },
  { key: "processed", label: "Processed", date: "Jan 16, 2024" },
  { key: "shipped", label: "Shipped", date: "Jan 17, 2024" },
  { key: "delivered", label: "Delivered", date: "Jan 20, 2024" },
];

const TIMELINE = [
  {
    title: "Order placed",
    desc: "Your order has been received",
    time: "Jan 15, 2024 · 10:00 AM",
    done: true,
  },
  {
    title: "Order confirmed",
    desc: "We've confirmed your order",
    time: "Jan 15, 2024 · 11:45 AM",
    done: true,
  },
  {
    title: "Order processed",
    desc: "Your items are being prepared for shipment",
    time: "Jan 16, 2024 · 09:15 AM",
    done: true,
  },
  {
    title: "Shipped",
    desc: "Your order is on the way",
    time: "Jan 17, 2024 · 03:30 PM",
    done: true,
    current: true,
  },
  {
    title: "Delivered",
    desc: "Expected delivery",
    time: "Jan 20, 2024",
    done: false,
  },
];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f4f4f5] pb-20 pt-6 sm:pt-10">
      <div className={PAGE_WRAP}>
        <nav
          className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-neutral-500"
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
          <span className="font-semibold text-neutral-900">Track order</span>
        </nav>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Track your order
          </h1>
          <p className="mt-2 text-neutral-600">
            Enter your order details to check the current status
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-neutral-900">Find your order</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Use the order ID from your confirmation email.
          </p>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="oid"
                className="block text-xs font-semibold uppercase tracking-wide text-neutral-500"
              >
                Order ID
              </label>
              <input
                id="oid"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="AG-2024-7890"
                className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none ring-black/5 focus:border-neutral-400 focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="em"
                className="block text-xs font-semibold uppercase tracking-wide text-neutral-500"
              >
                Email address
              </label>
              <input
                id="em"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="nexa-btn-solid-black flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold"
              >
                <FaSearch className="h-4 w-4" aria-hidden />
                Track order
              </button>
            </div>
          </form>
        </div>

        {submitted && (
          <div className="mx-auto mt-8 max-w-4xl space-y-6">
            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-lg font-bold text-neutral-900">
                  Order AG-2024-7890
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  Placed on January 15, 2024
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Shipped
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700"
                >
                  <FaFileInvoice className="h-3.5 w-3.5" />
                  Invoice
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700"
                >
                  <FaPrint className="h-3.5 w-3.5" />
                  Print
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="font-bold text-neutral-900">
                    Delivery progress
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Estimated delivery: 2024-01-20
                  </p>
                </div>
              </div>
              <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-neutral-200">
                <div className="h-full w-[72%] rounded-full bg-neutral-800" />
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-5">
                {STEPS.map((s, i) => (
                  <div key={s.key} className="text-center">
                    <div
                      className={
                        "mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 " +
                        (i < 4
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-neutral-200 bg-white text-neutral-300")
                      }
                    >
                      {i < 4 ? (
                        <FaCheck className="h-5 w-5" />
                      ) : (
                        <FaBox className="h-5 w-5" />
                      )}
                    </div>
                    <p className="mt-2 text-xs font-semibold text-neutral-900">
                      {s.label}
                    </p>
                    <p className="text-[11px] text-neutral-500">{s.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-neutral-900">Order timeline</h3>
              <ul className="relative mt-6 space-y-0 border-l border-neutral-200 pl-6">
                {TIMELINE.map((row) => (
                  <li key={row.title} className="relative pb-8 last:pb-0">
                    <span
                      className={
                        "absolute -left-[29px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 " +
                        (row.done
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-neutral-200 bg-white text-neutral-300")
                      }
                    >
                      {row.done ? (
                        <FaCheck className="h-3 w-3" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-neutral-300" />
                      )}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-neutral-900">
                        {row.title}
                      </p>
                      {row.current && (
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold uppercase text-orange-700">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-neutral-600">{row.desc}</p>
                    <p className="mt-1 text-xs text-neutral-400">{row.time}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <FaTruck className="mt-1 h-5 w-5 text-neutral-700" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-neutral-500">
                      Carrier
                    </p>
                    <p className="font-bold text-neutral-900">FedEx</p>
                    <p className="mt-2 text-sm text-neutral-600">
                      Tracking:{" "}
                      <span className="font-mono font-semibold text-neutral-900">
                        7849-2201-9912
                      </span>
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="text-neutral-500">Status: </span>
                      <span className="font-semibold text-blue-600">
                        In transit
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 h-5 w-5 text-neutral-700" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-neutral-500">
                      Last location
                    </p>
                    <p className="font-bold text-neutral-900">NEW YORK, NY</p>
                    <p className="mt-2 text-sm text-neutral-600">
                      Package departed from regional facility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-900 px-6 py-8 text-center text-white">
              <p className="text-sm text-white/85">
                Need help with your order? Our support team is here for you.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Link
                  to="/home"
                  className="rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact support
                </Link>
                <Link
                  to="/shop/all"
                  className="rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View order details
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
