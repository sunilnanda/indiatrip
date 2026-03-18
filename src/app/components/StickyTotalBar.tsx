"use client";
import { Eye, EyeOff } from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useTransportSelection } from "./TransportSelectionContext";
import { parseCostRange, costLegs, INR_TO_AUD } from "../lib/costs";

export default function StickyTotalBar() {
  const { currency, toggleCurrency, symbol, showPrices, togglePrices } = useCurrency();
  const { getSelectedOption, getOptionsForLeg } = useTransportSelection();

  let totalLow = 0;
  let totalHigh = 0;

  for (const leg of costLegs) {
    let costTotal = "₹0";
    if (leg.fixedIndex !== undefined) {
      const options = getOptionsForLeg(leg.legId);
      if (options && options[leg.fixedIndex]) {
        costTotal = options[leg.fixedIndex].costTotal;
      }
    } else {
      const opt = getSelectedOption(leg.legId);
      if (opt) costTotal = opt.costTotal;
    }
    const [low, high] = parseCostRange(costTotal);
    totalLow += low;
    totalHigh += high;
  }

  const fmt = (inr: number) => {
    const val = currency === "AUD" ? Math.round(inr * INR_TO_AUD) : inr;
    return val.toLocaleString();
  };

  const range = (low: number, high: number) => {
    if (low === high) return `${symbol}${fmt(low)}`;
    return `${symbol}${fmt(low)} – ${symbol}${fmt(high)}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 print:hidden">
      <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Left: Total cost (only when prices visible) */}
        {showPrices ? (
          <a
            href="#total-cost"
            className="flex items-center gap-2 min-w-0 no-underline"
          >
            <span className="text-[10px] sm:text-xs font-medium text-gray-400">
              Total
            </span>
            <span className="text-sm sm:text-base font-bold text-white truncate">
              {range(totalLow, totalHigh)}
            </span>
          </a>
        ) : (
          <span className="text-xs sm:text-sm text-gray-500">
            Prices hidden
          </span>
        )}

        {/* Right: Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Currency toggle (only when prices visible) */}
          {showPrices && (
            <button
              onClick={toggleCurrency}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              title="Toggle currency"
              role="switch"
              aria-checked={currency === "AUD"}
              aria-label={`Currency: ${currency}. Click to switch to ${currency === "INR" ? "AUD" : "INR"}`}
            >
              <span className="text-[10px] sm:text-xs font-bold text-white">
                {currency === "INR" ? "₹" : "A$"}
              </span>
              <div className="w-7 sm:w-8 h-3.5 sm:h-4 bg-gray-600 rounded-full relative">
                <div
                  className={`absolute top-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all shadow-sm ${
                    currency === "INR"
                      ? "left-0.5 bg-orange-500"
                      : "left-[14px] sm:left-[17px] bg-blue-500"
                  }`}
                />
              </div>
            </button>
          )}

          {/* Show/Hide prices */}
          <button
            onClick={togglePrices}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            title={showPrices ? "Hide prices" : "Show prices"}
            aria-label={showPrices ? "Hide price estimates" : "Show price estimates"}
          >
            {showPrices ? (
              <EyeOff className="w-3.5 h-3.5 text-gray-400" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-gray-400" />
            )}
            <span className="text-[10px] sm:text-xs font-medium text-gray-400">
              {showPrices ? "Hide" : "Show"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
