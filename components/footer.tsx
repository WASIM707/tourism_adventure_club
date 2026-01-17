import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Swat Tourism</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for exploring the breathtaking beauty of Swat Valley. We provide comprehensive tour
              packages, custom itineraries, and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-primary/20">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Twitter">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-primary/20">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Instagram">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-primary/20">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="YouTube">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-primary/20">
                  <Youtube className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#destinations" className="text-gray-400 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="#packages" className="text-gray-400 hover:text-white transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-gray-400 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Tour Packages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Swat Valley Explorer
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Weekend Getaway
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Adventure Trek
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Cultural Experience
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Family Packages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates, travel tips, and special offers.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email address" className="bg-gray-800 border-gray-700 text-white" />
              <Button size="icon" aria-label="Subscribe">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Swat Tourism. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
