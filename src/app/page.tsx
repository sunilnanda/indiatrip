import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Navbar from "./components/Navbar";
import FlightCards from "./components/FlightCards";
import Overview from "./components/Overview";
import Travelers from "./components/Travelers";
import Timeline from "./components/Timeline";
import FlexiblePlans from "./components/FlexiblePlans";
import PrintSummary from "./components/PrintSummary";
import TotalCost from "./components/TotalCost";
import Footer from "./components/Footer";
import { CurrencyProvider } from "./components/CurrencyContext";
import { TransportSelectionProvider } from "./components/TransportSelectionContext";
import CurrencyToggle from "./components/CurrencyToggle";
import StickyTotalBar from "./components/StickyTotalBar";

export default function Home() {
  return (
    <CurrencyProvider>
      <TransportSelectionProvider>
      <main>
        <Hero />
        <Countdown />
        <Navbar />
        <FlightCards />
        <Overview />
        <Travelers />
        <Timeline />
        <FlexiblePlans />
        <PrintSummary />
        <TotalCost />
        <Footer />
        <CurrencyToggle />
        <StickyTotalBar />
      </main>
      </TransportSelectionProvider>
    </CurrencyProvider>
  );
}
