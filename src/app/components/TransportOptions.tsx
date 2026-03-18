"use client";
import { motion } from "framer-motion";
import { Train, Car, Plane, Star, Check, ExternalLink, Hotel, Stethoscope } from "lucide-react";
import { TransportOption } from "../data";
import { useCurrency } from "./CurrencyContext";
import { useTransportSelection } from "./TransportSelectionContext";

const modeConfig = {
  train: { icon: Train, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", label: "Train" },
  taxi: { icon: Car, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", label: "Taxi" },
  flight: { icon: Plane, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", label: "Flight" },
  stay: { icon: Hotel, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200", label: "Stay" },
  medical: { icon: Stethoscope, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200", label: "Medical" },
};

// Map PNRs to PDF filenames in /public
const pnrToTicket: Record<string, string> = {
  "2732874627": "jalandhar to delhi.pdf",
  "2514096012": "mathura to lalitpur.pdf",
  "8145795505": "MATHURA TO CHANDIGARG.pdf",
  "V9Q5SJ": "Gmail - Your IndiGo Itinerary - V9Q5SJ.pdf",
  "2732876330": "Delhi to jalandhar.pdf",
};

function getTicketUrl(opt: TransportOption): string | null {
  if (!opt.details) return null;
  const match = opt.details.match(/PNR:\s*(\S+)/);
  if (!match) return null;
  const file = pnrToTicket[match[1]];
  return file ? `/${encodeURIComponent(file)}` : null;
}

export default function TransportOptions({
  options,
  title,
  legId,
}: {
  options: TransportOption[];
  title: string;
  legId?: string;
}) {
  const { convert, symbol, showPrices } = useCurrency();
  const { getSelected, setSelected } = useTransportSelection();

  if (!options || options.length === 0) return null;

  const hasBookedOption = options.some((o) => o.booked);
  const selectedIdx = legId ? getSelected(legId) : -1;
  const selectable = !!legId && options.length > 1 && !hasBookedOption;

  return (
    <div className="mt-3 sm:mt-4">
      <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
        {title} {selectable && <span className="normal-case font-normal">(tap to select)</span>}
      </p>
        <div className="space-y-2">
          {options.map((opt, i) => {
            const config = modeConfig[opt.mode];
            const Icon = config.icon;
            const isSelected = selectable && selectedIdx === i;
            const isUnselected = selectable && selectedIdx !== i;
            const ticketUrl = getTicketUrl(opt);
            const externalUrl = ticketUrl || opt.link || null;
            const isClickable = selectable || !!externalUrl;

            const handleClick = () => {
              if (selectable && legId) {
                setSelected(legId, i);
              } else if (externalUrl) {
                window.open(externalUrl, "_blank", "noopener,noreferrer");
              }
            };

            return (
              <motion.div
                key={opt.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={handleClick}
                className={`flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border relative transition-all ${
                  isClickable ? "cursor-pointer" : ""
                } ${
                  isSelected
                    ? `${config.border} ${config.bg}/50 ring-2 ring-green-500 shadow-sm`
                    : isUnselected
                      ? `border-gray-200 bg-gray-50/30 opacity-60 hover:opacity-80`
                      : `${config.border} ${config.bg}/50 ${opt.recommended ? "ring-2 ring-green-400/50" : ""}`
                } ${opt.booked ? "ring-2 ring-green-500" : ""} ${externalUrl && !selectable ? "hover:shadow-md" : ""}`}
              >
                {opt.booked ? (
                  <span className="absolute -top-2 right-2 sm:right-3 bg-green-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 sm:gap-1">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> BOOKED
                  </span>
                ) : hasBookedOption && !opt.booked ? (
                  <span className="absolute -top-2 right-2 sm:right-3 bg-amber-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                    TO CONFIRM
                  </span>
                ) : isSelected ? (
                  <span className="absolute -top-2 right-2 sm:right-3 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 sm:gap-1">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> SELECTED
                  </span>
                ) : !selectable && opt.recommended ? (
                  <span className="absolute -top-2 right-2 sm:right-3 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 sm:gap-1">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> REC
                  </span>
                ) : null}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start sm:items-center gap-1 sm:gap-2 flex-col sm:flex-row">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">
                      {opt.label}
                    </p>
                    <span className="text-[10px] sm:text-xs text-gray-400">
                      ~{opt.duration}
                    </span>
                  </div>
                  {showPrices && (
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                      {opt.costPerPerson !== "–" && (
                        <span className="text-[10px] sm:text-xs text-gray-500">
                          {symbol}{convert(opt.costPerPerson)}/person
                        </span>
                      )}
                      <span className="text-[10px] sm:text-xs font-semibold text-gray-700 bg-white px-1.5 sm:px-2 py-0.5 rounded-md">
                        {symbol}{convert(opt.costTotal)}
                        {opt.costPerPerson === "–" && (
                          <span className="text-gray-400 font-normal ml-1">total</span>
                        )}
                      </span>
                    </div>
                  )}
                  {opt.note && (
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 leading-relaxed">{opt.note}</p>
                  )}
                  {externalUrl && (
                    <p className="text-[10px] sm:text-xs text-blue-500 mt-1 flex items-center gap-1 font-medium">
                      <ExternalLink className="w-3 h-3" /> {ticketUrl ? "View ticket" : "View booking"}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
    </div>
  );
}
