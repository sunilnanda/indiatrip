export interface TransportOption {
    mode: "flight" | "train" | "taxi";
    label: string;
    duration: string;
    costPerPerson: string;
    costTotal: string;
    note?: string;
    recommended?: boolean;
    booked?: boolean;
    details?: string;
}

export interface ItineraryDay {
    id: string;
    date: string;
    dayLabel: string;
    title: string;
    subtitle?: string;
    location: string;
    from?: string;
    to?: string;
    description: string;
    tags: { label: string; free?: boolean }[];
    color: "saffron" | "green" | "gold" | "navy" | "purple";
    transport?: TransportOption[];
}

export interface FlexiblePlan {
    id: string;
    title: string;
    description: string;
    duration: string;
    icon: string;
    location: string;
    group?: string;
    transport?: TransportOption[];
}

export const flights = {
    departure: {
        date: "Tuesday, 31 March 2026",
        from: "MEL",
        fromFull: "Melbourne",
        fromTerminal: "Terminal 2",
        to: "DEL",
        toFull: "Delhi",
        toTerminal: "Terminal 3",
        departTime: "00:30",
        arriveTime: "12:15",
        duration: "17h 15min",
        stops: "1 stop",
        airline: "Malaysia Airlines",
        flightNumbers: ["MH 128", "MH 172"],
        class: "Economy Basic",
        status: "CONFIRMED",
    },
    return: {
        date: "Friday, 1 May 2026",
        from: "DEL",
        fromFull: "Delhi",
        fromTerminal: "Terminal 3",
        to: "MEL",
        toFull: "Melbourne",
        toTerminal: "Terminal 2",
        departTime: "13:15",
        arriveTime: "08:20 (+1 day)",
        duration: "14h 35min",
        stops: "1 stop",
        airline: "Malaysia Airlines",
        flightNumbers: ["MH 173", "MH 149"],
        class: "Economy Basic",
        status: "CONFIRMED",
    },
};

