"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { itinerary } from "../data";
import TransportOptions from "./TransportOptions";

const colorMap = {
  saffron: {
    dot: "border-orange-500",
    badge: "bg-gradient-to-r from-orange-500 to-orange-400",
  },
  green: {
    dot: "border-green-600",
    badge: "bg-gradient-to-r from-green-600 to-green-500",
  },
  gold: {
    dot: "border-amber-500",
    badge: "bg-gradient-to-r from-amber-600 to-amber-400",
  },
  navy: {
    dot: "border-blue-800",
    badge: "bg-gradient-to-r from-blue-800 to-blue-600",
  },
  purple: {
    dot: "border-purple-600",
    badge: "bg-gradient-to-r from-purple-600 to-purple-500",
  },
};

export default function Timeline() {
  return (
    <section id="itinerary" className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Day-by-Day Itinerary
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          The confirmed journey from Melbourne to spiritual India
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] sm:left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 via-green-500 to-blue-800 rounded-full md:left-1/2 md:-translate-x-px" />

        {itinerary.map((day, i) => {
          const colors = colorMap[day.color];
          const isEven = i % 2 === 0;

          return (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className={`relative pb-8 sm:pb-10 pl-11 sm:pl-16 md:pl-0 md:w-1/2 ${
                isEven
                  ? "md:ml-0 md:pr-10 md:text-right"
                  : "md:ml-[50%] md:pl-10 md:text-left"
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute left-[12px] sm:left-[18px] top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[3px] sm:border-4 ${colors.dot} bg-white z-10 md:left-auto ${
                  isEven ? "md:right-[-10px]" : "md:left-[-10px]"
                }`}
              />

              {/* Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
                <span
                  className={`inline-block ${colors.badge} text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3`}
                >
                  {day.date} &bull; {day.dayLabel}
                </span>

                <div className="flex items-center gap-1.5 text-orange-500 text-[11px] sm:text-xs font-semibold mb-1">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="truncate">{day.location}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5">
                  {day.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {day.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3">
                  {day.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg ${
                        tag.free
                          ? "bg-green-50 text-green-700 font-semibold"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tag.free && "✓ "}
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Transport Options */}
                {day.transport && (
                  <TransportOptions
                    options={day.transport}
                    title={`Transport: ${day.from || ""} → ${day.to || ""}`}
                    legId={day.id}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
