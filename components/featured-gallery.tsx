"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function FeaturedGallery() {
  // Featured images from Swat Valley
  const featuredImages = [
    {
      src: "https://www.ajktours.com/wp-content/uploads/2023/12/swat-mingora.jpeg",
      alt: "Swat Valley Panoramic View",
      category: "Landscapes",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRr4k10tXoQtD7OeYdQSmzQTM1uOSg0KWVhQ&s",
      alt: "Mahodand Lake with Mountain Reflections",
      category: "Lakes",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa_XDzXZM5zKrERsZ5Ft4EqszLTwuAyW5FxKVu6wQwLYr1M-iwz-o4tL71dO6pf9_gGlg&usqp=CAU",
      alt: "Snow-covered Malam Jabba Ski Resort",
      category: "Mountains",
    },
    {
      src: "https://i.tribune.com.pk/media/images/746096-SwatTouristGala-1407516875/746096-SwatTouristGala-1407516875.JPG",
      alt: "Swat Cultural Festival Celebration",
      category: "Culture",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Images of Swat</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse of the natural beauty and cultural richness that awaits you in Swat Valley
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-medium">{image.alt}</h3>
                <p className="text-sm text-gray-200">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery">
            <Button className="gap-2">
              View Full Gallery <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
