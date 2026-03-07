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
        tags: [{ label: "Road Trip" }, { label: "Family Reunion" }, { label: "8 pax" }],
        color: "green",
        transport: [
            {
                mode: "taxi",
                label: "Delux Tempo Traveller",
                duration: "3 – 4 hours (~180 km)",
                costPerPerson: "–",
                costTotal: "₹4,680",
                recommended: true,
                note: "@ ₹26/km × 180 km. Seats 12 — fits all 8 pax + luggage in one vehicle.",
            },
            {
                mode: "taxi",
                label: "Innova Crysta × 2",
                duration: "3 – 4 hours (~180 km)",
                costPerPerson: "–",
                costTotal: "₹6,480",
                note: "@ ₹18/km × 180 km × 2 cars. Innova seats 6, need 2 for 8 pax.",
            },
        ],
    },
    {
        id: "day2",
        date: "1 April",
        dayLabel: "Day 2",
        title: "Vrindavan Darshan",
        location: "Vrindavan, Uttar Pradesh",
        description:
            "Full day in the holy city of Vrindavan. Visit Banke Bihari Temple, ISKCON, Prem Mandir, and explore the sacred ghats with the entire family.",
        tags: [{ label: "Temple Visits" }, { label: "Spiritual" }, { label: "Homestay" }],
        color: "green",
        transport: [
            {
                mode: "taxi",
                label: "Vrindavan Homestay (2 nights)",
                duration: "31 Mar – 2 Apr",
                costPerPerson: "–",
                costTotal: "₹3,000 – ₹6,000",
                recommended: true,
                note: "Homestay for 8+ people, 2 nights. Rates vary by location and amenities.",
            },
        ],
    },
    {
        id: "day3",
        date: "2 April",
        dayLabel: "Day 3",
        title: "Vrindavan → Sri Anandpur Dham",
        location: "Vrindavan → Ashok Nagar, MP",
        from: "Vrindavan",
        to: "Sri Anandpur Dham (Ashok Nagar, MP)",
        description:
            "Leave Vrindavan early morning around 5:00 – 6:00 AM. Long drive (~500 km, 8–10 hours). Arrive Sri Anandpur Dham by 3:00 – 4:00 PM.",
        tags: [{ label: "Travel Day" }, { label: "Road Trip" }],
        color: "gold",
        transport: [
            {
                mode: "taxi",
                label: "Delux Tempo Traveller",
                duration: "8 – 10 hours (~500 km)",
                costPerPerson: "–",
                costTotal: "₹13,000",
                recommended: true,
                note: "@ ₹26/km × 500 km. Seats 12 — fits all 8 pax comfortably in one vehicle. Best for families.",
            },
            {
                mode: "taxi",
                label: "Innova Crysta × 2",
                duration: "8 – 10 hours (~500 km)",
                costPerPerson: "–",
                costTotal: "₹18,000",
                note: "@ ₹18/km × 500 km × 2 cars. Innova seats 6, need 2 for 8 pax. Via Agra–Gwalior.",
            },
            {
                mode: "train",
                label: "Train via Gwalior / Jhansi",
                duration: "6 – 9 hours + local travel",
                costPerPerson: "₹300 – ₹1,200",
                costTotal: "₹2,400 – ₹9,600 (8 pax)",
                note: "Bhopal Shatabdi 12002: MTJ dep 08:52 → GWL arr 11:45 (3h). Karnataka Exp 12628: MTJ dep 05:48 → JHS arr 09:50 (4h). Then taxi (~80 km, ~1.5h) to Ashok Nagar.",
            },
        ],
    },
    {
        id: "day4",
        date: "3 April",
        dayLabel: "Day 4",
        title: "Arrival at Dham",
        location: "Sri Anandpur Dham, Ashok Nagar, MP",
        description:
            "Arrive and settle in at Sri Anandpur Dham. Begin participating in spiritual programmes and activities.",
        tags: [{ label: "No Accommodation Cost", free: true }],
        color: "gold",
    },
    {
        id: "day5",
        date: "4 April",
        dayLabel: "Day 5",
        title: "Dham Stay",
        location: "Sri Anandpur Dham",
        description:
            "Full day at the ashram. Attend spiritual sessions, enjoy the serene surroundings, and spend quality time with family.",
        tags: [{ label: "No Accommodation Cost", free: true }],
        color: "gold",
    },
    {
        id: "day6",
        date: "5 April",
        dayLabel: "Day 6",
        title: "Dham Stay",
        location: "Sri Anandpur Dham",
        description:
            "Continue the spiritual retreat. Engage with the community and immerse in the peaceful environment.",
        tags: [{ label: "No Accommodation Cost", free: true }],
        color: "gold",
    },
    {
        id: "day7",
        date: "6 April",
        dayLabel: "Day 7",
        title: "Final Day at Dham",
        location: "Sri Anandpur Dham",
        description:
            "Last full day at Sri Anandpur Dham. Complete the spiritual programme and prepare for the next leg of the journey.",
        tags: [{ label: "No Accommodation Cost", free: true }],
        color: "gold",
    },
    {
        id: "day8",
        date: "7 April",
        dayLabel: "Day 8",
        title: "Departure – Group Splits",
        location: "Sri Anandpur Dham → Delhi → Jalandhar / Chandigarh",
        from: "Sri Anandpur Dham",
        to: "Delhi",
        description:
            "Leave Dham early morning around 5:00 – 6:00 AM. Arrive Delhi by 3:00 – 4:00 PM. From Delhi, the group splits: Parul's parents head to Chandigarh, while Nanda's family + parents travel to Jalandhar (hometown). Take evening train/next morning departure.",
        tags: [{ label: "Travel Day" }, { label: "Group Split" }],
        color: "navy",
        transport: [
            {
                mode: "taxi",
                label: "Delux Tempo Traveller",
                duration: "8 – 10 hours (~500 km)",
                costPerPerson: "–",
                costTotal: "₹13,000",
                recommended: true,
                note: "@ ₹26/km × 500 km. Seats 12 — fits all 8 pax in one vehicle. Direct door-to-door.",
            },
            {
                mode: "taxi",
                label: "Innova Crysta × 2",
                duration: "8 – 10 hours (~500 km)",
                costPerPerson: "–",
                costTotal: "₹18,000",
                note: "@ ₹18/km × 500 km × 2 cars. Innova seats 6, need 2 for 8 pax.",
            },
            {
                mode: "flight",
                label: "Flight via Bhopal (BHO → DEL)",
                duration: "3 – 4h taxi to BHO + 1.5h flight",
                costPerPerson: "₹3,000 – ₹6,000",
                costTotal: "₹24,000 – ₹48,000 (8 pax) + ₹3,240 taxi",
                note: "Innova taxi Ashok Nagar → Bhopal (~180 km, @ ₹18/km = ₹3,240). Flights: IndiGo 6E, Air India AI, SpiceJet SG. Departures: 08:00, 10:30, 14:00, 17:30. BHO → DEL ~1.5h.",
            },
            {
                mode: "train",
                label: "Train to Delhi (via Jhansi/Gwalior)",
                duration: "7 – 10 hours",
                costPerPerson: "₹400 – ₹1,500",
                costTotal: "₹3,200 – ₹12,000 (8 pax)",
                note: "Taxi to Gwalior/Jhansi (~80 km, ~1.5h). Shatabdi 12001: GWL dep 16:50 → NDLS arr 21:00 (4h). Gatimaan 12050: GWL dep 17:50 → NDLS arr 21:00 (3h). Bhopal Exp 12156: JHS dep 00:35 → NDLS arr 06:20 (6h).",
            },
        ],
    },
    {
        id: "day9-jalandhar",
        date: "8 – 9 April",
        dayLabel: "Day 9 – 10",
        title: "Settle in Jalandhar",
        location: "Jalandhar, Punjab",
        description:
            "Arrive in Jalandhar (hometown). Rest and settle in. Catch up with family and relatives. Prepare for upcoming eye surgery.",
        tags: [{ label: "Family Time" }, { label: "Hometown" }],
        color: "purple",
    },
    {
        id: "eye-surgery",
        date: "~10 April",
        dayLabel: "Day 11",
        title: "Sunil's Eye Surgery",
        location: "Jalandhar, Punjab",
        description:
            "Eye surgery (both eyes) planned around 10th April in Jalandhar. Recovery and follow-up visits needed over 5 – 7 days. Plan other activities around this schedule.",
        tags: [{ label: "Medical" }, { label: "Both Eyes" }, { label: "5 – 7 Days Recovery" }],
        color: "purple",
        transport: [
            {
                mode: "taxi",
                label: "Eye Surgery Cost (Both Eyes)",
                duration: "~10 April + 5 – 7 days recovery",
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
        subtitle: "6 pax – Family Temple Trip",
        location: "Jalandhar → Lower Himachal Pradesh",
        from: "Jalandhar",
        to: "Himachal Pradesh",
        description:
            "Leave Jalandhar early morning around 6:00 – 7:00 AM. Jathere (ancestor worship) on 18th April. Sunil's Mom-Dad + Sunil, Parul & Kids (6 pax). Temple circuit: Chintpurni Mata Temple (~3h drive), Baba Balak Nath Ji (Deotsidh), Kamahi Devi Temple (Beh Nangal). ~350 km round trip.",
        tags: [
            { label: "6 pax" },
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
                note: "@ ₹18/km × 350 km. Jalandhar → Chintpurni (~120 km) → Deotsidh (~60 km) → Beh Nangal (~40 km) → Jalandhar. Seats 6 — fits all pax.",
            },
            {
                mode: "taxi",
                label: "Himachal Stay (1–2 nights)",
                duration: "Near Chintpurni / Deotsidh",
                costPerPerson: "–",
                costTotal: "₹4,000 – ₹8,000",
                note: "Hotels in Chintpurni ~₹4,000/night. 2 rooms for 6 pax = ₹8,000/night. 1–2 nights stay.",
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
            { label: "4 pax" },
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
                costTotal: "₹2,592",
                recommended: true,
                note: "@ ₹18/km × 144 km. Seats 6 — comfortable for 4 pax with luggage & kids.",
            },
            {
                mode: "train",
                label: "Train (Jalandhar → Chandigarh)",
                duration: "2.5 – 3.5 hours",
                costPerPerson: "₹200 – ₹600",
                costTotal: "₹800 – ₹2,400 (4 pax)",
                note: "Jan Shatabdi 12036: JUC dep 06:25 → CDG arr 09:05. Intercity 14682: JUC dep 07:15 → CDG arr 10:00. Shatabdi 12046: JUC dep 14:30 → CDG arr 16:45. CC ₹200 / EC ₹600.",
            },
        ],
    },
    {
        id: "return-delhi",
        date: "~28 – 30 April",
        dayLabel: "Day 29 – 31",
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
        dayLabel: "Day 32",
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
        costTotal: "₹9,000 – ₹16,800 (6 pax)",
        recommended: true,
        note: "NDLS dep 06:00 → JUC arr ~10:30. Fastest train. AC Chair Car ₹1,500 / EC ₹2,800. Complimentary meals.",
    },
    {
        mode: "train",
        label: "Shatabdi Express (12013)",
        duration: "5h 10min",
        costPerPerson: "₹700 – ₹1,500",
        costTotal: "₹4,200 – ₹9,000 (6 pax)",
        note: "NDLS dep 07:40 → JUC arr 12:50. AC Chair Car ₹700 / EC ₹1,500. Meals included.",
    },
    {
        mode: "taxi",
        label: "Innova Crysta / Similar",
        duration: "6 – 8 hours (~370 km)",
        costPerPerson: "–",
        costTotal: "₹6,660",
        note: "@ ₹18/km × 370 km. Seats 6 — fits all 6 pax. NH 44 via Panipat–Karnal–Ambala.",
    },
    {
        mode: "flight",
        label: "Flight (Delhi → Amritsar + Taxi)",
        duration: "1.5h flight + 1.5h taxi",
        costPerPerson: "₹3,000 – ₹6,000",
        costTotal: "₹18,000 – ₹36,000 (6 pax) + ₹1,440 taxi",
        note: "DEL → ATQ flights: IndiGo 6E dep 06:30, 09:15 | Air India AI dep 14:40 | SpiceJet SG dep 18:50. ~1.5h flight. Then taxi ATQ → Jalandhar (~80 km, @ ₹18/km = ₹1,440).",
    },
];