export const itinerary: ItineraryDay[] = [
    {
        id: "day1-flight",
        date: "31 March",
        dayLabel: "Day 1",
        title: "Melbourne to Delhi",
        location: "Melbourne → Delhi",
        from: "Melbourne",
        to: "Delhi",
        description:
            "Depart Melbourne at 00:30 on Malaysia Airlines (MH 128 → MH 172). Arrive Delhi at 12:15 PM. Sunil's parents and Parul's parents receive us at Delhi airport. Immigration & luggage ~1.5 hours. Ready by ~2:00 PM.",
        tags: [
            { label: "International Flight" },
            { label: "Confirmed" },
            { label: "Family of 4" },
        ],
        color: "saffron",
    },
    {
        id: "day1-vrindavan",
        date: "31 March",
        dayLabel: "Afternoon",
        title: "Delhi to Vrindavan",
        subtitle: "Family Reunion",
        location: "Delhi → Vrindavan, UP",
        from: "Delhi",
        to: "Vrindavan",
        description:
            "Sunil's parents and Parul's parents receive us at Delhi airport. Leave Delhi around 2:00 PM together. Reach Vrindavan by 5:30 – 6:00 PM. Settle in and rest after the long journey.",
        tags: [{ label: "Road Trip" }, { label: "Family Reunion" }, { label: "8 persons" }, { label: "Booked" }],
        color: "green",
        transport: [
            {
                mode: "taxi",
                label: "Urbania 9 Seater (Delhi Airport → Vrindavan)",
                duration: "3 – 4 hours (~180 km)",
                costPerPerson: "–",
                costTotal: "₹14,000",
                booked: true,
                note: "Hired Urbania 9 seater. Delhi Airport → Vrindavan drop. Fits all 8 persons + luggage.",
            },
        ],
    },
    {
        id: "day2",
        date: "31 March – 3 April",
        dayLabel: "Day 1 – 4",
        title: "Vrindavan Darshan",
        location: "Vrindavan, Uttar Pradesh",
        description:
            "4 days in the holy city of Vrindavan. Activities: Prem Mandir, Banke Bihari Temple, Radha Keli Kunj / Premanand Ji Maharaj satsang, ISKCON Temple, Yamuna Aarti, and optional Govardhan Parikrama.",
        tags: [{ label: "Temple Visits" }, { label: "Spiritual" }, { label: "Homestay" }, { label: "Booked" }],
        color: "green",
        transport: [
            {
                mode: "taxi",
                label: "Vrindavan Homestay (4 nights)",
                duration: "31 Mar – 4 Apr (Check-in 31 Mar, Checkout 4 Apr)",
                costPerPerson: "–",
                costTotal: "₹36,000",
                booked: true,
                note: "Confirmed booking. Location: HMH3+2JW, Sunrakh Bangar, Vrindavan. 4 nights for full family.",
            },
        ],
    },
    {
        id: "day3",
        date: "4 April",
        dayLabel: "Day 5",
        title: "Vrindavan → Sri Anandpur Dham",
        subtitle: "Group Splits – Parul's parents return to Chandigarh",
        location: "Vrindavan → Mathura Jn → Dham",
        from: "Vrindavan",
        to: "Sri Anandpur Dham (Ashok Nagar, MP)",
        description:
            "Parul's parents head back to Chandigarh from Mathura (12925 Paschim Express, 1A, WAITLISTED). Our family (6 persons) takes morning Shatabdi from Mathura Junction (12002 Shatabdi Express, CC, dep 07:20). Arrive Lalitpur at 11:42. Taxi ~80 km (~2h) to Dham. Arrive ~1:45 PM.",
        tags: [{ label: "Travel Day" }, { label: "Train + Taxi" }, { label: "6 persons" }, { label: "Group Split" }, { label: "Booked" }],
        color: "gold",
        transport: [
            {
                mode: "train",
                label: "Mathura → Lalitpur (12002 Shatabdi Express)",
                duration: "~4h 22min (07:20 – 11:42)",
                costPerPerson: "₹985",
                costTotal: "₹7,348 (6 persons, all inclusive)",
                recommended: true,
                booked: true,
                details: "PNR: 2514096012",
                note: "12002 Shatabdi Express, AC Chair Car (CC). MTJ dep 07:20 → LAR arr 11:42. 6 persons confirmed: C6/61-64 & C3/57-58. Taxi Lalitpur → Dham (~80 km, ~2h). Arrive Dham ~1:45 PM.",
            },
            {
                mode: "train",
                label: "Parul's Parents: Mathura → Chandigarh (12925 Paschim Exp)",
                duration: "~7h 48min (07:35 – 15:23)",
                costPerPerson: "₹1,710",
                costTotal: "₹3,455 (2 persons, all inclusive)",
                details: "PNR: 8145795505",
                note: "12925 Paschim Express, First AC (1A). MTJ dep 07:35 → CDG arr 15:23. 2 persons: Nagesh Dixit & Rama Dixit. PNR: 8145795505. STATUS: WAITLISTED (RLWL/1, RLWL/2).",
            },
        ],
    },
    {
        id: "day4",
        date: "4 – 7 April",
        dayLabel: "3 Nights",
        title: "Sri Anandpur Dham Stay",
        location: "Sri Anandpur Dham, Ashok Nagar, MP",
        description:
            "Arrive evening of 4th April and settle in. 3 nights at the ashram — attend spiritual sessions, engage with the community, and spend quality time with family. Depart morning of 7th April.",
        tags: [{ label: "No Accommodation Cost", free: false }, { label: "6 persons" }, { label: "3 Nights" }],
        color: "gold",
    },
    {
        id: "day8",
        date: "7 April",
        dayLabel: "Departure Day",
        title: "Dham → Gwalior → Delhi",
        location: "Sri Anandpur Dham → Gwalior → Delhi",
        from: "Sri Anandpur Dham",
        to: "Delhi",
        description:
            "Leave Dham early morning. Taxi to Gwalior Airport (~230 km, 4–5 hours). IndiGo 6E 6455: GWL dep 15:30 → DEL T1 arr 16:35. PNR V9Q5SJ. Overnight stay near Delhi. Rest after long travel day.",
        tags: [{ label: "Travel Day" }, { label: "6 persons" }, { label: "Taxi + Flight" }, { label: "Delhi Overnight" }, { label: "Booked" }],
        color: "navy",
        transport: [
            {
                mode: "taxi",
                label: "Dham → Gwalior Airport",
                duration: "4 – 5 hours (~230 km)",
                costPerPerson: "–",
                costTotal: "₹3,000",
                note: "Leave Dham early morning. Taxi to Gwalior Airport (~230 km). To be confirmed.",
            },
            {
                mode: "flight",
                label: "IndiGo 6E 6455 (GWL → DEL)",
                duration: "1h 5min (3:30 PM – 4:35 PM)",
                costPerPerson: "₹3,009",
                costTotal: "₹18,054 (6 persons, all inclusive)",
                recommended: true,
                booked: true,
                details: "PNR: V9Q5SJ",
                note: "IndiGo 6E 6455 · Airbus A320 · GWL dep 15:30 → DEL T1 arr 16:35. Seats: 8A/8B/8C (Sunil/Anita/Ashok), 9A/9B/9C (Parul/Devanshi/Ryaan). Check-in closes 14:30. Confirmed.",
            },
        ],
    },
    {
        id: "day9-delhi-jalandhar",
        date: "8 April",
        dayLabel: "Morning",
        title: "Delhi → Jalandhar",
        subtitle: "Swarna Shatabdi Express",
        location: "New Delhi → Jalandhar Cantt",
        from: "Delhi",
        to: "Jalandhar",
        description:
            "Early morning train from New Delhi. 12029 Swarn Shatabdi Express: New Delhi dep 7:20 AM → Jalandhar City arr 12:06 PM. AC Chair Car. Arrive Jalandhar by lunch time. Settle in with family.",
        tags: [{ label: "Train" }, { label: "6 persons" }, { label: "CC" }, { label: "Booked" }],
        color: "purple",
        transport: [
            {
                mode: "train",
                label: "12029 Swarn Shatabdi (Delhi → Jalandhar)",
                duration: "~4h 46min (7:20 AM – 12:06 PM)",
                costPerPerson: "₹835",
                costTotal: "₹6,243 (6 persons, all inclusive)",
                recommended: true,
                booked: true,
                details: "PNR: 2732876330",
                note: "NDLS dep 07:20 → JUC arr 12:06. AC Chair Car (CC). 6 persons confirmed: C10/10-15. Complimentary meals (VEG). Confirmed.",
            },
        ],
    },
    {
        id: "day9-jalandhar",
        date: "8 April",
        dayLabel: "Afternoon",
        title: "Settle in Jalandhar",
        location: "Jalandhar, Punjab",
        description:
            "Arrive Jalandhar 12:06 PM. Rest and settle in. Catch up with family and relatives. Prepare for upcoming eye surgery.",
        tags: [{ label: "Family Time" }, { label: "Hometown" }],
        color: "purple",
    },
    {
        id: "eye-surgery",
        date: "~11 April",
        dayLabel: "After Settling",
        title: "Sunil's Eye Surgery",
        location: "Jalandhar, Punjab",
        description:
            "Eye surgery (both eyes) planned around 11th April in Jalandhar. Recovery and follow-up visits needed over 5 – 7 days. Plan other activities around this schedule.",
        tags: [{ label: "Medical" }, { label: "Both Eyes" }, { label: "5 – 7 Days Recovery" }],
        color: "purple",
        transport: [
            {
                mode: "taxi",
                label: "Eye Surgery Cost (Both Eyes)",
                duration: "~11 April + 5 – 7 days recovery",
                costPerPerson: "–",
                costTotal: "₹80,000 – ₹1,30,000",
                recommended: true,
                note: "LASIK / PRK / ICL for both eyes. Includes consultation, surgery, post-op medication & follow-ups.",
            },
        ],
    },
    {
        id: "himachal",
        date: "~17 – 19 April",
        dayLabel: "2 – 3 Days",
        title: "Himachal Temple Circuit + Jathere",
        subtitle: "6 persons – Family Temple Trip",
        location: "Jalandhar → Lower Himachal Pradesh",
        from: "Jalandhar",
        to: "Himachal Pradesh",
        description:
            "Leave Jalandhar early morning around 6:00 – 7:00 AM. Jathere (ancestor worship) on 18th April. Sunil's Mom-Dad + Sunil, Parul & Kids (6 persons). Temple circuit: Chintpurni Mata Temple (~3h drive), Baba Balak Nath Ji (Deotsidh), Kamahi Devi Temple (Beh Nangal). ~350 km round trip.",
        tags: [
            { label: "6 persons" },
            { label: "Jathere 18 Apr" },
            { label: "Temple Circuit" },
            { label: "Hill Drive" },
        ],
        color: "purple",
        transport: [
            {
                mode: "taxi",
                label: "Innova Crysta with Driver (Full Circuit)",
                duration: "2 – 3 days round trip",
                costPerPerson: "–",
                costTotal: "₹6,300",
                recommended: true,
                note: "@ ₹18/km × 350 km. Jalandhar → Chintpurni (~120 km) → Deotsidh (~60 km) → Beh Nangal (~40 km) → Jalandhar. Seats 6 — fits all persons.",
            },
            {
                mode: "taxi",
                label: "Himachal Stay (1–2 nights)",
                duration: "Near Chintpurni / Deotsidh",
                costPerPerson: "–",
                costTotal: "₹4,000 – ₹8,000",
                note: "Hotels in Chintpurni ~₹4,000/night. 2 rooms for 6 persons = ₹8,000/night. 1–2 nights stay.",
            },
        ],
    },
    {
        id: "chandigarh",
        date: "~20 – 26 April",
        dayLabel: "~7 Days",
        title: "Visit to Chandigarh",
        subtitle: "Sunil + Parul + Kids",
        location: "Jalandhar → Chandigarh",
        from: "Jalandhar",
        to: "Chandigarh",
        description:
            "Leave Jalandhar around 8:00 – 9:00 AM. Reach Chandigarh by 11:00 AM – 12:00 PM. 2 days at Vanita's place, then 5 days at Parul's Mom-Dad house. Explore Rock Garden, Sukhna Lake, Sector 17, Rose Garden, Elante Mall.",
        tags: [
            { label: "4 persons" },
            { label: "2 Days Vanita's" },
            { label: "5 Days Parul's Parents" },
        ],
        color: "purple",
        transport: [
            {
                mode: "taxi",
                label: "Innova Crysta / Similar",
                duration: "2.5 – 3 hours (~144 km)",
                costPerPerson: "–",
                costTotal: "₹2,000",
                recommended: true,
                note: "One-way taxi Jalandhar → Chandigarh. Seats 6 — comfortable for 4 persons with luggage & kids.",
            },
            {
                mode: "train",
                label: "Train (Jalandhar → Chandigarh)",
                duration: "2.5 – 3.5 hours",
                costPerPerson: "₹200 – ₹600",
                costTotal: "₹800 – ₹2,400 (4 persons)",
                note: "Jan Shatabdi 12036: JUC dep 06:25 → CDG arr 09:05. Intercity 14682: JUC dep 07:15 → CDG arr 10:00. Shatabdi 12046: JUC dep 14:30 → CDG arr 16:45. CC ₹200 / EC ₹600.",
            },
        ],
    },
    {
        id: "return-delhi",
        date: "~28 – 30 April",
        dayLabel: "Final Days",
        title: "Return to Delhi",
        location: "Jalandhar → Delhi",
        from: "Jalandhar",
        to: "Delhi",
        description:
            "Leave Jalandhar morning around 7:00 – 8:00 AM by train/taxi. Arrive Delhi by 1:00 – 3:00 PM. Rest and prepare for return flight on 1st May. Last-minute shopping, packing, and goodbyes.",
        tags: [{ label: "Travel Day" }, { label: "Pre-Departure" }],
        color: "navy",
    },
    {
        id: "return-flight",
        date: "1 May",
        dayLabel: "Departure",
        title: "Delhi to Melbourne",
        location: "Delhi → Melbourne",
        from: "Delhi",
        to: "Melbourne",
        description:
            "Depart Delhi at 13:15 on Malaysia Airlines (MH 173 → MH 149). Arrive Melbourne at 08:20 next day. End of an incredible trip!",
        tags: [
            { label: "International Flight" },
            { label: "Confirmed" },
            { label: "Family of 4" },
        ],
        color: "saffron",
    },
];

