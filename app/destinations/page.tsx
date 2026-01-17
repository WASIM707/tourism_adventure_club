import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Destinations from "@/components/destinations"
import { MapPin } from "lucide-react"

export const metadata = {
  title: "Destinations in Swat Valley - Swat Tourism",
  description:
    "Explore the most breathtaking locations in Swat Valley, from serene lakes and majestic mountains to historic sites and cultural landmarks.",
}

export default function DestinationsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-10 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Destinations in Swat Valley</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the diverse beauty of Swat Valley through our curated selection of must-visit destinations
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Khyber Pakhtunkhwa, Pakistan</span>
          </div>
        </div>
      </div>
      <Destinations />
      <Footer />
    </div>
  )
}
