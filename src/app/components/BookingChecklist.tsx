"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Plane, Train, Car, Hotel, FileText, CreditCard } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: "flight" | "train" | "taxi" | "stay" | "document" | "other";
  label: string;
  detail?: string;
  date?: string;
  preBooked?: boolean;
}

const checklist: ChecklistItem[] = [
  // Flights
  {
    id: "flight-mel-del",
    category: "flight",
    label: "Melbourne → Delhi flight",
    detail: "MH 128 → MH 172 · 31 Mar",
    date: "31 Mar",
    preBooked: true,
  },
  {
    id: "flight-del-mel",
    category: "flight",
    label: "Delhi → Melbourne flight",
    detail: "MH 173 → MH 149 · 1 May",
    date: "1 May",
    preBooked: true,
  },
  {
    id: "flight-gwl-del",
    category: "flight",
    label: "Gwalior → Delhi flight",
    detail: "IndiGo 6E 6455 · A320neo · 7 Apr · GWL 3:30 PM → DEL 4:35 PM",
    date: "7 Apr",
    preBooked: true,
  },
  // Trains
  {
    id: "train-mathura-dham",
    category: "train",
    label: "Mathura → Lalitpur/Bina train tickets",
    detail: "18238 Chhattisgarh Exp · 4 Apr · Mathura dep 06:30 · 2AC/1AC · 6 persons · alight Lalitpur or Bina",
    date: "4 Apr",
  },
  {
    id: "train-del-jal",
    category: "train",
    label: "Delhi → Jalandhar train tickets",
    detail: "12029 Swarna Shatabdi · 8 Apr · New Delhi dep 7:20 AM · CC/EC · 6 persons",
    date: "8 Apr",
  },
  // Taxi / Transport
  {
    id: "taxi-del-vrindavan",
    category: "taxi",
    label: "Delhi Airport → Vrindavan Urbania",
    detail: "9-seater · 31 Mar · ₹14,000",
    date: "31 Mar",
    preBooked: true,
  },
  {
    id: "taxi-vrindavan-mathura",
    category: "taxi",
    label: "Vrindavan → Mathura Jn taxi",
    detail: "~05:00 AM · 4 Apr · ~15 km (train dep 06:30)",
    date: "4 Apr",
  },
  {
    id: "taxi-station-dham",
    category: "taxi",
    label: "Lalitpur/Bina → Sri Anandpur Dham taxi",
    detail: "4 Apr · Lalitpur ~80 km (₹2,500–3,500) or Bina ~115 km (₹2,000–3,000)",
    date: "4 Apr",
  },
  {
    id: "taxi-dham-gwalior",
    category: "taxi",
    label: "Dham → Gwalior Airport taxi",
    detail: "7 Apr · ~230 km · ₹5,000–7,000",
    date: "7 Apr",
  },
  {
    id: "taxi-himachal",
    category: "taxi",
    label: "Himachal temple circuit taxi",
    detail: "Innova Crysta · ~17–19 Apr · ~350 km · ₹6,300",
    date: "~17 Apr",
  },
  {
    id: "taxi-jal-chd",
    category: "taxi",
    label: "Jalandhar → Chandigarh taxi/train",
    detail: "~20 Apr · 4 persons · ₹2,000",
    date: "~20 Apr",
  },
  {
    id: "taxi-parul-parents",
    category: "taxi",
    label: "Parul's parents: Vrindavan → Chandigarh",
    detail: "4 Apr · 2 persons · taxi or train",
    date: "4 Apr",
  },
  // Stays
  {
    id: "stay-vrindavan",
    category: "stay",
    label: "Vrindavan homestay (4 nights)",
    detail: "31 Mar – 4 Apr · ₹36,000",
    date: "31 Mar",
    preBooked: true,
  },
  {
    id: "stay-delhi-7apr",
    category: "stay",
    label: "The Vanson Delite, Delhi (7 Apr night)",
    detail: "7 Apr · 1 night · near New Delhi Stn & Connaught Place · ₹3,000–5,000",
    date: "7 Apr",
    preBooked: true,
  },
  {
    id: "stay-himachal",
    category: "stay",
    label: "Himachal stay (1–2 nights)",
    detail: "Chintpurni / Deotsidh area · ₹4,000–8,000",
    date: "~17 Apr",
  },
  {
    id: "stay-delhi-return",
    category: "stay",
    label: "Delhi hotel (last night before return)",
    detail: "~30 Apr · 1 night · near IGI airport",
    date: "~30 Apr",
  },
  // Documents & Other
  {
    id: "doc-visa",
    category: "document",
    label: "Check passport & visa validity",
    detail: "All 4 travelers",
  },
  {
    id: "doc-insurance",
    category: "document",
    label: "Travel insurance",
    detail: "Family of 4 · 31 Mar – 1 May",
  },
  {
    id: "doc-forex",
    category: "other",
    label: "Forex / INR cash / travel card",
    detail: "Carry sufficient INR for taxi & local expenses",
  },
  {
    id: "other-eye-consult",
    category: "other",
    label: "Eye surgery consultation booking",
    detail: "Jalandhar · ~11 Apr · both eyes",
  },
];

