import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoupleStory from "@/components/CoupleStory";
import WeddingDetails from "@/components/WeddingDetails";
import EventTimeline from "@/components/EventTimeline";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <Hero />
      <CoupleStory />
      <WeddingDetails />
      <EventTimeline />
      <Venue />
      <Gallery />
      <Countdown />
      <RSVP />
      <Footer />
    </main>
  );
}
