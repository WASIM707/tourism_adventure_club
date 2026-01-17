"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { MapPin } from "lucide-react"
import Link from "next/link"

export default function Destinations() {
  const destinations = [
    {
      id: "kalam",
      name: "Kalam",
      description: "A scenic valley with lush forests, meadows, and waterfalls.",
      image: "https://clickpakistan.org/wp-content/uploads/2020/02/feature-image-min-768x768.jpg",
      location: "Upper Swat Valley",
    },
    {
      id: "mahodand-lake",
      name: "Mahodand Lake",
      description: "A beautiful alpine lake surrounded by snow-capped mountains.",
      image: "https://www.app.com.pk/wp-content/uploads/2024/07/Mahodand-Lake.webp",
      location: "Ushu Valley, Swat",
    },
    {
      id: "malam-jabba",
      name: "Malam Jabba",
      description: "Pakistan's premier ski resort with stunning mountain views.",
      image: "https://media.licdn.com/dms/image/v2/C4D1BAQHI966JF-JqOQ/company-background_10000/company-background_10000/0/1636108593629/pearl_continental_hotel_malam_jabba_cover?e=2147483647&v=beta&t=fvzaZtdSwgMvwTTwUx6O9Fe5YaD8COQSkr6KhXY-Cjs",
      location: "Swat Valley",
    },
    {
      id: "swat-museum",
      name: "Swat Museum",
      description: "Home to Gandhara art and artifacts from the region's rich history.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCcuHJHP_Yms7CdOW1MaTEF-C3vFq77l75tQ&s",
      location: "Saidu Sharif, Swat",
    },
    {
      id: "mangora",
      name: "Mangora",
      description: "The commercial hub of Swat with vibrant markets and culture.",
      image: "https://i.pinimg.com/564x/e1/cd/a3/e1cda353bcdb2d43f2e528a679a5ddb3.jpg",
      location: "Swat Valley",
    },
    
    {
      id: "bahrain",
      name: "Bahrain",
      description: "A charming town known for its riverside restaurants and natural beauty.",
      image: "https://swatvalley.pk/wp-content/uploads/2019/07/65949708_2336383799776782_1686691514643644416_o.jpg",
      location: "Swat Valley",
    },

  ]

  return (
    <section id="destinations" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations in Swat</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the most breathtaking locations in Swat Valley, from serene lakes and majestic mountains to historic
            sites and cultural landmarks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/destinations/${destination.id}`}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{destination.location}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">{destination.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
