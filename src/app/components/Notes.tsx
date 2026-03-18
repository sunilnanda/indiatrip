"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { StickyNote, Plus, Trash2, ChevronDown, ChevronUp, Save } from "lucide-react";

interface Note {
    id: string;
    title: string;
    content: string;
    color: string;
    createdAt: number;
}

const STORAGE_KEY = "indiatrip-notes-v2";

const defaultNotes: Note[] = [
    {
        id: "dad-trains",
        title: "Notes for Dad",
        content: `Book home in Delhi for 1 night:
• On 7th Night, 8th Morning Checkout
• Hotel Gold Regency

Arrange taxis:
• Vrindavan → Mathura Jn — 4 Apr early morning (~05:00 AM) — 6 persons
• Lalitpur/Bina → Sri Anandpur Dham — 4 Apr afternoon — 6 persons
• Dham → Gwalior Airport — 7 Apr early morning (~06:00 AM) — 6 persons`,
        color: "amber",
        createdAt: 1,
    },
    {
        id: "financials",
        title: "Financial Notes",
        content: `• ₹101 to be given to Montu for recharge
• ₹7,000 + ₹1,000 to be returned to Ramit (for Airbnb bookings)
• Vrindavan homestay: ₹21,000 remaining due at check-in (₹7,000 deposit paid)`,
        color: "green",
        createdAt: 2,
    },
    {
        id: "general",
        title: "General Notes",
        content: `• Pack medicines, chargers, adapters
• Carry printed copies of all e-tickets
• Download offline maps for MP & Himachal
• INR cash for taxi drivers & local expenses`,
        color: "blue",
        createdAt: 3,
    },
];

const colorConfig: Record<string, { bg: string; border: string; header: string; ring: string }> = {
    amber: { bg: "bg-amber-50", border: "border-amber-200", header: "bg-amber-100", ring: "ring-amber-300" },
    blue: { bg: "bg-blue-50", border: "border-blue-200", header: "bg-blue-100", ring: "ring-blue-300" },
    green: { bg: "bg-green-50", border: "border-green-200", header: "bg-green-100", ring: "ring-green-300" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", header: "bg-purple-100", ring: "ring-purple-300" },
    rose: { bg: "bg-rose-50", border: "border-rose-200", header: "bg-rose-100", ring: "ring-rose-300" },
};

const colorOptions = Object.keys(colorConfig);

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
    const [loaded, setLoaded] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

    // Load from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setNotes(JSON.parse(saved));
            } else {
                setNotes(defaultNotes);
            }
        } catch {
            setNotes(defaultNotes);
        }
        setLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (!loaded) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch {
            // ignore
        }
    }, [notes, loaded]);

    // Auto-resize textarea
    const autoResize = (el: HTMLTextAreaElement | null) => {
        if (!el) return;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    };

    useEffect(() => {
        Object.values(textareaRefs.current).forEach(autoResize);
    }, [notes, collapsed]);

    const updateNote = (id: string, field: "title" | "content", value: string) => {
        setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, [field]: value } : n)));
    };

    const addNote = () => {
        const newNote: Note = {
            id: `note-${Date.now()}`,
            title: "New Note",
            content: "",
            color: colorOptions[notes.length % colorOptions.length],
            createdAt: Date.now(),
        };
        setNotes((prev) => [...prev, newNote]);
    };

    const deleteNote = (id: string) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const toggleCollapse = (id: string) => {
        setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const cycleColor = (id: string) => {
        setNotes((prev) =>
            prev.map((n) => {
                if (n.id !== id) return n;
                const idx = colorOptions.indexOf(n.color);
                return { ...n, color: colorOptions[(idx + 1) % colorOptions.length] };
            })
        );
    };

    if (!loaded) return null;

    return (
        <section id="notes" className="max-w-5xl mx-auto px-4 py-10 sm:py-16 print:hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-10"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Notes
                </h2>
                <p className="text-sm sm:text-base text-gray-500">
                    Editable notes &amp; reminders for the trip
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto mt-3" />
            </motion.div>

            <div className="space-y-3 sm:space-y-4">
                {notes.map((note, i) => {
                    const colors = colorConfig[note.color] || colorConfig.amber;
                    const isCollapsed = collapsed[note.id];

                    return (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`rounded-2xl border ${colors.border} overflow-hidden shadow-sm`}
                        >
                            {/* Header */}
                            <div className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 ${colors.header}`}>
                                <button
                                    onClick={() => cycleColor(note.id)}
                                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                                    style={{ backgroundColor: `var(--color-${note.color}-400, #f59e0b)` }}
                                    title="Change color"
                                />
                                <input
                                    type="text"
                                    value={note.title}
                                    onChange={(e) => updateNote(note.id, "title", e.target.value)}
                                    className={`flex-1 text-xs sm:text-sm font-bold text-gray-700 bg-transparent border-none outline-none focus:ring-1 ${colors.ring} rounded px-1`}
                                />
                                <button
                                    onClick={() => toggleCollapse(note.id)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                >
                                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                                </button>
                                {confirmDelete === note.id ? (
                                    <button
                                        onClick={() => {
                                            if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
                                            setConfirmDelete(null);
                                            deleteNote(note.id);
                                        }}
                                        className="text-red-500 hover:text-red-600 transition-colors px-1.5 py-0.5 rounded bg-red-50 text-[10px] sm:text-xs font-semibold"
                                    >
                                        Confirm?
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setConfirmDelete(note.id);
                                            if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
                                            confirmTimerRef.current = setTimeout(() => setConfirmDelete(null), 3000);
                                        }}
                                        className="text-gray-300 hover:text-red-400 transition-colors p-1"
                                        aria-label="Delete note"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            {/* Content */}
                            {!isCollapsed && (
                                <div className={`${colors.bg} px-4 sm:px-5 py-3`}>
                                    <textarea
                                        ref={(el) => {
                                            textareaRefs.current[note.id] = el;
                                            autoResize(el);
                                        }}
                                        value={note.content}
                                        onChange={(e) => {
                                            updateNote(note.id, "content", e.target.value);
                                            autoResize(e.target);
                                        }}
                                        placeholder="Write your notes here..."
                                        className={`w-full text-xs sm:text-sm text-gray-700 bg-transparent border-none outline-none resize-none leading-relaxed focus:ring-1 ${colors.ring} rounded p-1 min-h-[60px]`}
                                        rows={1}
                                    />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Add note button */}
            <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onClick={addNote}
                className="mt-4 sm:mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-300 transition-all text-xs sm:text-sm font-medium"
            >
                <Plus className="w-4 h-4" />
                Add Note
            </motion.button>

            <p className="text-center text-[10px] sm:text-xs text-gray-300 mt-3">
                <Save className="w-3 h-3 inline-block mr-1" />
                Notes auto-save to your browser
            </p>
        </section>
    );
}
