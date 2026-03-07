"use client";
import { flights } from "../data";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-12 px-4">
      <div className="flex justify-center gap-1 mb-4">
        <div className="w-10 h-1 rounded-full bg-[#FF9933]" />
        <div className="w-10 h-1 rounded-full bg-white" />
        <div className="w-10 h-1 rounded-full bg-[#046A38]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-1">
        India, Here We Come!
      </h3>
      <p className="text-sm">
        {flights.departure.date} – {flights.return.date}
      </p>
      <p className="text-xs opacity-50 mt-4">
        Made with love for an unforgettable family trip
      </p>
    </footer>
  );
}
