"use client";
import { motion } from "framer-motion";
import { FileText, Download, Plane, Train, AlertTriangle, ShieldCheck, Stamp, Ticket, CreditCard } from "lucide-react";

type DocType = "flight" | "train" | "e-ticket" | "passport" | "visa" | "id";

interface Document {
    id: string;
    title: string;
    subtitle: string;
    date?: string;
    type: DocType;
    status?: "confirmed" | "waitlisted";
    pnr?: string;
    fileName: string;
    passengers?: number;
    person?: string;
}

const typeConfig: Record<DocType, { icon: typeof Plane; color: string; bg: string; label: string }> = {
    flight: { icon: Plane, color: "text-blue-500", bg: "bg-blue-50", label: "Domestic Flights" },
    train: { icon: Train, color: "text-amber-600", bg: "bg-amber-50", label: "Train Tickets" },
    "e-ticket": { icon: Ticket, color: "text-indigo-500", bg: "bg-indigo-50", label: "International Flights" },
    passport: { icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", label: "Passports" },
    visa: { icon: Stamp, color: "text-purple-500", bg: "bg-purple-50", label: "Visas" },
    id: { icon: CreditCard, color: "text-cyan-600", bg: "bg-cyan-50", label: "Aadhaar / ID" },
};

const documents: Document[] = [
    // International flight e-ticket
    {
        id: "eticket-mel-del",
        title: "Melbourne ↔ Delhi (Round Trip)",
        subtitle: "Malaysia Airlines · MH 128/172 & MH 173/149",
        date: "31 Mar – 1 May 2026",
        type: "e-ticket",
        status: "confirmed",
        fileName: "Your Electronic Ticket-EMD Receipt.pdf",
        passengers: 4,
    },
    // Train tickets
    {
        id: "train-juc-ndls",
        title: "Jalandhar → New Delhi",
        subtitle: "12014 Amritsar Shatabdi · CC",
        date: "31 Mar 2026",
        type: "train",
        status: "confirmed",
        pnr: "2732874627",
        fileName: "jalandhar to delhi.pdf",
        passengers: 2,
    },
    {
        id: "train-mtj-lar",
        title: "Mathura Jn → Lalitpur Jn",
        subtitle: "12002 Shatabdi Express · CC",
        date: "4 Apr 2026",
        type: "train",
        status: "confirmed",
        pnr: "2514096012",
        fileName: "mathura to lalitpur.pdf",
        passengers: 6,
    },
    {
        id: "train-mtj-cdg",
        title: "Mathura Jn → Chandigarh",
        subtitle: "12925 Paschim Express · 1A",
        date: "4 Apr 2026",
        type: "train",
        status: "waitlisted",
        pnr: "8145795505",
        fileName: "MATHURA TO CHANDIGARG.pdf",
        passengers: 2,
    },
    // Domestic flight
    {
        id: "flight-gwl-del",
        title: "Gwalior → Delhi",
        subtitle: "IndiGo 6E 6455 · A320",
        date: "7 Apr 2026",
        type: "flight",
        status: "confirmed",
        pnr: "V9Q5SJ",
        fileName: "Gmail - Your IndiGo Itinerary - V9Q5SJ.pdf",
        passengers: 6,
    },
    {
        id: "train-ndls-juc",
        title: "New Delhi → Jalandhar City",
        subtitle: "12029 Swarn Shatabdi · CC",
        date: "8 Apr 2026",
        type: "train",
        status: "confirmed",
        pnr: "2732876330",
        fileName: "Delhi to jalandhar.pdf",
        passengers: 6,
    },
    // Passports
    {
        id: "passport-sunil",
        title: "Sunil — Australian Passport",
        subtitle: "Current passport",
        type: "passport",
        person: "Sunil",
        fileName: "Sunil-Australian+Passport.pdf",
    },
    {
        id: "passport-parul",
        title: "Parul — Australian Passport",
        subtitle: "Current passport",
        type: "passport",
        person: "Parul",
        fileName: "Parul-Australian+Passport.pdf",
    },
    {
        id: "passport-devanshi-new",
        title: "Devanshi — Passport (New)",
        subtitle: "Current passport",
        type: "passport",
        person: "Devanshi",
        fileName: "Devanshi-Passport-New.pdf",
    },
    {
        id: "passport-devanshi-old",
        title: "Devanshi — Passport (Expired)",
        subtitle: "Old passport with previous visa",
        type: "passport",
        person: "Devanshi",
        fileName: "Devanshi-Passport-Expired.pdf",
    },
    {
        id: "passport-ryaan-new",
        title: "Ryaan — Passport (New)",
        subtitle: "Current passport",
        type: "passport",
        person: "Ryaan",
        fileName: "Ryaan-Passport-New.pdf",
    },
    {
        id: "passport-ryaan-old",
        title: "Ryaan — Passport (Expired)",
        subtitle: "Old passport with previous visa",
        type: "passport",
        person: "Ryaan",
        fileName: "Ryaan-Passport-Expired.pdf",
    },
    {
        id: "passport-ashok",
        title: "Ashok Nanda — Indian Passport",
        subtitle: "Sunil's Dad",
        type: "passport",
        person: "Ashok Nanda",
        fileName: "ASHOK NANDA-Passport.pdf",
    },
    {
        id: "passport-anita",
        title: "Anita Nanda — Indian Passport",
        subtitle: "Sunil's Mom",
        type: "passport",
        person: "Anita Nanda",
        fileName: "ANITA NANDA-Passport.pdf",
    },
    // Visas
    {
        id: "visa-sunil",
        title: "Sunil — Indian e-Visa",
        subtitle: "e-Tourist Visa",
        type: "visa",
        person: "Sunil",
        fileName: "Visa-Sunil.pdf",
    },
    {
        id: "visa-parul",
        title: "Parul — Indian e-Visa",
        subtitle: "e-Tourist Visa",
        type: "visa",
        person: "Parul",
        fileName: "Visa-Parul.pdf",
    },
    {
        id: "visa-devanshi",
        title: "Devanshi — Indian e-Visa",
        subtitle: "e-Tourist Visa",
        type: "visa",
        person: "Devanshi",
        fileName: "Visa-Devanshi.pdf",
    },
    {
        id: "visa-ryaan",
        title: "Ryaan — Indian e-Visa",
        subtitle: "e-Tourist Visa",
        type: "visa",
        person: "Ryaan",
        fileName: "Visa-Ryaan.pdf",
    },
    // Aadhaar / ID
    {
        id: "aadhaar-sunil",
        title: "Sunil — Aadhaar (Masked)",
        subtitle: "e-Aadhaar",
        type: "id",
        person: "Sunil",
        fileName: "Sunil-EAadhaar__masked.pdf",
    },
    {
        id: "aadhaar-sunil-unmasked",
        title: "Sunil — Aadhaar (Unmasked)",
        subtitle: "e-Aadhaar · Full details",
        type: "id",
        person: "Sunil",
        fileName: "Sunil-EAadhaar__unmasked.pdf",
    },
    {
        id: "aadhaar-parul",
        title: "Parul — Aadhaar",
        subtitle: "Aadhaar card",
        type: "id",
        person: "Parul",
        fileName: "Adhaar - Parul.jpg",
    },
];

const groupOrder: DocType[] = ["e-ticket", "flight", "train", "passport", "visa", "id"];

export default function Documents() {
    const grouped = groupOrder
        .map((type) => ({
            type,
            config: typeConfig[type],
            docs: documents.filter((d) => d.type === type),
        }))
        .filter((g) => g.docs.length > 0);

    const ticketDocs = documents.filter((d) => d.type === "flight" || d.type === "train" || d.type === "e-ticket");

    return (
        <section id="documents" className="max-w-5xl mx-auto px-4 py-10 sm:py-16 print:hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-10"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Travel Documents
                </h2>
                <p className="text-sm sm:text-base text-gray-500">
                    Tickets, passports &amp; visas — view or download PDFs
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
            </motion.div>

            <div className="space-y-4 sm:space-y-6">
                {grouped.map(({ type, config, docs }, gi) => {
                    const GroupIcon = config.icon;
                    return (
                        <motion.div
                            key={type}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: gi * 0.05 }}
                        >
                            {/* Section header */}
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                <GroupIcon className={`w-4 h-4 ${config.color}`} />
                                <h3 className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    {config.label}
                                </h3>
                                <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                                    ({docs.length})
                                </span>
                            </div>

                            {/* Compact grid for passports/visas, full cards for tickets */}
                            {type === "passport" || type === "visa" || type === "id" ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                    {docs.map((doc) => {
                                        const Icon = config.icon;
                                        return (
                                            <a
                                                key={doc.id}
                                                href={`/${encodeURIComponent(doc.fileName)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-gray-200 transition-all group"
                                            >
                                                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${config.bg} ${config.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </div>
                                                <div className="text-center min-w-0 w-full">
                                                    <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                                                        {doc.person || doc.title}
                                                    </p>
                                                    <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                                                        {doc.subtitle}
                                                    </p>
                                                </div>
                                                <span className="text-[10px] sm:text-xs text-blue-500 font-medium flex items-center gap-1">
                                                    <Download className="w-3 h-3" /> View
                                                </span>
                                            </a>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="space-y-2 sm:space-y-3">
                                    {docs.map((doc) => {
                                        const isWaitlisted = doc.status === "waitlisted";
                                        const Icon = config.icon;

                                        return (
                                            <div
                                                key={doc.id}
                                                className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${
                                                    isWaitlisted ? "border-amber-200" : "border-gray-100"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg} ${config.color}`}>
                                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                                                                {doc.title}
                                                            </h3>
                                                            {doc.status === "waitlisted" ? (
                                                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                                                                    <AlertTriangle className="w-3 h-3" />
                                                                    WAITLISTED
                                                                </span>
                                                            ) : doc.status === "confirmed" ? (
                                                                <span className="text-[10px] sm:text-xs font-semibold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                                                    CONFIRMED
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                                            {doc.subtitle}
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-1 text-[10px] sm:text-xs text-gray-400 flex-wrap">
                                                            {doc.date && <span>{doc.date}</span>}
                                                            {doc.pnr && <span className="font-mono">PNR: {doc.pnr}</span>}
                                                            {doc.passengers && <span>{doc.passengers} pax</span>}
                                                            {doc.person && <span>{doc.person}</span>}
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={`/${encodeURIComponent(doc.fileName)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs sm:text-sm font-medium text-gray-700 transition-colors flex-shrink-0"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        <span className="hidden sm:inline">View PDF</span>
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Summary bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 sm:mt-6 bg-gray-50 rounded-2xl p-4 sm:p-5 flex items-center justify-between flex-wrap gap-2"
            >
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>
                        {documents.length} documents &middot;{" "}
                        {ticketDocs.filter((d) => d.status === "confirmed").length} tickets confirmed &middot;{" "}
                        {ticketDocs.filter((d) => d.status === "waitlisted").length} waitlisted &middot;{" "}
                        {documents.filter((d) => d.type === "passport").length} passports &middot;{" "}
                        {documents.filter((d) => d.type === "visa").length} visas
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