export const delhiToChandigarhTransport: TransportOption[] = [
    {
        mode: "train",
        label: "Shatabdi Express (12011)",
        duration: "3h 15min",
        costPerPerson: "₹500 – ₹1,200",
        costTotal: "₹1,000 – ₹2,400 (2 pax)",
        recommended: true,
        note: "NDLS dep 07:40 → CDG arr 10:55. AC Chair Car ₹500 / EC ₹1,200. Meals included. Evening option: 12045 dep 17:15 → arr 20:30.",
    },
    {
        mode: "taxi",
        label: "Innova Crysta / Similar",
        duration: "4 – 5 hours (~250 km)",
        costPerPerson: "–",
        costTotal: "₹4,500",
        note: "@ ₹18/km × 250 km. Comfortable for 2 pax with luggage. Via NH 44.",
    },
    {
        mode: "flight",
        label: "Flight (Delhi → Chandigarh)",
        duration: "1 hour flight + transfers",
        costPerPerson: "₹2,500 – ₹5,000",
        costTotal: "₹5,000 – ₹10,000 (2 pax)",
        note: "DEL → IXC flights: IndiGo/Air India dep 07:00, 09:45, 13:20, 17:30, 20:15. ~1h flight. Add ~1h for airport transfers each side.",
    },
];

