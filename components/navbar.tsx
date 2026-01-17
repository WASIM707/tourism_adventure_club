"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, MapPin, Phone } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Destinations", href: "#destinations" },
    { name: "Tour Packages", href: "#packages" },
    { name: "Plan Trip", href: "#planner" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <div className="bg-primary text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Swat Valley, Pakistan</span>
            </div>
            <div className="hidden md:flex items-center text-sm">
              <Phone className="h-4 w-4 mr-1" />
              <span>+92 3497230208</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-sm hover:underline">
              FAQ
            </Link>
            <Link href="#contact" className="text-sm hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "bg-white dark:bg-gray-900 shadow-md py-2" : "bg-transparent py-4",
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Swat</span>
            <span className="text-2xl font-bold ml-1">Tourism</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground",
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button>Book Now</Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-16 px-4 md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium py-2 border-b border-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="mt-4 w-full">Book Now</Button>
          </nav>
        </div>
      )}
    </>
  )
}