export const delhiToJalandharTransport: TransportOption[] = [
    {
        mode: "train",
        label: "12029 Swarn Shatabdi (Delhi → Jalandhar)",
        duration: "~4h 46min (7:20 AM – 12:06 PM)",
        costPerPerson: "₹835",
        costTotal: "₹6,243 (6 persons, all inclusive)",
        recommended: true,
        booked: true,
        details: "PNR: 2732876330",
        note: "NDLS dep 07:20 → JUC arr 12:06. AC Chair Car (CC). 6 persons confirmed: C10/10-15. Complimentary meals (VEG).",
    },
];

export const vrindavanToChandigarhTransport: TransportOption[] = [
    {
        mode: "train",
        label: "12925 Paschim Express (Mathura → Chandigarh)",
        duration: "~7h 48min (07:35 – 15:23)",
        costPerPerson: "₹1,710",
        costTotal: "₹3,455 (2 persons, all inclusive)",
        recommended: true,
        details: "PNR: 8145795505",
        note: "First AC (1A). MTJ dep 07:35 → CDG arr 15:23. PNR: 8145795505. Nagesh Dixit & Rama Dixit. STATUS: WAITLISTED (RLWL/1, RLWL/2). If not confirmed, fallback to taxi.",
    },
    {
        mode: "taxi",
        label: "Fallback: Innova Crysta / Similar",
        duration: "5 – 6 hours (~300 km)",
        costPerPerson: "–",
        costTotal: "₹5,400",
        note: "@ ₹18/km × 300 km. Vrindavan → Chandigarh via Delhi bypass. Comfortable for 2 persons.",
    },
];

