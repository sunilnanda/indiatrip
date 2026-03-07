"use client";
import { motion } from "framer-motion";
import { delhiToJalandharTransport, delhiToChandigarhTransport } from "../data";
import TransportOptions from "./TransportOptions";

export default function SplitSection() {
  return (
    <section id="split" className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-violet-100"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            After Sri Anandpur Dham
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            The group splits from Delhi on 7th April
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full mx-auto mt-3" />
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Path 1: Parul's Parents */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            <div className="text-center mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl block mb-1.5 sm:mb-2">👨‍👩</span>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Parul&apos;s Parents
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Delhi → <strong>Chandigarh</strong>
              </p>
            </div>
            <TransportOptions
              options={delhiToChandigarhTransport}
              title="Delhi → Chandigarh Options"
              legId="delhi-chandigarh"
            />
          </motion.div>

          {/* Path 2: Nanda's Family */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            <div className="text-center mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl block mb-1.5 sm:mb-2">👨‍👩‍👧‍👦</span>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Sunil&apos;s Family + Parents
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Delhi → <strong>Jalandhar</strong> (Hometown)
              </p>
            </div>
            <TransportOptions
              options={delhiToJalandharTransport}
              title="Delhi → Jalandhar Options"
              legId="delhi-jalandhar"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
