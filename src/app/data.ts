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
            "Parul's parents head back to Chandigarh from Vrindavan. Our family (6 persons) takes morning train from Mathura Junction (18238 Chhattisgarh Express, arr 06:25, dep 06:30). Two route options: Option 1 (Recommended) — alight at Lalitpur (arr 14:28, PF #2), taxi ~80 km (~2h) to Dham, arrive ~4:30 PM. Option 2 — alight at Bina Jn (arr 15:55, PF #3), taxi ~115 km (~2h 45min) to Dham, arrive ~6:45 PM.",
        tags: [{ label: "Travel Day" }, { label: "Train + Taxi" }, { label: "6 persons" }, { label: "Group Split" }],
        color: "gold",
        transport: [
            {
                mode: "train",
                label: "Option 1: Mathura → Lalitpur + Taxi",
                duration: "~8h train + ~2h taxi",
                costPerPerson: "₹800 – ₹2,500",
                costTotal: "₹4,800 – ₹15,000 (6 persons) + ₹2,500–3,500 taxi",
                recommended: true,
                note: "18238 Chhattisgarh Exp: Mathura arr 06:25, dep 06:30 → Lalitpur arr 14:28 (dep 14:30). PF #2. Taxi Lalitpur → Dham (~80 km, ~2h). Arrive ~4:30 PM. Shorter train + shorter taxi. Lalitpur is smaller — taxi may need pre-arrangement.",
            },
            {
                mode: "train",
                label: "Option 2: Mathura → Bina + Taxi",
                duration: "~9.5h train + ~2.75h taxi",
                costPerPerson: "₹800 – ₹2,500",
                costTotal: "₹4,800 – ₹15,000 (6 persons) + ₹2,000–3,000 taxi",
                note: "18238 Chhattisgarh Exp: Mathura arr 06:25, dep 06:30 → Bina Jn arr 15:55 (dep 16:00). PF #3. Taxi Bina → Dham (~115 km, ~2h 45min). Arrive ~6:45 PM. Longer train + longer taxi. Bina is a major junction — taxis easily available.",
            },
            {
                mode: "taxi",
                label: "Fallback: Direct Drive",
                duration: "7 – 9 hours (~390 km)",
                costPerPerson: "–",
                costTotal: "₹12,000",
                note: "Innova Crysta / Similar. Direct taxi from Vrindavan. Seats 6 — fits all persons with luggage.",
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
            "Leave Dham early morning. Taxi to Gwalior Airport (~230 km, 4–5 hours). IndiGo 6E 6455: GWL dep 3:30 PM → DEL arr 4:35 PM. Overnight stay near Delhi airport or central Delhi. Rest after long travel day.",
        tags: [{ label: "Travel Day" }, { label: "6 persons" }, { label: "Taxi + Flight" }, { label: "Delhi Overnight" }],
        color: "navy",
        transport: [
            {
                mode: "taxi",
                label: "Dham → Gwalior Airport",
                duration: "4 – 5 hours (~230 km)",
                costPerPerson: "–",
                costTotal: "₹5,000 – ₹7,000",
                note: "Leave Dham early morning. Taxi to Gwalior Airport (~230 km).",
            },
            {
                mode: "flight",
                label: "IndiGo 6E 6455 (GWL → DEL)",
                duration: "1h 5min (3:30 PM – 4:35 PM)",
                costPerPerson: "~₹2,500",
                costTotal: "~₹15,000 (6 persons)",
                recommended: true,
                booked: true,
                note: "IndiGo 6E 6455 · Airbus A320neo · GWL dep 3:30 PM → DEL arr 4:35 PM. Economy. Confirmed.",
            },
{
                mode: "taxi",
                label: "Innova Crysta / Similar (Direct Drive to Delhi)",
                duration: "7 – 9 hours (~390 km)",
                costPerPerson: "–",
                costTotal: "₹12,000",
                note: "Fallback: Direct taxi Dham → Delhi if flights unavailable.",
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
            "Early morning train from New Delhi. 12029 Swarna Shatabdi Express: New Delhi dep 7:20 AM → Jalandhar Cantt arr 12:06 PM. Chair Car or Executive Chair Car. Arrive Jalandhar by lunch time. Settle in with family.",
        tags: [{ label: "Train" }, { label: "6 persons" }, { label: "CC/EC" }],
        color: "purple",
        transport: [
            {
                mode: "train",
                label: "12029 Swarna Shatabdi (Delhi → Jalandhar)",
                duration: "~4h 45min (7:20 AM – 12:06 PM)",
                costPerPerson: "₹700 – ₹1,500",
                costTotal: "₹4,200 – ₹9,000 (6 persons)",
                recommended: true,
                note: "New Delhi dep 7:20 AM → Jalandhar Cantt arr 12:06 PM. Chair Car ₹700 / Executive Chair Car ₹1,500. Complimentary meals.",
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
        label: "Vande Bharat Express (22439)",
        duration: "4.5 hours",
        costPerPerson: "₹1,500 – ₹2,800",
        costTotal: "₹9,000 – ₹16,800 (6 persons)",
        recommended: true,
        note: "NDLS dep 06:00 → JUC arr ~10:30. Fastest train. AC Chair Car ₹1,500 / EC ₹2,800. Complimentary meals.",
    },
    {
        mode: "train",
        label: "Shatabdi Express (12013)",
        duration: "5h 10min",
        costPerPerson: "₹700 – ₹1,500",
        costTotal: "₹4,200 – ₹9,000 (6 persons)",
        note: "NDLS dep 07:40 → JUC arr 12:50. AC Chair Car ₹700 / EC ₹1,500. Meals included.",
    },
    {
        mode: "taxi",
        label: "Innova Crysta / Similar",
        duration: "6 – 8 hours (~370 km)",
        costPerPerson: "–",
        costTotal: "₹6,660",
        note: "@ ₹18/km × 370 km. Seats 6 — fits all 6 persons. NH 44 via Panipat–Karnal–Ambala.",
    },
    {
        mode: "flight",
        label: "Flight (Delhi → Amritsar + Taxi)",
        duration: "1.5h flight + 1.5h taxi",
        costPerPerson: "₹3,000 – ₹6,000",
        costTotal: "₹18,000 – ₹36,000 (6 persons) + ₹1,440 taxi",
        note: "DEL → ATQ flights: IndiGo 6E dep 06:30, 09:15 | Air India AI dep 14:40 | SpiceJet SG dep 18:50. ~1.5h flight. Then taxi ATQ → Jalandhar (~80 km, @ ₹18/km = ₹1,440).",
    },
];

export const vrindavanToChandigarhTransport: TransportOption[] = [
    {
        mode: "taxi",
        label: "Innova Crysta / Similar",
        duration: "5 – 6 hours (~300 km)",
        costPerPerson: "–",
        costTotal: "₹5,400",
        recommended: true,
        note: "@ ₹18/km × 300 km. Vrindavan → Chandigarh via Delhi bypass. Comfortable for 2 persons.",
    },
    {
        mode: "train",
        label: "Train (Mathura → Delhi → Chandigarh)",
        duration: "6 – 8 hours (with connection)",
        costPerPerson: "₹500 – ₹1,500",
        costTotal: "₹1,000 – ₹3,000 (2 persons)",
        note: "Taxi Vrindavan → Mathura Jn (~15 km). Train to Delhi, then Shatabdi 12011: NDLS dep 07:40 → CDG arr 10:55. Or evening 12045 dep 17:15 → arr 20:30.",
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
        city: "Melbourne",
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
            "~05:00 — Leave Vrindavan for Mathura Jn (~15 km)",
            "06:25 — Arr Mathura Jn (18238 Chhattisgarh Exp, 2AC/1AC)",
            "06:30 — Dep Mathura Jn",
            "— Option 1: Lalitpur Route (Recommended) —",
            "14:28 — Arr Lalitpur (PF #2), taxi ~80 km (~2h)",
            "~16:30 — Arrive Dham",
            "— Option 2: Bina Route —",
            "15:55 — Arr Bina Jn (PF #3), taxi ~115 km (~2h 45min)",
            "~18:45 — Arrive Dham",
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
            "✈️ Flight via Gwalior",
            "~06:00 — Leave Dham by taxi (~230 km)",
            "~10:30 — Arrive Gwalior Airport",
            "15:30 — Dep Gwalior (IndiGo 6E 6455, A320neo)",
            "16:35 — Arr Delhi IGI T2",
            "Night stay in Delhi",
        ],
    },
{
        city: "Delhi → Jalandhar",
        dates: "8 Apr",
        color: "#9333ea",
        timeline: [
            "🚆 Train — Swarna Shatabdi",
            "~06:30 — Leave hotel for New Delhi Rly Stn",
            "07:20 — Dep New Delhi (12029 Swarna Shatabdi, CC/EC)",
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