export const parentsJalandharToDelhi: TransportOption[] = [
    {
        mode: "train",
        label: "12014 Amritsar Shatabdi (Jalandhar → Delhi)",
        duration: "~5h 01min (06:01 – 11:02)",
        costPerPerson: "₹890",
        costTotal: "₹1,899 (2 persons, all inclusive)",
        recommended: true,
        booked: true,
        details: "PNR: 2732874627",
        note: "AC Chair Car (CC). JUC dep 06:01 → NDLS arr 11:02. 2 persons: Ashok Nanda (C2/40 WS) & Anita Nanda (C2/41). Confirmed. Parents travel to Delhi on 31 Mar morning to receive family at airport.",
    },
];

export const flexiblePlans: FlexiblePlan[] = [
    {
        id: "eye-surgery",
        title: "Sunil's Eye Surgery",
        description:
            "Eye surgery (both eyes) planned around 11th April in Jalandhar. Recovery and follow-up visits needed. Plan other activities around this schedule.",
        duration: "Around 11 Apr, 5 – 7 Days",
        icon: "👁️",
        location: "Jalandhar, Punjab",
        group: "Sunil",
        transport: [
            {
                mode: "taxi",
                label: "Eye Surgery Cost (Both Eyes)",
                duration: "~11 April + 5 – 7 days recovery",
                costPerPerson: "–",
                costTotal: "₹80,000 – ₹1,30,000",
                recommended: true,
                note: "LASIK / PRK / ICL for both eyes. Includes consultation, surgery, post-op medication & follow-ups.",
            },
        ],
    },
    {
        id: "himachal",
        title: "Himachal Temple Circuit + Jathere",
        description:
            "Leave Jalandhar early morning around 6:00 – 7:00 AM. Jathere (ancestor worship) on 18th April. Sunil's Mom-Dad + Sunil, Parul & Kids (6 persons). Temple circuit: Chintpurni Mata Temple (~3h drive), Baba Balak Nath Ji (Deotsidh), Kamahi Devi Temple (Beh Nangal). ~350 km round trip.",
        duration: "~17 – 19 April (2 – 3 Days)",
        icon: "🛕",
        location: "Lower Himachal Pradesh",
        group: "Sunil's Mom-Dad + Sunil + Parul + Devanshi + Ryaan (6 persons)",
        transport: [
            {
                mode: "taxi",
                label: "Innova Crysta with Driver (Full Circuit)",
                duration: "2 – 3 days round trip",
                costPerPerson: "–",
                costTotal: "₹6,300",
                recommended: true,
                note: "@ ₹18/km × 350 km. Jalandhar → Chintpurni (~120 km) → Deotsidh (~60 km) → Beh Nangal (~40 km) → Jalandhar. Seats 6 — fits all persons.",
            },
            {
                mode: "taxi",
                label: "Himachal Stay (1–2 nights)",
                duration: "Near Chintpurni / Deotsidh",
                costPerPerson: "–",
                costTotal: "₹4,000 – ₹8,000",
                note: "Hotels in Chintpurni ~₹4,000/night. 2 rooms for 6 persons = ₹8,000/night. 1–2 nights stay.",
            },
        ],
    },
    {
        id: "chandigarh",
        title: "Visit to Chandigarh",
        description:
            "Leave Jalandhar around 8:00 – 9:00 AM, reach Chandigarh by 11:00 AM – 12:00 PM. 2 days at Vanita's place, 5 days at Parul's Mom-Dad house. Explore the City Beautiful — Rock Garden, Sukhna Lake, Sector 17 market, Rose Garden, Elante Mall.",
        duration: "~20 – 26 April (~7 Days)",
        icon: "🏙️",
        location: "Chandigarh",
        group: "Sunil + Parul + Devanshi + Ryaan (4 persons)",
        transport: [
            {
                mode: "taxi",
                label: "Innova Crysta / Similar",
                duration: "2.5 – 3 hours (~144 km)",
                costPerPerson: "–",
                costTotal: "₹2,000",
                recommended: true,
                note: "One-way taxi Jalandhar → Chandigarh. Seats 6 — comfortable for 4 persons with luggage & kids.",
            },
            {
                mode: "train",
                label: "Train (Jalandhar → Chandigarh)",
                duration: "2.5 – 3.5 hours",
                costPerPerson: "₹200 – ₹600",
                costTotal: "₹800 – ₹2,400 (4 persons)",
                note: "Jan Shatabdi 12036: JUC dep 06:25 → CDG arr 09:05. Intercity 14682: JUC dep 07:15 → CDG arr 10:00. Shatabdi 12046: JUC dep 14:30 → CDG arr 16:45. CC ₹200 / EC ₹600.",
            },
        ],
    },
];

