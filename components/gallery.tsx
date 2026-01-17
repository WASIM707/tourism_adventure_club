"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const [currentImageAlt, setCurrentImageAlt] = useState("")

  const openLightbox = (imageSrc: string, imageAlt: string) => {
    setCurrentImage(imageSrc)
    setCurrentImageAlt(imageAlt)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const categories = ["All", "Landscapes", "Lakes", "Mountains", "Culture"]

  // These would be replaced with actual Swat Valley images in a real implementation
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1596464148416-e0916276a9f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Swat Valley Panoramic View",
      category: "Landscapes",
      description: "Breathtaking panoramic view of the lush green Swat Valley surrounded by majestic mountains.",
    },
    {
      src: "https://images.unsplash.com/photo-1624087315243-8fbb9f90e5bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Mahodand Lake with Mountain Reflections",
      category: "Lakes",
      description: "Crystal clear waters of Mahodand Lake reflecting the surrounding snow-capped peaks at sunset.",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyMxC56nDn9tG_THrOGzyDFaq7_wUJoexO2Q&s",
      alt: "Snow-covered Malam Jabba Ski Resort",
      category: "Mountains",
      description: "Pakistan's premier ski resort covered in fresh snow with skiers enjoying the slopes.",
    },
    {
      src: "https://www.pakistantravelguide.pk/wp-content/uploads/2016/03/shundur-polo-festival.png",
      alt: "Swat Cultural Festival Celebration",
      category: "Culture",
      description: "Colorful cultural festival showcasing traditional Swati dances, music, and attire.",
    },
    {
      src: "https://prestinetravels.com/wp-content/uploads/2021/04/water-rafting.jpg",
      alt: "Swat River Rapids",
      category: "Landscapes",
      description: "The mighty Swat River carving its way through rocky terrain with white water rapids.",
    },
    {
      src: "https://www.mizlink-pakistan.com/images/swati-embroidery-16.jpg",
      alt: "Traditional Swati Embroidery",
      category: "Culture",
      description: "Intricate handcrafted embroidery showcasing the rich artistic heritage of Swat Valley women.",
    },
    {
      src: "https://www.preventionweb.net/sites/default/files/styles/landscape_16_9/public/2023-03/Shutterstock_176969939%20%281%29-min.jpg?h=2cf907fb&itok=l5qLGBMy",
      alt: "Sunrise over Hindu Kush Mountains",
      category: "Mountains",
      description: "Golden sunrise illuminating the majestic peaks of the Hindu Kush mountain range.",
    },
    {
      src: "https://images.unsplash.com/photo-1579196900052-a6034632c042?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3dhdCUyMHZhbGxleXxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Kandol Lake at Twilight",
      category: "Lakes",
      description: "The serene Kandol Lake surrounded by alpine forests and meadows as dusk falls.",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1697729729075-3e56242aef49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHN3YXQlMjB2YWxsZXl8ZW58MHx8MHx8fDA%3D",
      alt: "Aerial View of Kalam Valley",
      category: "Landscapes",
      description:
        "Drone shot of the picturesque Kalam Valley with its forests, meadows, and traditional wooden houses.",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1698098206457-edeff536c019?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHN3YXQlMjB2YWxsZXl8ZW58MHx8MHx8fDA%3D",
      alt: "Sunrays through Ushu Forest",
      category: "Landscapes",
      description: "Magical sunrays filtering through the dense pine forests of Ushu creating a mystical atmosphere.",
    },
    {
      src: "https://www.youlinmagazine.com/articles/1723.jpg",
      alt: "Panoramic View of Spin Khwar Lake",
      category: "Lakes",
      description:
        "The pristine Spin Khwar Lake nestled among mountains at high altitude with wildflowers in foreground.",
    },
    {
      src: "https://cdn.britannica.com/29/10129-050-3C2E1F08/dreaming-Maha-Maya-relief-white-elephant-Gandhara.jpg",
      alt: "Ancient Gandhara Buddha Statue",
      category: "Culture",
      description: "Well-preserved Buddha statue from the Gandhara period displayed at the Swat Museum.",
    },
    {
      src: "https://images.unsplash.com/photo-1660600330414-e57837a444a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VGVycmFjZWQlMjBGaWVsZHMlMjBpbiUyMFN3YXQlMjBWYWxsZXl8ZW58MHx8MHx8fDA%3D",
      alt: "Terraced Fields in Swat Valley",
      category: "Landscapes",
      description: "Beautiful terraced agricultural fields on the hillsides of Swat Valley in spring.",
    },
    {
      src: "https://naturehikepakistan.pk/wp-content/uploads/elementor/thumbs/mahudanf-huh-min-qkrlgtnsil1c4bvuaxc4n01nqycg02e4iy6o9bpp5g.jpg",
      alt: "Utror Valley Panorama",
      category: "Landscapes",
      description: "Expansive view of the lush green Utror Valley with traditional villages and grazing livestock.",
    },
    {
      src: "https://images.unsplash.com/photo-1649775827088-6e316d0613bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Traditional Fishing in Swat River",
      category: "Culture",
      description: "Local fishermen using traditional methods to catch trout in the clear waters of Swat River.",
    },
    {
      src: "https://res.cloudinary.com/www-travelpakistani-com/image/upload/v1684491699/Boyun_Village_swat.jpg",
      alt: "Aerial View of Boyun Village",
      category: "Landscapes",
      description: "The 'Green Top' village of Boyun perched on a hilltop offering spectacular views of Swat Valley.",
    },
    {
      src: "https://swatvalley.pk/wp-content/uploads/2017/10/20663984_1691142517599205_8622232726529725282_n.jpg",
      alt: "Gabral River Valley",
      category: "Landscapes",
      description: "The pristine Gabral River flowing through a valley with dense pine forests and meadows.",
    },
    {
      src: "https://i.dawn.com/primary/2016/03/56fd2d9fd91a6.jpg",
      alt: "Swat Valley in Autumn Colors",
      category: "Landscapes",
      description: "Spectacular autumn colors painting the forests of Swat Valley in shades of gold and crimson.",
    },
    {
      src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/1a/2a/cd/photo0jpg.jpg?w=1200&h=-1&s=1",
      alt: "Miandam Hot Springs",
      category: "Landscapes",
      description: "Natural hot springs in Miandam known for their therapeutic properties and beautiful surroundings.",
    },
    {
      src: "https://i.pinimg.com/736x/c5/89/a3/c589a38732e767a1e040aa31396223e8.jpg",
      alt: "White Palace of Marghazar",
      category: "Culture",
      description: "The historic White Palace (Sufed Mahal) in Marghazar, former summer residence of the Wali of Swat.",
    },
    {
      src: "https://swatvalley.pk/wp-content/uploads/2017/10/19756384_1649108895135901_7236661803476088250_n.jpg",
      alt: "Aerial View of Saidu Sharif",
      category: "Landscapes",
      description: "Bird's eye view of Saidu Sharif, the administrative center of Swat, surrounded by mountains.",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1666273190872-1ad5f89e39f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fFdpbGRmbG93ZXIlMjBNZWFkb3dzJTIwaW4lMjBTd2F0fGVufDB8fDB8fHww",
      alt: "Wildflower Meadows in Swat",
      category: "Landscapes",
      description: "Colorful wildflower meadows in full bloom during spring in the upper reaches of Swat Valley.",
    },
    {
      src: "https://media.istockphoto.com/id/124393219/photo/half-timbered-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=dk1kn5mcfPjQO4mM0eRlSCBtBg8t4y22NmTE2IlcLQ4=",
      alt: "Traditional Swati Wooden House",
      category: "Culture",
      description: "Intricately carved wooden house showcasing the traditional architectural style of Swat Valley.",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7LlMAzFP_b12f1qOxb-gBRR-aOod8jIxgAw&s",
      alt: "Panoramic View of Kundol Lake",
      category: "Lakes",
      description: "The stunning Kundol Lake surrounded by snow-capped peaks and alpine meadows in summer.",
    },
  ]

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Swat Valley Photo Gallery</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the breathtaking beauty of Swat Valley through our collection of stunning photographs capturing its
            landscapes, lakes, mountains, and rich cultural heritage.
          </p>
        </motion.div>

        <Tabs defaultValue="All" className="max-w-6xl mx-auto">
          <TabsList className="flex justify-center mb-8 flex-wrap">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages
                  .filter((img) => category === "All" || img.category === category)
                  .map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <div
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => openLightbox(image.src, image.alt)}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h3 className="font-medium text-sm">{image.alt}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
              <Image src={currentImage || "/placeholder.svg"} alt={currentImageAlt} fill className="object-contain" />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-sm">{currentImageAlt}</p>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            These images showcase the diverse beauty of Swat Valley, from its pristine lakes and majestic mountains to
            its rich cultural heritage. Visit us to experience this paradise in person!
          </p>
        </div>
      </div>
    </section>
  )
}
