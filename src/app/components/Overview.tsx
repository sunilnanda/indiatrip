"use client";
import { motion } from "framer-motion";
import { routeStops } from "../data";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function Overview() {
  return (
    <section id="overview" className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Trip at a Glance
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          A journey through faith, family and the beauty of North India
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
        {[
          { number: "7+", label: "Cities & Towns" },
          { number: "31", label: "Days in India" },
          { number: "8", label: "Family Members" },
          { number: "5", label: "States & UTs" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-4 sm:p-5 text-center shadow-sm border border-gray-100"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
              {stat.number}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Route Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 text-center">
          Route Map
        </h3>

        {/* Desktop: horizontal */}
        <div className="hidden sm:flex items-center justify-center flex-wrap gap-1">
          {routeStops.map((stop, i) => (
            <div key={stop.city + i} className="flex items-center gap-1">
              <div className="text-center px-2 py-2">
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: stop.color }}
                />
                <p className="text-sm font-semibold text-gray-800">
                  {stop.city}
                </p>
                <p className="text-xs text-gray-400">{stop.dates}</p>
              </div>
              {i < routeStops.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="flex sm:hidden flex-col items-start gap-0">
          {routeStops.map((stop, i) => (
            <div key={stop.city + i} className="flex flex-col items-start">
              <div className="flex items-center gap-3 py-1.5">
                <div
                  className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: stop.color }}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {stop.city}
                  </p>
                  <p className="text-xs text-gray-400">{stop.dates}</p>
                </div>
              </div>
              {i < routeStops.length - 1 && (
                <div className="ml-[5px] pl-px">
                  <ArrowDown className="w-3.5 h-3.5 text-gray-300 my-0.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
