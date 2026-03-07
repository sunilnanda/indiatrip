# India Trip Planner

A family trip planning website for a 31-day journey from Melbourne to North India (March–May 2026). Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Trip Overview

- **Dates:** 31 March – 1 May 2026
- **Travelers:** 8 (4 from Melbourne + 4 parents joining in Delhi)
- **Route:** Melbourne → Delhi → Vrindavan → Sri Anandpur Dham → Delhi → Jalandhar → Himachal Pradesh → Chandigarh → Delhi → Melbourne

## Features

- Interactive itinerary timeline with day-by-day breakdown
- Transport options with selectable modes (train, taxi, flight) and live cost calculation
- Currency toggle (INR / AUD) with live conversion
- Per-km taxi pricing (Tempo Traveller @ Rs.26/km, Innova Crysta @ Rs.18/km)
- Sticky total cost bar with grand total
- Responsive design (mobile + desktop)
- Print-friendly summary view
- Traveler cards with family grouping

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the trip planner.

## Project Structure

```
src/app/
  data.ts                  # All trip data (itinerary, flights, transport, costs)
  page.tsx                 # Main page layout
  components/
    Hero.tsx               # Landing hero section
    Navbar.tsx             # Sticky navigation bar
    FlightCards.tsx         # Melbourne-Delhi flight details
    Overview.tsx           # Trip stats and route map
    Travelers.tsx          # Traveler cards
    Timeline.tsx           # Day-by-day itinerary with transport selection
    FlexiblePlans.tsx      # Confirmed plans (eye surgery, Himachal, Chandigarh)
    TotalCost.tsx          # Categorized cost breakdown
    StickyTotalBar.tsx     # Floating total cost pill
    PrintSummary.tsx       # Print-optimized summary
    CurrencyContext.tsx    # INR/AUD currency provider
    CurrencyToggle.tsx     # Currency switch button
    TransportSelectionContext.tsx  # Transport option state management
    Footer.tsx             # Page footer
```

## Build

```bash
npm run build
```
