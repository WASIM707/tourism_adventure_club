"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronRight, MapPin } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0  bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://gloriouspakistan.wordpress.com/wp-content/uploads/2016/08/9b296-2.jpg')",
          backgroundPositionY:'26%',
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover the Beauty of <span className="text-primary-foreground">Swat Valley</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Experience the breathtaking landscapes, rich culture, and unforgettable adventures in Pakistan's paradise on
            earth.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="#packages">
              <Button size="lg" className="gap-2 ">
                Explore Tour Packages <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#planner">
              <Button
                size="lg"
                variant="outline"
                className="text-black border-white hover:bg-white/20 hover:text-white"
              >
                Plan Your Trip
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary-foreground" />
            <span className="text-gray-200">Swat Valley, Khyber Pakhtunkhwa, Pakistan</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-1.5 h-3 bg-white rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
