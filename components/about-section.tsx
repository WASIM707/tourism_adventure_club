"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Users, Clock, ThumbsUp } from "lucide-react"

export default function AboutSection() {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Expert Guides",
      description: "Our certified local guides have in-depth knowledge of Swat's history and culture.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Small Groups",
      description: "We keep our tour groups small for a more personalized experience.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Flexible Scheduling",
      description: "Customize your itinerary to match your preferences and available time.",
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-primary" />,
      title: "Customer Satisfaction",
      description: "We pride ourselves on our 98% customer satisfaction rate.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Swat Tourism</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We are dedicated to providing unforgettable experiences in the beautiful Swat Valley. With over 10 years of
            experience, we offer the best guided tours, accommodations, and travel services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image src="https://koala.sh/api/image/v2-m4zxl-vrqbc.jpg?width=1216&height=832&dream" alt="Swat Valley" fill className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Your Gateway to Swat's Natural Beauty</h3>
            <p className="mb-6 text-muted-foreground">
              Founded in 2013, Swat Tourism has been the leading tour operator in the region, helping thousands of
              travelers discover the magic of Swat Valley. Our mission is to promote sustainable tourism while
              preserving the natural beauty and cultural heritage of the area.
            </p>
            <p className="mb-8 text-muted-foreground">
              We offer a wide range of services including guided tours, custom itineraries, accommodation bookings,
              transportation, and authentic cultural experiences. Our team of local experts ensures that every journey
              is safe, enjoyable, and memorable.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-medium mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
