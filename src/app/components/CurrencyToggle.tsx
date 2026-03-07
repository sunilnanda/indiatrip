"use client";
import { Eye, EyeOff } from "lucide-react";
import { useCurrency } from "./CurrencyContext";

export default function CurrencyToggle() {
  const { currency, toggleCurrency, showPrices, togglePrices } = useCurrency();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 print:hidden">
      {/* Show/Hide Prices */}
      <button
        onClick={togglePrices}
        className="bg-white shadow-lg border border-gray-200 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 hover:shadow-xl transition-all group"
        title="Toggle price estimates"
      >
        {showPrices ? (
          <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-hover:text-orange-500" />
        ) : (
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-hover:text-orange-500" />
        )}
        <span className="text-xs sm:text-sm font-medium text-gray-600">
          {showPrices ? "Hide Prices" : "Show Prices"}
        </span>
      </button>

      {/* Currency Toggle */}
      {showPrices && (
        <button
          onClick={toggleCurrency}
          className="bg-white shadow-lg border border-gray-200 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 hover:shadow-xl transition-all group"
          title="Toggle currency"
        >
          <span className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-orange-500 transition-colors">
            {currency === "INR" ? "₹ INR" : "A$ AUD"}
          </span>
          <div className="w-8 sm:w-10 h-4 sm:h-5 bg-gray-200 rounded-full relative transition-colors">
            <div
              className={`absolute top-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all shadow-sm ${
                currency === "INR"
                  ? "left-0.5 bg-orange-500"
                  : "left-[16px] sm:left-[22px] bg-blue-500"
              }`}
            />
          </div>
          <span className="hidden sm:inline text-xs text-gray-400">
            {currency === "INR" ? "Show AUD" : "Show INR"}
          </span>
        </button>
      )}
    </div>
  );
}
