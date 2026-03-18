"use client";
import { createContext, useContext, useState, ReactNode } from "react";

import { INR_TO_AUD } from "../lib/costs";

export type Currency = "INR" | "AUD";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  convert: (inrAmount: string) => string;
  symbol: string;
  showPrices: boolean;
  togglePrices: () => void;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  toggleCurrency: () => {},
  convert: (v) => v,
  symbol: "₹",
  showPrices: true,
  togglePrices: () => {},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [showPrices, setShowPrices] = useState(true);

  const toggleCurrency = () =>
    setCurrency((c) => (c === "INR" ? "AUD" : "INR"));

  const togglePrices = () => setShowPrices((v) => !v);

  const convert = (inrAmount: string): string => {
    // Always strip ₹ from input first to prevent double symbols
    const cleaned = inrAmount.replace(/₹/g, "").trim();

    if (currency === "INR") return cleaned;

    const parts = cleaned.split(/\s*[–-]\s*/);

    const convertPart = (part: string) => {
      const match = part.trim().match(/([\d,]+)(.*)/);
      if (!match) return part;
      const num = parseFloat(match[1].replace(/,/g, ""));
      if (isNaN(num)) return part;
      const aud = Math.round(num * INR_TO_AUD);
      return `${aud.toLocaleString()}${match[2]}`;
    };

    if (parts.length === 2) {
      return `${convertPart(parts[0])} – ${convertPart(parts[1])}`;
    }
    return convertPart(cleaned);
  };

  const symbol = currency === "INR" ? "₹" : "A$";

  return (
    <CurrencyContext.Provider
      value={{ currency, toggleCurrency, convert, symbol, showPrices, togglePrices }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