export const travelers = {
    core: [
        { name: "Sunil", emoji: "👨‍💻", from: "Melbourne" },
        { name: "Parul", emoji: "👩", from: "Melbourne" },
        { name: "Devanshi", emoji: "👧", from: "Melbourne" },
        { name: "Ryaan", emoji: "👦", from: "Melbourne" },
    ],
    joining: [
        { name: "Sunil's Mom & Dad", emoji: "👴👵", from: "Receiving at Delhi Airport" },
        { name: "Parul's Mom & Dad", emoji: "👴👵", from: "Receiving at Delhi Airport" },
    ],
};

export const routeStops = [
    {
        city: "Parents: Jalandhar → Delhi",
        dates: "31 Mar",
        color: "#9333ea",
        timeline: [
            "🚆 12014 Amritsar Shatabdi · PNR 2732874627",
            "06:01 — Dep Jalandhar City (JUC)",
            "11:02 — Arr New Delhi (NDLS)",
            "Head to IGI Airport to receive family",
        ],
    },
    {
        city: "Melbourne → Delhi",
        dates: "31 Mar",
        color: "#6366f1",
        timeline: [
            "00:30 — Depart Melbourne (MH 128)",
            "06:00 — Transit Kuala Lumpur (MH 172)",
            "12:15 — Arrive Delhi IGI T3",
        ],
    },
    {
        city: "Delhi → Vrindavan",
        dates: "31 Mar",
        color: "#FF6F00",
        timeline: [
            "12:15 — Land at Delhi IGI T3",
            "~13:45 — Immigration + luggage done",
            "~14:00 — Meet family, board Urbania 9-seater",
            "~17:30–18:00 — Arrive Vrindavan homestay",
        ],
    },
    {
        city: "Vrindavan",
        dates: "31 Mar – 3 Apr",
        color: "#046A38",
        timeline: [
            "4 nights stay (checkout 4 Apr morning)",
            "Prem Mandir, Banke Bihari Temple",
            "Radha Keli Kunj / Premanand Ji satsang",
            "ISKCON Temple, Yamuna Aarti",
            "Govardhan Parikrama (optional)",
        ],
    },
    {
        city: "Vrindavan → Dham",
        dates: "4 Apr",
        color: "#D4A843",
        timeline: [
            "🚆 12002 Shatabdi Express · PNR 2514096012 · CONFIRMED",
            "~06:00 — Leave Vrindavan for Mathura Jn (~15 km)",
            "07:20 — Dep Mathura Jn (CC, 6 persons)",
            "11:42 — Arr Lalitpur Jn",
            "Taxi Lalitpur → Dham (~80 km, ~2h)",
            "~13:45 — Arrive Sri Anandpur Dham",
            "--- Parul's Parents ---",
            "🚆 12925 Paschim Exp · PNR 8145795505 · WAITLISTED",
            "07:35 — Dep Mathura → 15:23 Arr Chandigarh (1A)",
        ],
    },
    {
        city: "Sri Anandpur Dham",
        dates: "4 – 7 Apr",
        color: "#D4A843",
        timeline: [
            "3 nights at ashram",
            "Depart early morning of 7th April",
        ],
    },
    {
        city: "Dham → Delhi",
        dates: "7 Apr",
        color: "#000080",
        timeline: [
            "✈️ IndiGo 6E 6455 · PNR V9Q5SJ · CONFIRMED",
            "~06:00 — Leave Dham by taxi (~230 km)",
            "~10:30 — Arrive Gwalior Airport",
            "14:30 — Check-in/bag drop closes",
            "15:30 — Dep Gwalior (A320)",
            "16:35 — Arr Delhi IGI T1",
            "Night stay in Delhi",
        ],
    },
    {
        city: "Delhi → Jalandhar",
        dates: "8 Apr",
        color: "#9333ea",
        timeline: [
            "🚆 12029 Swarn Shatabdi · PNR 2732876330 · CONFIRMED",
            "~06:30 — Leave hotel for New Delhi Railway Station",
            "07:20 — Dep New Delhi (CC, 6 persons, C10/10-15)",
            "12:06 — Arrive Jalandhar City Jn (JUC)",
        ],
    },
    {
        city: "Jalandhar",
        dates: "8 – 28 Apr",
        color: "#9333ea",
        timeline: [
            "Hometown — rest & family time",
            "~11 Apr — Sunil's eye surgery",
            "5–7 days recovery",
        ],
    },
    {
        city: "Himachal Pradesh",
        dates: "~17 – 19 Apr",
        color: "#059669",
        timeline: [
            "18 Apr — Jathere (ancestor worship)",
            "Chintpurni → Deotsidh → Beh Nangal",
            "~350 km round trip, 6 persons",
        ],
    },
    {
        city: "Chandigarh",
        dates: "~20 – 26 Apr",
        color: "#ec4899",
        timeline: [
            "2 days at Vanita's place",
            "5 days at Parul's parents",
            "4 persons — Sunil, Parul, Kids",
        ],
    },
    {
        city: "Delhi → Melbourne",
        dates: "1 May",
        color: "#FF6F00",
        timeline: [
            "13:15 — Depart Delhi (MH 173)",
            "Transit Kuala Lumpur (MH 149)",
            "08:20 +1 — Arrive Melbourne",
        ],
    },
];
