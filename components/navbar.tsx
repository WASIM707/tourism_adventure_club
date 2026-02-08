"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, MapPin, Phone, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll detection for sticky styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Destinations", href: "#destinations" },
    { name: "Tour Packages", href: "#packages" },
    { name: "Plan Trip", href: "#planner" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      {/* Top Bar - Premium subtle look, hidden on mobile for cleaner UX */}
      <div className="hidden lg:block bg-primary text-primary-foreground py-2.5 px-4 text-xs font-medium tracking-wide">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span>Swat Valley, Pakistan</span>
            </div>
            <div className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              <span>+92 3497230208</span>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="opacity-90 hover:opacity-100 hover:underline transition-all">
              FAQ
            </Link>
            <Link href="#contact" className="opacity-90 hover:opacity-100 hover:underline transition-all">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b border-transparent",
          isScrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-gray-200 dark:border-gray-800 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group relative z-50">
            <div className="bg-primary text-white p-1.5 rounded-lg mr-2 group-hover:scale-105 transition-transform duration-300 shadow-sm">
               <MapPin className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-foreground tracking-tight">
                Swat<span className="text-primary">Tourism</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered & Modern Pill Style */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 group hover:bg-primary/10 hover:text-primary",
                  pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button
              asChild
              className="hidden sm:flex shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 rounded-full px-6"
            >
              <Link href="/#packages" aria-label="Book Now">Book Now</Link>
            </Button>
            
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative z-50 p-2 text-foreground hover:bg-accent rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen with Staggered Animation */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-md lg:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className={cn(
            "flex flex-col h-full justify-center px-8 transition-all duration-500 ease-out",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
            <nav className="flex flex-col space-y-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center justify-between text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span>{link.name}</span>
                <ChevronRight className="h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
              </Link>
            ))}
            </nav>
            
            {/* Mobile Menu Footer Info */}
            <div className="mt-10 pt-10 border-t border-border">
                <Button asChild size="lg" className="w-full text-lg py-6 rounded-xl shadow-xl shadow-primary/20">
                  <Link href="/#packages" aria-label="Book Your Trip">Book Your Trip</Link>
                </Button>
                <div className="mt-8 flex flex-col space-y-4 text-muted-foreground">
                    <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5" />
                        <span>+92 3497230208</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5" />
                        <span>Swat Valley, Pakistan</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
