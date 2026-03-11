"use client";
import { useEffect, useState } from "react";

const DEPARTURE = new Date("2026-03-31T00:30:00+11:00");

const links = [
  { href: "#flights", label: "Flights" },
  { href: "#overview", label: "Overview" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#options", label: "Confirmed Plans" },
  { href: "#checklist", label: "Checklist" },
  { href: "#notes", label: "Notes" },
  { href: "#summary", label: "Summary" },
  { href: "#total-cost", label: "Total Cost" },
];

function getTimeLeft() {
  const total = DEPARTURE.getTime() - Date.now();
  if (total <= 0) return null;
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export default function Navbar() {
  const [active, setActive] = useState("#flights");
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);

    const onScroll = () => {
      const sections = links
        .map((l) => ({
          id: l.href,
          el: document.querySelector(l.href),
        }))
        .filter((s) => s.el);

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].el!.getBoundingClientRect();
        if (rect.top <= 120) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 print:hidden">
      <div className="max-w-6xl mx-auto flex items-center">
        {/* Title + Countdown */}
        <div className="flex items-center gap-3 pl-3 sm:pl-4 pr-2 sm:pr-4 py-2 shrink-0 border-r border-gray-200">
          <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent whitespace-nowrap">
            India 2026
          </span>
          {mounted && time && (
            <span className="text-[10px] sm:text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap tabular-nums">
              {time.days}d {String(time.hours).padStart(2, "0")}h{" "}
              {String(time.minutes).padStart(2, "0")}m{" "}
              {String(time.seconds).padStart(2, "0")}s
            </span>
          )}
          {mounted && !time && (
            <span className="text-[10px] sm:text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md whitespace-nowrap">
              Trip Started!
            </span>
          )}
        </div>

        {/* Nav links */}
        <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                active === link.href
                  ? "text-orange-500 border-orange-500"
                  : "text-gray-400 border-transparent hover:text-orange-400"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
