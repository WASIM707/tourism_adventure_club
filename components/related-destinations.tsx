"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface RelatedDestinationsProps {
  currentDestination: string
}

export default function RelatedDestinations({ currentDestination }: RelatedDestinationsProps) {
  // This would typically come from a database or API
  const allDestinations = [
    {
      id: "kalam",
      name: "Kalam",
      description: "A scenic valley with lush forests, meadows, and waterfalls.",
      image: "/placeholder.svg?height=400&width=600&text=Kalam",
      location: "Upper Swat Valley",
    },
    {
      id: "mahodand-lake",
      name: "Mahodand Lake",
      description: "A beautiful alpine lake surrounded by snow-capped mountains.",
      image: "/placeholder.svg?height=400&width=600&text=Mahodand+Lake",
      location: "Ushu Valley, Swat",
    },
    {
      id: "malam-jabba",
      name: "Malam Jabba",
      description: "Pakistan's premier ski resort with stunning mountain views.",
      image: "/placeholder.svg?height=400&width=600&text=Malam+Jabba",
      location: "Swat Valley",
    },
    {
      id: "swat-museum",
      name: "Swat Museum",
      description: "Home to Gandhara art and artifacts from the region's rich history.",
      image: "/placeholder.svg?height=400&width=600&text=Swat+Museum",
      location: "Saidu Sharif, Swat",
    },
    {
      id: "mingora",
      name: "Mingora",
      description: "The commercial hub of Swat with vibrant markets and culture.",
      image: "/placeholder.svg?height=400&width=600&text=Mingora",
      location: "Central Swat",
    },
    {
      id: "bahrain",
      name: "Bahrain",
      description: "A charming town known for its riverside restaurants and natural beauty.",
      image: "/placeholder.svg?height=400&width=600&text=Bahrain",
      location: "Swat Valley",
    },
  ]

  // Filter out the current destination and get 3 random destinations
  const relatedDestinations = allDestinations
    .filter((dest) => dest.id !== currentDestination)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {relatedDestinations.map((destination, index) => (
        <motion.div
          key={destination.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/destinations/${destination.id}`}>
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{destination.name}</h3>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{destination.location}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{destination.description}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
