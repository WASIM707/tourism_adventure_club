"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface GalleryImage {
  src: string
  alt: string
}

interface DestinationGalleryProps {
  images: GalleryImage[]
}

export default function DestinationGallery({ images }: DestinationGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") closeLightbox()
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-12 w-12"
            onClick={prevImage}
          >
            <span className="text-3xl">&lsaquo;</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-12 w-12"
            onClick={nextImage}
          >
            <span className="text-3xl">&rsaquo;</span>
          </Button>

          <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
            <Image
              src={images[currentImageIndex].src || "/placeholder.svg"}
              alt={images[currentImageIndex].alt}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            <p className="text-sm">{images[currentImageIndex].alt}</p>
            <p className="text-xs text-white/70 mt-1">
              {currentImageIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
