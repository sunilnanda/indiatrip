"use client";
import { motion } from "framer-motion";
import { travelers } from "../data";
import { Plane } from "lucide-react";

export default function Travelers() {
  return (
    <section id="travelers" className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          The Travel Squad
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Family coming together from across the world
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
      </motion.div>

      {/* Core Travellers */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
          <h3 className="text-base sm:text-lg font-bold text-gray-800">
            Flying from Melbourne
          </h3>
          <span className="text-[10px] sm:text-xs text-gray-400">31st March</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {travelers.core.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl sm:text-4xl block mb-1.5 sm:mb-2">{t.emoji}</span>
              <h4 className="text-sm sm:text-base font-bold text-gray-900">{t.name}</h4>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                {t.from} → Delhi
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Joining Members */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="text-lg sm:text-xl">🙏</span>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">
            Receiving at Delhi Airport
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {travelers.joining.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl sm:text-4xl block mb-1.5 sm:mb-2">{t.emoji}</span>
              <h4 className="text-sm sm:text-base font-bold text-gray-900">{t.name}</h4>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{t.from}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
