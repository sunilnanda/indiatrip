"use client";
import { motion } from "framer-motion";
import { Printer, Plane, MapPin, Calendar, Users, Train, Car, Hotel, Stethoscope } from "lucide-react";
import type { TransportOption } from "../data";

const modeIcon = (mode: TransportOption["mode"]) =>
  mode === "train" ? Train : mode === "flight" ? Plane : mode === "stay" ? Hotel : mode === "medical" ? Stethoscope : Car;

const modeEmoji = (mode: TransportOption["mode"]) =>
  mode === "train" ? "🚆" : mode === "flight" ? "✈️" : mode === "stay" ? "🏨" : mode === "medical" ? "🏥" : "🚗";
import { flights, itinerary, flexiblePlans, delhiToJalandharTransport, vrindavanToChandigarhTransport, routeStops } from "../data";
import { useCurrency } from "./CurrencyContext";

export default function PrintSummary() {
  const { symbol, convert, showPrices } = useCurrency();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Button - visible on screen only */}
      <section id="summary" className="max-w-5xl mx-auto px-4 py-10 sm:py-16 print:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Trip Summary
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Printable overview of the full itinerary
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Summary Header */}
          <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 p-0.5 sm:p-1">
            <div className="bg-white px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">India Family Trip 2026</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">31 March – 1 May &middot; 31 Days</p>
                </div>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto justify-center"
                >
                  <Printer className="w-4 h-4" />
                  Print Summary
                </button>
              </div>
            </div>
          </div>

          {/* Flights Summary */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
            <h4 className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2 mb-2 sm:mb-3">
              <Plane className="w-4 h-4 text-orange-500" />
              Flights (Confirmed)
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-orange-50 rounded-xl p-2.5 sm:p-3">
                <p className="text-[10px] sm:text-xs font-semibold text-orange-600 mb-0.5 sm:mb-1">DEPARTURE</p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">MEL {flights.departure.departTime} → DEL {flights.departure.arriveTime}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">{flights.departure.date} &middot; {flights.departure.airline} {flights.departure.flightNumbers.join(" → ")}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-2.5 sm:p-3">
                <p className="text-[10px] sm:text-xs font-semibold text-blue-600 mb-0.5 sm:mb-1">RETURN</p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">DEL {flights.return.departTime} → MEL {flights.return.arriveTime}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">{flights.return.date} &middot; {flights.return.airline} {flights.return.flightNumbers.join(" → ")}</p>
              </div>
            </div>
          </div>

          {/* Route Timeline */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
            <h4 className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2 mb-2 sm:mb-3">
              <Calendar className="w-4 h-4 text-orange-500" />
              Route Timeline
            </h4>

            {/* Mobile: card layout */}
            <div className="sm:hidden space-y-0">
              {routeStops.map((stop, idx) => (
                <div key={stop.city + idx} className="flex gap-2.5">
                  {/* Timeline rail */}
                  <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-white"
                      style={{ backgroundColor: stop.color }}
                    />
                    {idx < routeStops.length - 1 && (
                      <div className="w-px flex-1 min-h-[16px] bg-gray-200" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-3.5 -mt-0.5 flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-gray-800 leading-tight">{stop.city}</span>
                      <span className="text-[10px] font-medium text-gray-400">{stop.dates}</span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {stop.timeline.map((step, j) => {
                        const hasTime = /^\d|^~\d/.test(step);
                        return (
                          <p key={j} className={`text-[10px] leading-relaxed ${hasTime ? "text-gray-600 font-mono" : "text-gray-400 italic"}`}>
                            {step}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table layout */}
            <div className="hidden sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 text-xs font-semibold text-gray-400 uppercase w-[100px]">Date</th>
                    <th className="text-left py-2 pr-3 text-xs font-semibold text-gray-400 uppercase w-[200px]">Leg</th>
                    <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase">Timings</th>
                  </tr>
                </thead>
                <tbody>
                  {routeStops.map((stop, idx) => (
                    <tr key={stop.city + idx} className="border-b border-gray-50 align-top hover:bg-gray-50/50 transition-colors">
                      <td className="py-2.5 pr-3 whitespace-nowrap">
                        <span className="text-xs font-semibold text-gray-700">{stop.dates}</span>
                      </td>
                      <td className="py-2.5 pr-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: stop.color }} />
                          <span className="text-xs font-medium text-gray-800">{stop.city}</span>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <div className="space-y-0.5">
                          {stop.timeline.map((step, j) => {
                            const hasTime = /^\d|^~\d/.test(step);
                            return (
                              <p key={j} className={`text-xs leading-relaxed ${hasTime ? "text-gray-600 font-mono" : "text-gray-400 italic"}`}>
                                {step}
                              </p>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Day-by-Day Summary Table */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
            <h4 className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2 mb-2 sm:mb-3">
              <MapPin className="w-4 h-4 text-orange-500" />
              Itinerary Overview
            </h4>
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-xs sm:text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-1.5 sm:py-2 pr-2 sm:pr-3 text-[10px] sm:text-xs font-semibold text-gray-400 uppercase">Date</th>
                    <th className="text-left py-1.5 sm:py-2 pr-2 sm:pr-3 text-[10px] sm:text-xs font-semibold text-gray-400 uppercase">Place</th>
                    <th className="text-left py-1.5 sm:py-2 pr-2 sm:pr-3 text-[10px] sm:text-xs font-semibold text-gray-400 uppercase">Activity</th>
                    <th className="text-left py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-gray-400 uppercase">Transport</th>
                  </tr>
                </thead>
                <tbody>
                  {itinerary.map((day) => (
                    <tr key={day.id} className="border-b border-gray-50">
                      <td className="py-2 sm:py-2.5 pr-2 sm:pr-3 whitespace-nowrap">
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-700">{day.date}</span>
                      </td>
                      <td className="py-2 sm:py-2.5 pr-2 sm:pr-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-orange-400 flex-shrink-0" />
                          <span className="text-[10px] sm:text-xs text-gray-600">{day.location}</span>
                        </div>
                      </td>
                      <td className="py-2 sm:py-2.5 pr-2 sm:pr-3">
                        <span className="text-[10px] sm:text-xs font-medium text-gray-800">{day.title}</span>
                        {day.tags.some(t => t.free) && (
                          <span className="ml-1 text-[8px] sm:text-[10px] bg-green-50 text-green-700 font-semibold px-1 sm:px-1.5 py-0.5 rounded">FREE</span>
                        )}
                      </td>
                      <td className="py-2 sm:py-2.5">
                        {day.transport ? (
                          <div className="space-y-1">
                            {day.transport.map((t, i) => {
                              const Icon = modeIcon(t.mode);
                              return (
                                <div key={i} className="flex items-center gap-1 sm:gap-1.5">
                                  <Icon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                  <span className="text-[10px] sm:text-xs text-gray-500 truncate">{t.label}</span>
                                  {showPrices && <span className="text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap">{symbol}{convert(t.costTotal)}</span>}
                                  {t.recommended && <span className="text-[8px] sm:text-[9px] bg-green-100 text-green-700 px-1 rounded flex-shrink-0">REC</span>}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-[10px] sm:text-xs text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Group Splits */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
            <h4 className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2 mb-2 sm:mb-3">
              <Users className="w-4 h-4 text-orange-500" />
              Group Splits
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-violet-50 rounded-xl p-2.5 sm:p-3">
                <p className="text-[10px] sm:text-xs font-bold text-violet-700 mb-1.5 sm:mb-2">Sunil&apos;s Family (6 persons) — Dham → Delhi → Jalandhar</p>
                {delhiToJalandharTransport.map((t, i) => {
                  const Icon = modeIcon(t.mode);
                  return (
                    <div key={i} className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                      <Icon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs text-gray-600 truncate">{t.label}</span>
                      {showPrices && <span className="text-[10px] sm:text-xs font-semibold text-gray-800 ml-auto whitespace-nowrap">{symbol}{convert(t.costTotal)}</span>}
                    </div>
                  );
                })}
              </div>
              <div className="bg-pink-50 rounded-xl p-2.5 sm:p-3">
                <p className="text-[10px] sm:text-xs font-bold text-pink-700 mb-1.5 sm:mb-2">Parul&apos;s Parents — Vrindavan → Chandigarh (4 Apr)</p>
                {vrindavanToChandigarhTransport.map((t, i) => {
                  const Icon = modeIcon(t.mode);
                  return (
                    <div key={i} className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                      <Icon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs text-gray-600 truncate">{t.label}</span>
                      {showPrices && <span className="text-[10px] sm:text-xs font-semibold text-gray-800 ml-auto whitespace-nowrap">{symbol}{convert(t.costTotal)}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Flexible Plans Summary */}
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <h4 className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2 mb-2 sm:mb-3">
              <Calendar className="w-4 h-4 text-orange-500" />
              Confirmed Plans (After 7 April)
            </h4>
            <div className="space-y-2">
              {flexiblePlans.map((plan) => (
                <div key={plan.id} className="flex items-start gap-2 sm:gap-3 bg-gray-50 rounded-xl p-2.5 sm:p-3">
                  <span className="text-base sm:text-xl flex-shrink-0">{plan.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">{plan.title}</p>
                      <span className="text-[10px] sm:text-xs bg-amber-100 text-amber-700 font-medium px-1.5 sm:px-2 py-0.5 rounded">{plan.duration}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{plan.location}{plan.group ? ` — ${plan.group}` : ""}</p>
                    {plan.transport && (
                      <div className="mt-1 sm:mt-1.5 space-y-0.5">
                        {plan.transport.map((t, i) => {
                          const Icon = modeIcon(t.mode);
                          return (
                            <div key={i} className="flex items-center gap-1 sm:gap-1.5">
                              <Icon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="text-[10px] sm:text-xs text-gray-500 truncate">{t.label}{showPrices ? <>: <strong className="text-gray-700">{symbol}{convert(t.costTotal)}</strong></> : ""}</span>
                              {t.recommended && <span className="text-[8px] sm:text-[9px] bg-green-100 text-green-700 px-1 rounded flex-shrink-0">REC</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ====== PRINT-ONLY VERSION ====== */}
      <div className="hidden print:block print-summary">
        <style jsx>{`
          @media print {
            body { background: white !important; }
            .print-summary { padding: 0 !important; }
            .print-summary * { color-adjust: exact; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        `}</style>

        <div className="px-4 py-2">
          {/* Print Header */}
          <div className="flex items-center justify-between border-b-2 border-gray-300 pb-3 mb-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">🇮🇳 India Family Trip 2026</h1>
              <p className="text-sm text-gray-500">31 March – 1 May &middot; 31 Days &middot; Melbourne → India → Melbourne</p>
            </div>
            <div className="text-right text-xs text-gray-400">
              <p>Travelers: Sunil, Parul, Devanshi, Ryaan</p>
              <p>+ Parents (receiving at Delhi Airport)</p>
            </div>
          </div>

          {/* Print Flights */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">✈️ Flights (Confirmed)</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-bold">Departure: {flights.departure.date}</p>
                <p>MEL {flights.departure.departTime} → DEL {flights.departure.arriveTime} ({flights.departure.duration})</p>
                <p className="text-gray-500">{flights.departure.airline} {flights.departure.flightNumbers.join(" → ")}</p>
              </div>
              <div>
                <p className="font-bold">Return: {flights.return.date}</p>
                <p>DEL {flights.return.departTime} → MEL {flights.return.arriveTime} ({flights.return.duration})</p>
                <p className="text-gray-500">{flights.return.airline} {flights.return.flightNumbers.join(" → ")}</p>
              </div>
            </div>
          </div>

          {/* Print Route Timeline */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">🕐 Route Timeline</h3>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-1.5 border border-gray-200 font-semibold w-[80px]">Date</th>
                  <th className="text-left p-1.5 border border-gray-200 font-semibold w-[140px]">Leg</th>
                  <th className="text-left p-1.5 border border-gray-200 font-semibold">Timings</th>
                </tr>
              </thead>
              <tbody>
                {routeStops.map((stop, idx) => (
                  <tr key={stop.city + idx}>
                    <td className="p-1.5 border border-gray-200 whitespace-nowrap font-medium align-top">{stop.dates}</td>
                    <td className="p-1.5 border border-gray-200 font-medium align-top">{stop.city}</td>
                    <td className="p-1.5 border border-gray-200 align-top">
                      {stop.timeline.map((step, j) => (
                        <div key={j}>{step}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Print Itinerary Table */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">📅 Day-by-Day Itinerary</h3>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-1.5 border border-gray-200 font-semibold">Date</th>
                  <th className="text-left p-1.5 border border-gray-200 font-semibold">Location</th>
                  <th className="text-left p-1.5 border border-gray-200 font-semibold">Activity</th>
                  <th className="text-left p-1.5 border border-gray-200 font-semibold">Transport Options & Cost</th>
                  <th className="text-left p-1.5 border border-gray-200 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {itinerary.map((day) => (
                  <tr key={day.id}>
                    <td className="p-1.5 border border-gray-200 whitespace-nowrap font-medium">{day.date}</td>
                    <td className="p-1.5 border border-gray-200">{day.location}</td>
                    <td className="p-1.5 border border-gray-200 font-medium">{day.title}</td>
                    <td className="p-1.5 border border-gray-200">
                      {day.transport ? day.transport.map((t, i) => (
                        <div key={i}>{modeEmoji(t.mode)} {t.label}: {symbol}{convert(t.costTotal)} {t.recommended ? "⭐" : ""}</div>
                      )) : "—"}
                    </td>
                    <td className="p-1.5 border border-gray-200">
                      {day.tags.some(t => t.free) ? "✅ Free accommodation" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Print Split */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">👥 Group Splits</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-bold mb-1">Sunil&apos;s Family (6 persons) — Dham → Delhi → Jalandhar</p>
                {delhiToJalandharTransport.map((t, i) => (
                  <p key={i}>{modeEmoji(t.mode)} {t.label}: {symbol}{convert(t.costTotal)} {t.recommended ? "⭐" : ""}</p>
                ))}
              </div>
              <div>
                <p className="font-bold mb-1">Parul&apos;s Parents — Vrindavan → Chandigarh (4 Apr)</p>
                {vrindavanToChandigarhTransport.map((t, i) => (
                  <p key={i}>{modeEmoji(t.mode)} {t.label}: {symbol}{convert(t.costTotal)} {t.recommended ? "⭐" : ""}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Print Flexible Plans */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">📋 Confirmed Plans (Post 7 April)</h3>
            {flexiblePlans.map((plan) => (
              <div key={plan.id} className="mb-2 text-xs">
                <p className="font-bold">{plan.icon} {plan.title} — {plan.duration} ({plan.location}){plan.group ? ` [${plan.group}]` : ""}</p>
                {plan.transport && plan.transport.map((t, i) => (
                  <p key={i} className="ml-4">{modeEmoji(t.mode)} {t.label}: {symbol}{convert(t.costTotal)} {t.recommended ? "⭐" : ""}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 mt-4 pt-2 text-xs text-gray-400 text-center">
            India Family Trip 2026 &middot; Printed Summary &middot; Costs are estimates ({symbol === "₹" ? "INR" : "AUD"}, 1 AUD ≈ 65 INR)
          </div>
        </div>
      </div>
    </>
  );
}
