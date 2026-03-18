"use client";
import { motion } from "framer-motion";
import { routeStops } from "../data";

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
            </motion.div>

            {/* Route Timeline */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
            >
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6 text-center">
                    Route Timeline
                </h3>

                <div className="space-y-0">
                    {routeStops.map((stop, i) => (
                        <motion.div
                            key={stop.city + i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <div className="flex gap-3 sm:gap-4">
                                {/* Timeline line + dot */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div
                                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex-shrink-0"
                                        style={{
                                            backgroundColor: stop.color,
                                            borderColor: stop.color,
                                        }}
                                    />
                                    {i < routeStops.length - 1 && (
                                        <div
                                            className="w-0.5 flex-1 min-h-[20px]"
                                            style={{ backgroundColor: `${stop.color}30` }}
                                        />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="pb-5 sm:pb-6 -mt-0.5 flex-1 min-w-0">
                                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                        <p className="text-sm sm:text-base font-semibold text-gray-800">
                                            {stop.city}
                                        </p>
                                        <span className="text-xs sm:text-sm text-gray-400 font-medium">
                                            {stop.dates}
                                        </span>
                                    </div>
                                    {stop.timeline.length > 0 && (
                                        <ul className="mt-1.5 space-y-0.5">
                                            {stop.timeline.map((step, j) => {
                                                const hasTime = /^\d|^~\d/.test(step);
                                                return (
                                                    <li
                                                        key={j}
                                                        className={`text-xs sm:text-sm leading-relaxed ${hasTime
                                                            ? "text-gray-600 font-mono"
                                                            : "text-gray-400 italic"
                                                            }`}
                                                    >
                                                        {hasTime ? step : `  ${step}`}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
