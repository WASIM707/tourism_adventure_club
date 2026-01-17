import Gallery from "@/components/gallery"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: "Photo Gallery - Swat Tourism",
  description: "Explore the breathtaking beauty of Swat Valley through our collection of stunning photographs.",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-10 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Swat Valley Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Immerse yourself in the visual splendor of Swat Valley through our extensive collection of photographs
          </p>
        </div>
      </div>
      <Gallery />
      <Footer />
    </div>
  )
}
