import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import Destinations from "@/components/destinations"
import TourPackages from "@/components/tour-packages"
import TripPlanner from "@/components/trip-planner"
import WeatherSection from "@/components/weather-section"
import FeaturedGallery from "@/components/featured-gallery"
import Testimonials from "@/components/testimonials"
import ContactSection from "@/components/contact-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <Destinations />
        <TourPackages />
        <TripPlanner />
        <WeatherSection />
        <FeaturedGallery />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
