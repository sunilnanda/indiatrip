"use client";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { flights } from "../data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FF9933 0%, #FF6F00 25%, #e65100 50%, #046A38 75%, #023020 100%)",
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl w-full"
      >
        {/* Flag stripes */}
        <div className="flex justify-center gap-1 mb-4 sm:mb-6">
          <div className="w-14 sm:w-20 h-1.5 sm:h-2 rounded-full bg-[#FF9933]" />
          <div className="w-14 sm:w-20 h-1.5 sm:h-2 rounded-full bg-white" />
          <div className="w-14 sm:w-20 h-1.5 sm:h-2 rounded-full bg-[#046A38]" />
        </div>

        <span className="text-4xl sm:text-6xl mb-3 sm:mb-4 block">🇮🇳</span>

        <h2 className="text-white/90 text-xs sm:text-sm md:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase font-light mb-1 sm:mb-2">
          Family Trip to
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
          Incredible India
        </h1>
        <h2 className="text-white/80 text-base sm:text-lg md:text-xl tracking-widest mb-4 sm:mb-6">
          March – April 2026
        </h2>

        {/* Flight Info Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 mb-4 sm:mb-6 max-w-full"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            <div className="text-left">
              <p className="text-white text-xs sm:text-sm font-semibold">
                {flights.departure.airline} &middot;{" "}
                {flights.departure.flightNumbers.join(" → ")}
              </p>
              <p className="text-white/70 text-[10px] sm:text-xs">
                MEL {flights.departure.departTime} → DEL{" "}
                {flights.departure.arriveTime} &middot;{" "}
                {flights.departure.date}
              </p>
            </div>
          </div>
          <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase flex-shrink-0">
            {flights.departure.status}
          </span>
        </motion.div>

        {/* Travelers */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {["Sunil", "Parul", "Devanshi", "Ryaan"].map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bg-white/20 backdrop-blur-md border border-white/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-medium"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <a
        href="#flights"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/80 animate-bounce z-10"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}
