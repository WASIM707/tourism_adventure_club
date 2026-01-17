"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star } from "lucide-react"
import Image from "next/image"

export default function TourPackages() {
  const packages = [
    {
      title: "Swat Valley Explorer",
      duration: "5 Days / 4 Nights",
      price: "$599",
      rating: 4.9,
      reviewCount: 124,
      image: "https://saiftravelsandtours.com/wp-content/uploads/2020/02/Swat-Valley.jpg",
      description:
        "Comprehensive tour covering all major attractions in Swat Valley including Kalam, Mahodand Lake, and Malam Jabba.",
      highlights: ["Guided tours", "Luxury accommodation", "Transportation", "Meals included"],
      featured: true,
    },
    {
      title: "Weekend Getaway",
      duration: "3 Days / 2 Nights",
      price: "$349",
      rating: 4.7,
      reviewCount: 86,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFxOJO1aKPLNmYioNCioh92LDWyTeZdUQhZFyI3sKA8-4T7ppmYzjbvp8AAH7Qe2Q4Kp0&usqp=CAU",
      description: "Perfect short trip to experience the highlights of Swat Valley over a weekend.",
      highlights: ["Key attractions", "Standard accommodation", "Transportation", "Breakfast included"],
      featured: false,
    },
    {
      title: "Adventure Trek",
      duration: "7 Days / 6 Nights",
      price: "$899",
      rating: 4.8,
      reviewCount: 92,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdsAO5-oLRijZy7xTd73QTKKl81z9zEeWKg&s",
      description: "Challenging trek through the mountains and valleys of Swat for adventure enthusiasts.",
      highlights: ["Professional guides", "Camping equipment", "Meals", "Safety gear"],
      featured: false,
    },
  ]

  return (
    <section id="packages" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tour Packages</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose from our carefully crafted tour packages designed to give you the best experience of Swat Valley.
            Each package includes expert guides, comfortable accommodations, and unforgettable experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  {pkg.featured && <Badge className="absolute top-4 right-4 bg-primary text-white">Popular</Badge>}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{pkg.title}</CardTitle>
                    <div className="text-xl font-bold text-primary">{pkg.price}</div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>
                        {pkg.rating} ({pkg.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <ul className="space-y-2">
                    {pkg.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  
                <Button  className="w-full">Book Now</Button>
              </CardFooter>
            </Card>
            </motion.div>
          ))}
      </div>

      <div className="text-center mt-12">
        <link href="#contact.tsx" />
        <Button variant="outline" size="lg">
          View All Packages
        </Button>
       
      </div>
    </div>
    </section >
  )
}
