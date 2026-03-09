"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DEPARTURE = new Date("2026-03-31T00:30:00+11:00"); // Melbourne time

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(): TimeLeft {
  const total = DEPARTURE.getTime() - Date.now();
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    total,
  };
}

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  if (time.total <= 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-500 to-green-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center"
        >
          <p className="text-2xl sm:text-4xl font-black text-white">
            The Journey Has Begun!
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center border border-gray-700/50 shadow-xl"
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-orange-400 font-semibold mb-3 sm:mb-5">
          Countdown to Departure
        </p>

        <div className="flex justify-center gap-2 sm:gap-4 md:gap-6">
          {units.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center">
              <div className="bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600/50 rounded-lg sm:rounded-xl w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center shadow-inner">
                <span className="text-xl sm:text-3xl md:text-4xl font-black text-white tabular-nums">
                  {String(time[key]).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[9px] sm:text-xs text-gray-400 mt-1.5 sm:mt-2 font-medium uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 sm:mt-6">
          Departing Melbourne on 31 March 2026 at 00:30
        </p>
      </motion.div>
    </section>
  );
}
