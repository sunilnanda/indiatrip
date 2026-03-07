"use client";
import { motion } from "framer-motion";
import { Check, Clock, MapPin, Users } from "lucide-react";
import { flexiblePlans } from "../data";
import TransportOptions from "./TransportOptions";

export default function FlexiblePlans() {
  return (
    <section id="options" className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Confirmed Plans
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Additional visits planned around the core itinerary
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
      </motion.div>

      <div className="space-y-3 sm:space-y-4">
        {flexiblePlans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl sm:rounded-2xl border-2 border-green-400 shadow-md shadow-green-100"
          >
            {/* Header */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 bg-green-50">
                {plan.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {plan.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-relaxed">
                  {plan.description}
                </p>
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 mt-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold bg-amber-50 text-amber-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg">
                    <Clock className="w-3 h-3" />
                    {plan.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    {plan.location}
                  </span>
                  {plan.group && (
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium bg-violet-50 text-violet-600 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg">
                      <Users className="w-3 h-3 flex-shrink-0" />
                      <span className="break-words">{plan.group}</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-500 border-2 border-green-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Transport options */}
            {plan.transport && plan.transport.length > 0 && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                <TransportOptions
                  options={plan.transport}
                  title={`Getting to ${plan.location}`}
                  legId={plan.id}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
