import { useState } from "react";
import {
  FaHome,
  FaMusic,
  FaMobileAlt,
  FaHdd,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const CATEGORIES = [
  { id: "home", label: "For Home", icon: FaHome },
  { id: "music", label: "For Music", icon: FaMusic },
  { id: "phone", label: "For Phone", icon: FaMobileAlt },
  { id: "storage", label: "For Storage", icon: FaHdd },
];

const FILTER_GROUPS = [
  { id: "new", label: "New Arrival" },
  { id: "best", label: "Best Seller" },
  { id: "discount", label: "On Discount" },
];

export default function Sidebar() {
  const [activeAll, setActiveAll] = useState(true);
  const [openFilters, setOpenFilters] = useState(() =>
    Object.fromEntries(FILTER_GROUPS.map((g) => [g.id, false]))
  );

  const toggleFilter = (id) => {
    setOpenFilters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-full bg-white p-5 lg:max-w-[260px]">
      <h2 className="text-sm font-bold text-black">Category</h2>
      <div className="mt-4 space-y-0">
        <button
          type="button"
          onClick={() => setActiveAll(true)}
          className={
            "nexa-btn-sidebar-row flex w-full items-center gap-2 px-2 py-3 text-left text-sm font-semibold " +
            (activeAll
              ? "bg-[#EAEAEA] text-black"
              : "bg-transparent text-neutral-800")
          }
        >
          <span>All Product</span>
          <span
            className="ml-auto min-w-[1.75rem] rounded-sm bg-[#FF4D4D] px-1.5 py-0.5 text-center text-[11px] font-bold text-white"
            aria-hidden
          >
            32
          </span>
        </button>
        <ul className="mt-1 space-y-0 pl-0">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActiveAll(false)}
                  className="nexa-btn-sidebar-row flex w-full items-center gap-2.5 px-2 py-2.5 text-left text-sm font-medium text-neutral-800 bg-transparent"
                >
                  <Icon className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 space-y-0 border-t border-neutral-200 pt-6">
        {FILTER_GROUPS.map((g) => {
          const open = openFilters[g.id];
          return (
            <div key={g.id} className="border-b border-neutral-200 last:border-0">
              <button
                type="button"
                onClick={() => toggleFilter(g.id)}
                className="nexa-btn-sidebar-filter flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-black"
              >
                {g.label}
                {open ? (
                  <FaChevronUp className="text-xs text-neutral-400" />
                ) : (
                  <FaChevronDown className="text-xs text-neutral-400" />
                )}
              </button>
              {open && (
                <div className="pb-3 pl-1 text-xs leading-relaxed text-neutral-600">
                  Filter by {g.label.toLowerCase()} — browse curated Nexa picks.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
