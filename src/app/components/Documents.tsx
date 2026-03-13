"use client";
import { motion } from "framer-motion";
import { FileText, Download, Plane, Train, AlertTriangle } from "lucide-react";

interface Document {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    type: "flight" | "train";
    status: "confirmed" | "waitlisted";
    pnr?: string;
    fileName: string;
    passengers: number;
}

const documents: Document[] = [
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
];

export default function Documents() {
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
                    All booked tickets — view or download PDFs
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
            </motion.div>

            <div className="space-y-3">
                {documents.map((doc, i) => {
                    const isWaitlisted = doc.status === "waitlisted";
                    const Icon = doc.type === "flight" ? Plane : Train;

                    return (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${
                                isWaitlisted ? "border-amber-200" : "border-gray-100"
                            }`}
                        >
                            <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
                                {/* Icon */}
                                <div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                        doc.type === "flight"
                                            ? "bg-blue-50 text-blue-500"
                                            : "bg-amber-50 text-amber-600"
                                    }`}
                                >
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                                            {doc.title}
                                        </h3>
                                        {isWaitlisted ? (
                                            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                                                <AlertTriangle className="w-3 h-3" />
                                                WAITLISTED
                                            </span>
                                        ) : (
                                            <span className="text-[10px] sm:text-xs font-semibold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                                CONFIRMED
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                        {doc.subtitle}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1 text-[10px] sm:text-xs text-gray-400">
                                        <span>{doc.date}</span>
                                        {doc.pnr && (
                                            <span className="font-mono">
                                                PNR: {doc.pnr}
                                            </span>
                                        )}
                                        <span>{doc.passengers} pax</span>
                                    </div>
                                </div>

                                {/* Download */}
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
                        </motion.div>
                    );
                })}
            </div>

            {/* Summary bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 sm:mt-6 bg-gray-50 rounded-2xl p-4 sm:p-5 flex items-center justify-between"
            >
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>
                        {documents.length} tickets &middot;{" "}
                        {documents.filter((d) => d.status === "confirmed").length} confirmed &middot;{" "}
                        {documents.filter((d) => d.status === "waitlisted").length} waitlisted
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
