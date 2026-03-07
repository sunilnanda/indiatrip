"use client";
import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#flights", label: "Flights" },
  { href: "#overview", label: "Overview" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#options", label: "Confirmed Plans" },
  { href: "#summary", label: "Summary" },
  { href: "#total-cost", label: "Total Cost" },
];

export default function Navbar() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 print:hidden">
      <div className="max-w-6xl mx-auto flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
    </nav>
  );
}
