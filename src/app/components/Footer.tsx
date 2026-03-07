"use client";
import { flights } from "../data";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-8 sm:py-12 px-4 pb-20 sm:pb-12">
      <div className="flex justify-center gap-1 mb-3 sm:mb-4">
        <div className="w-8 sm:w-10 h-1 rounded-full bg-[#FF9933]" />
        <div className="w-8 sm:w-10 h-1 rounded-full bg-white" />
        <div className="w-8 sm:w-10 h-1 rounded-full bg-[#046A38]" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
        India, Here We Come!
      </h3>
      <p className="text-xs sm:text-sm">
        {flights.departure.date} – {flights.return.date}
      </p>
      <p className="text-[10px] sm:text-xs opacity-50 mt-3 sm:mt-4">
        Made with love for an unforgettable family trip
      </p>
    </footer>
  );
}
