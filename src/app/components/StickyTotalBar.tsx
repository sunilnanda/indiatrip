"use client";
import { useCurrency } from "./CurrencyContext";
import { useTransportSelection } from "./TransportSelectionContext";

function parseCostRange(costTotal: string): [number, number] {
  const cleaned = costTotal.replace(/₹/g, "");
  const nums = cleaned.match(/[\d,]+/g);
  if (!nums) return [0, 0];
  const values = nums.map((n) => parseFloat(n.replace(/,/g, "")));
  if (values.length >= 2) return [values[0], values[1]];
  return [values[0] || 0, values[0] || 0];
}

const costLegs = [
  { legId: "day1-vrindavan", fixedIndex: undefined as number | undefined },
  { legId: "day2", fixedIndex: undefined as number | undefined },
  { legId: "day3", fixedIndex: undefined as number | undefined },
  { legId: "day8", fixedIndex: undefined as number | undefined },
  { legId: "delhi-jalandhar", fixedIndex: undefined as number | undefined },
  { legId: "delhi-chandigarh", fixedIndex: undefined as number | undefined },
  { legId: "eye-surgery", fixedIndex: undefined as number | undefined },
  { legId: "himachal", fixedIndex: undefined as number | undefined },
  { legId: "himachal", fixedIndex: 1 },
  { legId: "chandigarh", fixedIndex: undefined as number | undefined },
];

const INR_TO_AUD = 1 / 65;

export default function StickyTotalBar() {
  const { currency, symbol, showPrices } = useCurrency();
  const { getSelectedOption, getOptionsForLeg } = useTransportSelection();

  if (!showPrices) return null;

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

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 print:hidden max-w-[calc(100vw-120px)] sm:max-w-none">
      <a
        href="#total-cost"
        className="bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-full px-3 sm:px-5 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 sm:gap-3 no-underline"
      >
        <span className="text-[9px] sm:text-xs font-medium text-white/80">
          Total
        </span>
        <span className="text-xs sm:text-base font-bold truncate">
          {symbol}{fmt(totalLow)} – {symbol}{fmt(totalHigh)}
        </span>
      </a>
    </div>
  );
}
