import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PAGE_WRAP =
  "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8 xl:px-10";

export default function SiteFooter() {
  return (
    <footer id="support" className="border-t border-neutral-200 bg-white">
      <div className={`${PAGE_WRAP} py-12`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-lg font-bold text-black">Nexa Electronics</p>
            <p className="mt-2 max-w-sm text-sm text-neutral-500">
              Premium electronics for modern living—curated gear, transparent
              pricing, and support you can count on.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span
                className="inline-flex h-9 items-center rounded-md border border-neutral-200 bg-white px-2.5 text-[11px] font-semibold text-neutral-600 shadow-sm"
                aria-hidden
              >
                Visa
              </span>
              <span
                className="inline-flex h-9 items-center rounded-md border border-neutral-200 bg-white px-2.5 text-[11px] font-semibold text-neutral-600 shadow-sm"
                aria-hidden
              >
                Mastercard
              </span>
              <span
                className="inline-flex h-9 items-center rounded-md border border-neutral-200 bg-white px-2.5 text-[11px] font-semibold text-neutral-600 shadow-sm"
                aria-hidden
              >
                PayPal
              </span>
              <span
                className="inline-flex h-9 items-center rounded-md border border-neutral-200 bg-white px-2.5 text-[11px] font-semibold text-neutral-600 shadow-sm"
                aria-hidden
              >
                UPI
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>
                <Link
                  to="/shop/all"
                  className="!text-neutral-600 no-underline hover:!text-black"
                >
                  All products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="!text-neutral-600 no-underline hover:!text-black"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/brands"
                  className="!text-neutral-600 no-underline hover:!text-black"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/mobiles"
                  className="!text-neutral-600 no-underline hover:!text-black"
                >
                  Mobiles
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/laptops"
                  className="!text-neutral-600 no-underline hover:!text-black"
                >
                  Laptops
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Information</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>
                <span className="text-neutral-600">About Nexa</span>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="!text-neutral-600 no-underline hover:!text-black"
                >
                  Track order
                </Link>
              </li>
              <li>
                <span className="text-neutral-600">Careers</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Customer service</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>
                <span className="text-neutral-600">Shipping</span>
              </li>
              <li>
                <span className="text-neutral-600">Returns</span>
              </li>
              <li>
                <span className="text-neutral-600">FAQ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 bg-[#F5F5F5]">
        <div
          className={`${PAGE_WRAP} flex flex-col items-center justify-between gap-4 py-5 text-xs text-neutral-500 sm:flex-row`}
        >
          <p className="!text-neutral-500">
            Copyright © {new Date().getFullYear()} Nexa Electronics. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://x.com"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-neutral-900"
              aria-label="X"
            >
              <FaXTwitter className="h-4 w-4 fill-current" />
            </a>
            <a
              href="https://facebook.com"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-neutral-900"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-3.5 w-3.5 fill-current" />
            </a>
            <a
              href="https://linkedin.com"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-neutral-900"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="h-3.5 w-3.5 fill-current" />
            </a>
            <a
              href="https://instagram.com"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-neutral-900"
              aria-label="Instagram"
            >
              <FaInstagram className="h-4 w-4 fill-current" />
            </a>
          </div>
          <div className="flex gap-6">
            <span className="!text-neutral-500">Terms of Service</span>
            <span className="!text-neutral-500">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
