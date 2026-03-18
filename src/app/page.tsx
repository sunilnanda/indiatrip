import Navbar from "./components/Navbar";
import FlightCards from "./components/FlightCards";
import Overview from "./components/Overview";
import Timeline from "./components/Timeline";
import PrintSummary from "./components/PrintSummary";
import TotalCost from "./components/TotalCost";
import Footer from "./components/Footer";
import { CurrencyProvider } from "./components/CurrencyContext";
import { TransportSelectionProvider } from "./components/TransportSelectionContext";
import Documents from "./components/Documents";
import BookingChecklist from "./components/BookingChecklist";
import Notes from "./components/Notes";
import StickyTotalBar from "./components/StickyTotalBar";

export default function Home() {
    return (
        <CurrencyProvider>
            <TransportSelectionProvider>
                <main>
                    <Navbar />
                    <FlightCards />
                    <Overview />
                    <Timeline />
                    <Documents />
                    <BookingChecklist />
                    <Notes />
                    <PrintSummary />
                    <TotalCost />
                    <Footer />
                    <StickyTotalBar />
                </main>
            </TransportSelectionProvider>
        </CurrencyProvider>
    );
}