export const flexiblePlans: FlexiblePlan[] = [
    {
        id: "eye-surgery",
        title: "Sunil's Eye Surgery",
        description:
            "Eye surgery (both eyes) planned around 10th April in Jalandhar. Recovery and follow-up visits needed. Plan other activities around this schedule.",
        duration: "Around 10 Apr, 5 – 7 Days",
        icon: "👁️",
        location: "Jalandhar, Punjab",
        group: "Sunil",
        transport: [
            {
                mode: "taxi",
                label: "Eye Surgery Cost (Both Eyes)",
                duration: "~10 April + 5 – 7 days recovery",
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
            "Leave Jalandhar early morning around 6:00 – 7:00 AM. Jathere (ancestor worship) on 18th April. Sunil's Mom-Dad + Sunil, Parul & Kids (6 pax). Temple circuit: Chintpurni Mata Temple (~3h drive), Baba Balak Nath Ji (Deotsidh), Kamahi Devi Temple (Beh Nangal). ~350 km round trip.",
        duration: "~17 – 19 April (2 – 3 Days)",
        icon: "🛕",
        location: "Lower Himachal Pradesh",
        group: "Sunil's Mom-Dad + Sunil + Parul + Devanshi + Ryaan (6 pax)",
        transport: [
            {
                mode: "taxi",
                label: "Innova Crysta with Driver (Full Circuit)",
                duration: "2 – 3 days round trip",
                costPerPerson: "–",
                costTotal: "₹6,300",
                recommended: true,
                note: "@ ₹18/km × 350 km. Jalandhar → Chintpurni (~120 km) → Deotsidh (~60 km) → Beh Nangal (~40 km) → Jalandhar. Seats 6 — fits all pax.",
            },
            {
                mode: "taxi",
                label: "Himachal Stay (1–2 nights)",
                duration: "Near Chintpurni / Deotsidh",
                costPerPerson: "–",
                costTotal: "₹4,000 – ₹8,000",
                note: "Hotels in Chintpurni ~₹4,000/night. 2 rooms for 6 pax = ₹8,000/night. 1–2 nights stay.",
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
        group: "Sunil + Parul + Devanshi + Ryaan (4 pax)",
        transport: [
            {
                mode: "taxi",
                label: "Innova Crysta / Similar",
                duration: "2.5 – 3 hours (~144 km)",
                costPerPerson: "–",
                costTotal: "₹2,592",
                recommended: true,
                note: "@ ₹18/km × 144 km. Seats 6 — comfortable for 4 pax with luggage & kids.",
            },
            {
                mode: "train",
                label: "Train (Jalandhar → Chandigarh)",
                duration: "2.5 – 3.5 hours",
                costPerPerson: "₹200 – ₹600",
                costTotal: "₹800 – ₹2,400 (4 pax)",
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
    { city: "Melbourne", dates: "31 Mar", color: "#6366f1" },
    { city: "Delhi", dates: "31 Mar", color: "#FF6F00" },
    { city: "Vrindavan", dates: "31 Mar – 2 Apr", color: "#046A38" },
    { city: "Sri Anandpur Dham", dates: "2 – 7 Apr", color: "#D4A843" },
    { city: "Delhi", dates: "7 Apr", color: "#000080" },
    { city: "Jalandhar", dates: "7 – 28 Apr", color: "#9333ea" },
    { city: "Himachal Pradesh", dates: "~17 – 19 Apr", color: "#059669" },
    { city: "Chandigarh", dates: "~20 – 26 Apr", color: "#ec4899" },
    { city: "Delhi → Melbourne", dates: "1 May", color: "#FF6F00" },
];
