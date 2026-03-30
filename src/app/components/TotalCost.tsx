"use client";
import { motion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useTransportSelection } from "./TransportSelectionContext";
import { parseCostRange, costLegs, INR_TO_AUD } from "../lib/costs";

export default function TotalCost() {
  const { currency, symbol, showPrices } = useCurrency();
  const { getSelectedOption, getOptionsForLeg } = useTransportSelection();

  if (!showPrices) return null;

  const fmt = (inr: number) => {
    const val = currency === "AUD" ? Math.round(inr * INR_TO_AUD) : inr;
    return val.toLocaleString();
  };

  const range = (low: number, high: number, sym = symbol) => {
    if (low === high) return `${sym}${fmt(low)}`;
    return `${sym}${fmt(low)} – ${sym}${fmt(high)}`;
  };

  const items = costLegs.map((leg) => {
    let costTotal = "₹0";
    let description = "";

    if (leg.fixedIndex !== undefined) {
      const options = getOptionsForLeg(leg.legId);
      if (options && options[leg.fixedIndex]) {
        costTotal = options[leg.fixedIndex].costTotal;
        description = options[leg.fixedIndex].label;
      }
    } else {
      const opt = getSelectedOption(leg.legId);
      if (opt) {
        costTotal = opt.costTotal;
        description = opt.label;
      }
    }

    const [lowINR, highINR] = parseCostRange(costTotal);
    return { ...leg, lowINR, highINR, description };
  });

  const coreItems = items.filter((c) => c.category === "core");
  const flexItems = items.filter((c) => c.category === "flexible");

  const coreLow = coreItems.reduce((s, c) => s + c.lowINR, 0);
  const coreHigh = coreItems.reduce((s, c) => s + c.highINR, 0);
  const flexLow = flexItems.reduce((s, c) => s + c.lowINR, 0);
  const flexHigh = flexItems.reduce((s, c) => s + c.highINR, 0);
  const totalLow = coreLow + flexLow;
  const totalHigh = coreHigh + flexHigh;

  return (
    <section id="total-cost" className="max-w-4xl mx-auto px-4 py-10 sm:py-16 print:hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Estimated Total Cost
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Based on your selected transport options ({currency === "INR" ? "Indian Rupees" : "Australian Dollars"})
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Core Transport */}
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          <h3 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2 mb-3 sm:mb-4">
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            Core Itinerary
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {coreItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 py-1.5 sm:py-2 border-b border-gray-50 last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-800">
                    {item.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {item.description}
                  </p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  {range(item.lowINR, item.highINR)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-orange-100">
            <p className="text-xs sm:text-sm font-bold text-orange-600">Core Subtotal</p>
            <p className="text-sm sm:text-base font-bold text-orange-600">
              {range(coreLow, coreHigh)}
            </p>
          </div>
        </div>

        {/* Flexible Plans */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gray-50/50 border-t border-gray-100">
          <h3 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2 mb-3 sm:mb-4">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
            Confirmed Plans
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {flexItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 py-1.5 sm:py-2 border-b border-gray-100 last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-800">
                    {item.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {item.description}
                  </p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  {range(item.lowINR, item.highINR)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-violet-100">
            <p className="text-xs sm:text-sm font-bold text-violet-600">Flexible Subtotal</p>
            <p className="text-sm sm:text-base font-bold text-violet-600">
              {range(flexLow, flexHigh)}
            </p>
          </div>
        </div>

        {/* Grand Total */}
        <div className="px-4 sm:px-6 py-5 sm:py-6 bg-gradient-to-r from-orange-500 to-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs sm:text-sm font-medium">
                Estimated Grand Total
              </p>
              <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">
                Based on selected options
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                {range(totalLow, totalHigh)}
              </p>
              {currency === "INR" && (
                <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">
                  ≈ {range(Math.round(totalLow * INR_TO_AUD), Math.round(totalHigh * INR_TO_AUD), "A$")}
                </p>
              )}
              {currency === "AUD" && (
                <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">
                  ≈ {totalLow === totalHigh ? `₹${totalLow.toLocaleString()}` : `₹${totalLow.toLocaleString()} – ₹${totalHigh.toLocaleString()}`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-4 sm:px-6 py-3 bg-amber-50 border-t border-amber-100">
          <p className="text-[10px] sm:text-xs text-amber-700">
            <strong>Note:</strong> All amounts are total group costs (not per-person). Select different transport options above to update costs in real-time. Does not include food, local transport, shopping, or activities. Dham stay is free. Flight costs (Melbourne ↔ Delhi) are separate. 1 AUD ≈ 65 INR.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
