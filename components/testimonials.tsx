"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United Kingdom",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Our trip to Swat Valley was absolutely magical! The tour guides were knowledgeable and friendly, and the itinerary was perfectly balanced. We'll definitely be back!",
    },
    {
      name: "Ahmed Khan",
      location: "Pakistan",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "As a local Pakistani, I wanted to explore more of my country's beauty. The Swat tour exceeded all expectations. The team took care of everything, making it a stress-free experience.",
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      text: "The natural beauty of Swat Valley is unparalleled. Our guide was excellent and showed us hidden gems we would never have found on our own. Highly recommended!",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Read testimonials from travelers who have experienced the beauty of Swat Valley with our guided tours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