const categoryConfig = {
  flight: { icon: Plane, label: "Flights", color: "text-blue-500", bg: "bg-blue-50" },
  train: { icon: Train, label: "Trains", color: "text-amber-600", bg: "bg-amber-50" },
  taxi: { icon: Car, label: "Taxi & Transport", color: "text-green-600", bg: "bg-green-50" },
  stay: { icon: Hotel, label: "Accommodation", color: "text-purple-500", bg: "bg-purple-50" },
  document: { icon: FileText, label: "Documents", color: "text-red-500", bg: "bg-red-50" },
  other: { icon: CreditCard, label: "Other", color: "text-gray-500", bg: "bg-gray-50" },
};

const STORAGE_KEY = "indiatrip-checklist";

export default function BookingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setChecked(JSON.parse(saved));
      } else {
        // Pre-check items marked as preBooked
        const initial: Record<string, boolean> = {};
        checklist.forEach((item) => {
          if (item.preBooked) initial[item.id] = true;
        });
        setChecked(initial);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const total = checklist.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  // Group by category
  const categories = Object.keys(categoryConfig) as (keyof typeof categoryConfig)[];
  const grouped = categories
    .map((cat) => ({
      cat,
      items: checklist.filter((c) => c.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <section id="checklist" className="max-w-5xl mx-auto px-4 py-10 sm:py-16 print:hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Booking Checklist
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Track what&apos;s booked and what still needs booking
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 mb-4 sm:mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            {done} of {total} items done
          </span>
          <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
            {pct}%
          </span>
        </div>
        <div className="h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-green-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Grouped checklists */}
      <div className="space-y-3 sm:space-y-4">
        {grouped.map(({ cat, items }, gi) => {
          const config = categoryConfig[cat];
          const Icon = config.icon;
          const catDone = items.filter((i) => checked[i.id]).length;

          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Category header */}
              <div className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 ${config.bg} border-b border-gray-100`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
                <span className="text-xs sm:text-sm font-bold text-gray-700 flex-1">{config.label}</span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                  {catDone}/{items.length}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-50">
                {items.map((item) => {
                  const isDone = !!checked[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className="w-full flex items-start gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-left hover:bg-gray-50/50 transition-colors group"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 group-hover:text-gray-400 flex-shrink-0 mt-0.5 transition-colors" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs sm:text-sm font-medium leading-snug ${isDone ? "text-gray-400 line-through" : "text-gray-800"}`}>
                          {item.label}
                        </p>
                        {item.detail && (
                          <p className={`text-[10px] sm:text-xs mt-0.5 leading-relaxed ${isDone ? "text-gray-300" : "text-gray-400"}`}>
                            {item.detail}
                          </p>
                        )}
                      </div>
                      {item.preBooked && isDone && (
                        <span className="text-[8px] sm:text-[10px] bg-green-100 text-green-700 font-semibold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                          BOOKED
                        </span>
                      )}
                      {item.date && !isDone && (
                        <span className="text-[10px] sm:text-xs text-gray-300 font-mono flex-shrink-0 mt-0.5">
                          {item.date}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
