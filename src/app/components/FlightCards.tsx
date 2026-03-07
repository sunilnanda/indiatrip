"use client";
import { motion } from "framer-motion";
import { Plane, ArrowRight } from "lucide-react";
import { flights } from "../data";

function FlightCard({
  flight,
  type,
}: {
  flight: typeof flights.departure;
  type: "Departure" | "Return";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div
        className={`px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          type === "Departure"
            ? "bg-gradient-to-r from-orange-500 to-orange-600"
            : "bg-gradient-to-r from-blue-600 to-blue-700"
        }`}
      >
        <div className="flex items-center gap-2">
          <Plane
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ${type === "Return" ? "rotate-180" : ""}`}
          />
          <span className="text-white font-semibold text-xs sm:text-sm">{type}</span>
        </div>
        <span className="text-white/80 text-[10px] sm:text-xs">{flight.date}</span>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* From */}
          <div className="text-center min-w-0">
            <p className="text-xl sm:text-3xl font-bold text-gray-900">
              {flight.departTime}
            </p>
            <p className="text-sm sm:text-lg font-semibold text-gray-700 mt-0.5 sm:mt-1">
              {flight.from}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400">{flight.fromTerminal}</p>
          </div>

          {/* Middle */}
          <div className="flex-1 flex flex-col items-center gap-0.5 sm:gap-1 px-1 sm:px-2 min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-400 truncate">{flight.duration}</p>
            <div className="w-full flex items-center gap-1">
              <div className="flex-1 h-px bg-gray-300" />
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400">{flight.stops}</p>
          </div>

          {/* To */}
          <div className="text-center min-w-0">
            <p className="text-xl sm:text-3xl font-bold text-gray-900">
              {flight.arriveTime}
            </p>
            <p className="text-sm sm:text-lg font-semibold text-gray-700 mt-0.5 sm:mt-1">
              {flight.to}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400">{flight.toTerminal}</p>
          </div>
        </div>

        {/* Footer details */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 rounded-lg flex items-center justify-center text-xs sm:text-sm">
              ✈️
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-700">
                {flight.airline}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {flight.flightNumbers.join(" → ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
              {flight.class}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-white bg-green-500 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
              {flight.status}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FlightCards() {
  return (
    <section id="flights" className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          ✈️ Flight Details
        </h2>
        <p className="text-sm sm:text-base text-gray-500">Booked & confirmed on Malaysia Airlines</p>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <FlightCard flight={flights.departure} type="Departure" />
        <FlightCard flight={flights.return} type="Return" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6"
      >
        Total days in India: <strong className="text-gray-600">31 days</strong>{" "}
        (31 March – 1 May 2026)
      </motion.p>
    </section>
  );
}
