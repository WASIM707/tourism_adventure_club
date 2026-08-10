"use client"

import { useState, useMemo, type ChangeEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  Users,
  MapPin,
  Clock,
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Star,
  DollarSign,
  Car,
  Hotel,
  Compass,
  ShieldCheck,
  Sun,
  CloudSun,
  Heart,
  Camera,
  Mountain,
  Flame,
  Palmtree,
  GraduationCap,
  CheckCircle2,
  Info,
  Phone,
  Mail,
  Globe,
  User,
  BedDouble,
  Activity,
  Map as MapIcon,
  Landmark,
  BookOpen,
  Loader2
} from "lucide-react"

// --- DATA MODELS & CONSTANTS ---

interface TripTypeData {
  id: string
  label: string
  icon: any
  description: string
  activities: string[]
}

const TRIP_TYPES: TripTypeData[] = [
  {
    id: "relaxation",
    label: "Relaxation",
    icon: Palmtree,
    description: "Unwind amidst tranquil mountain views, riversides, and peaceful spas.",
    activities: [
      "Mountain Meditation",
      "Forest Walk",
      "Riverside Relaxation",
      "Spa",
      "Nature Therapy",
      "Yoga",
      "Tea Garden",
      "Sunrise Point",
      "Sunset Point"
    ]
  },
  {
    id: "hiking",
    label: "Hiking",
    icon: Mountain,
    description: "Conquer alpine trails, serene mountain passes, and scenic ridges.",
    activities: [
      "Beginner",
      "Medium",
      "Expert",
      "Camping",
      "Bonfire",
      "Guide",
      "Mountain Climbing",
      "River Trek"
    ]
  },
  {
    id: "adventure",
    label: "Adventure",
    icon: Compass,
    description: "High-octane thrill seeking across wild mountain terrains and rivers.",
    activities: [
      "Zipline",
      "ATV",
      "Jeep Safari",
      "Horse Riding",
      "Rock Climbing",
      "River Rafting"
    ]
  },
  {
    id: "camping",
    label: "Camping",
    icon: Flame,
    description: "Overnight wilderness stays under starry mountain skies.",
    activities: [
      "Stargazing",
      "Campfire Music",
      "Outdoor BBQ",
      "Wilderness Survival",
      "Riverbank Camping"
    ]
  },
  {
    id: "honeymoon",
    label: "Honeymoon",
    icon: Heart,
    description: "Romantic retreats in cozy luxury resorts with breathtaking views.",
    activities: [
      "Candlelight Dinner",
      "Private Cottage Stay",
      "Sunset Point Picnic",
      "Scenic Helicopter Tour",
      "Couples Spa Session"
    ]
  },
  {
    id: "family",
    label: "Family",
    icon: Users,
    description: "Fun-filled, safe, and comfortable itineraries suitable for all ages.",
    activities: [
      "Cable Car Ride",
      "Cultural Show",
      "Sightseeing Bus",
      "Kids Adventure Park",
      "Fizagat Water Park"
    ]
  },
  {
    id: "photography",
    label: "Photography",
    icon: Camera,
    description: "Capture golden hours, milky way skies, and dramatic landscape vistas.",
    activities: [
      "Landscape Photography Tour",
      "Drone Videography Spot",
      "Astrophotography Session",
      "Wildlife Spotting",
      "Local Portrait Walk"
    ]
  },
  {
    id: "snow",
    label: "Snow & Winter",
    icon: CloudSun,
    description: "Experience snowcapped peaks, skiing, and cozy fireplace nights.",
    activities: [
      "Skiing",
      "Snowboarding",
      "Snowshoeing",
      "Ice Skating",
      "Snow Mobile Ride",
      "Fireplace Lounge"
    ]
  },
  {
    id: "cultural",
    label: "Cultural",
    icon: Landmark,
    description: "Immerse in ancient Gandhara heritage, local traditions, and crafts.",
    activities: [
      "Local Handicraft Workshop",
      "Traditional Folk Music",
      "Heritage Museum Tour",
      "Local Cuisine Tasting",
      "Bazaar Walk"
    ]
  },
  {
    id: "historical",
    label: "Historical",
    icon: BookOpen,
    description: "Explore millennium-old stupas, Buddhist ruins, and royal palaces.",
    activities: [
      "Buddhist Monastery Ruins Tour",
      "Ancient Rock Carvings",
      "Archaeological Site Walk",
      "Royal Palace Guided Tour"
    ]
  },
  {
    id: "educational",
    label: "Educational",
    icon: GraduationCap,
    description: "Eco-learning, geological studies, and botanical excursions.",
    activities: [
      "Eco-Tourism Workshop",
      "Botanical Identification Walk",
      "Geological Rock Formation Tour",
      "Historical Archives Visit"
    ]
  }
]

interface HotelOption {
  name: string
  stars: string
  pricePerNight: number
  location: string
  image: string
  description: string
  amenities: string[]
}

const HOTEL_RECOMMENDATIONS: Record<string, HotelOption[]> = {
  "2star": [
    {
      name: "Swat Rest Inn",
      stars: "2★",
      pricePerNight: 35,
      location: "Mingora, Swat",
      image: "https://i.pinimg.com/1200x/b1/38/c8/b138c8df93b33e86f2bad052a0e820f7.jpg",
      description: "Cozy, budget-friendly lodge close to Mingora bazaar and main transit hubs.",
      amenities: ["Free Wi-Fi", "Breakfast Included", "Parking"]
    }
  ],
  "3star": [
    {
      name: "Pine Breeze Kalam Resort",
      stars: "3★",
      pricePerNight: 65,
      location: "Kalam Valley",
      image: "https://i.pinimg.com/1200x/3d/28/42/3d28428be4c9e6813b88dcea5bafca93.jpg",
      description: "Comfortable mountain view lodge surrounded by pine pine forests and serene vistas.",
      amenities: ["Hot Water", "Restaurant", "Bonfire Lawn", "Mountain View"]
    }
  ],
  "4star": [
    {
      name: "White Palace Marghazar",
      stars: "4★",
      pricePerNight: 130,
      location: "Marghazar, Swat",
      image: "https://i.pinimg.com/736x/b4/53/1f/b4531fdb1fa6ff03ff99297c6e118353.jpg",
      description: "Historic royal marble palace converted into a heritage mountain hotel.",
      amenities: ["Heritage Suites", "Fine Dining", "Lush Gardens", "Guided Tour"]
    }
  ],
  "5star": [
    {
      name: "Swat Serena Hotel",
      stars: "5★",
      pricePerNight: 230,
      location: "Saidu Sharif, Swat",
      image: "https://i.pinimg.com/1200x/23/12/03/231203092b3b8494f51b4cb8bf90fd4b.jpg",
      description: "Luxury resort nestled in 6 acres of rose gardens with traditional architecture.",
      amenities: ["Swimming Pool", "Spa & Wellness", "Multi-cuisine Dining", "24/7 Butler"]
    }
  ],
  "luxury": [
    {
      name: "Malam Jabba Ski & Luxury Resort",
      stars: "Luxury Resort / 6★",
      pricePerNight: 420,
      location: "Malam Jabba Peak",
      image: "https://i.pinimg.com/736x/e9/15/ad/e915ad6a6f9369d01a3f0d7d59dae3b1.jpg",
      description: "Ultra-luxury alpine resort with private ski lifts, heated suites, and panoramic views.",
      amenities: ["Ski-in/Ski-out", "Heated Pool", "Helipad Access", "Executive Spa", "Gourmet Buffet"]
    }
  ]
}

interface PlaceRecommendation {
  name: string
  type: string
  image: string
  description: string
  highlights: string
}

const PLACES_DATA: Record<string, PlaceRecommendation[]> = {
  relaxation: [
    {
      name: "Ushu Forest & Riverside",
      type: "Nature Sanctuary",
      image: "https://images.unsplash.com/photo-1634922719192-b4503cf15e07?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Dense cedar woodland with gentle streams, ideal for nature walks and deep relaxation.",
      highlights: "Fresh Air, Pine Fragrance, Quiet Riverbanks"
    },
    {
      name: "Fizagat Park Lawn",
      type: "Riverside Park",
      image: "https://i.pinimg.com/736x/0e/72/03/0e720379a83e3dc67ada096506904dfc.jpg",
      description: "Beautifully maintained riverside park offering serene benches along the Swat River.",
      highlights: "Family Rest, Gentle Breeze, Sunset Vistas"
    }
  ],
  hiking: [
    {
      name: "Mahodand Lake Trek",
      type: "Alpine Lake Trail",
      image: "https://i.pinimg.com/1200x/c6/83/a6/c683a61a1dd1939dbc3877d98530767b.jpg",
      description: "Glacial lake surrounded by snow-capped peaks and meadows of wild flowers.",
      highlights: "Trout Fishing, Boating, Scenic Trails"
    },
    {
      name: "Gabin Jabba Plateau",
      type: "High Altitude Meadow",
      image: "https://i.pinimg.com/1200x/ff/b5/0e/ffb50e6407a0af2b36ebc5d5985b837e.jpg",
      description: "Lush green pastures perched at 8,202 feet offering breathtaking mountain panoramas.",
      highlights: "Alpine Flora, Trekking, Fresh Springs"
    }
  ],
  adventure: [
    {
      name: "Malam Jabba Zipline & Ski Resort",
      type: "Adventure Park",
      image: "https://i.pinimg.com/1200x/ff/8c/60/ff8c609545dae55e0cdd8df7a0ed1143.jpg",
      description: "Highest zipline in Pakistan, chairlifts, and winter ski slopes.",
      highlights: "High Zipline, Chairlift, Giant Swing"
    },
    {
      name: "Kalam Valley 4x4 Trail",
      type: "Off-Road Terrain",
      image: "https://i.pinimg.com/736x/4e/c3/b9/4ec3b9e84b22b1aecd2cc36d5f02470e.jpg",
      description: "Rugged jeep routes through rushing mountain torrents and pine canyons.",
      highlights: "Jeep Safari, Water Crossings, Rocky Peaks"
    }
  ],
  default: [
    {
      name: "Swat Valley Panorama",
      type: "Scenic Valley",
      image: "https://i.pinimg.com/1200x/39/7a/d1/397ad12c5beece60713d1770385cadcd.jpg",
      description: "The Switzerland of the East with emerald rivers, orchards, and towering peaks.",
      highlights: "Historic Sites, Local Food, Alpine Pass"
    }
  ]
}

const TRANSPORT_RATES: Record<string, { label: string; pricePerDay: number }> = {
  sedan: { label: "Private Sedan Car", pricePerDay: 45 },
  suv: { label: "4x4 SUV / Prado", pricePerDay: 90 },
  coaster: { label: "Coaster Minibus", pricePerDay: 140 },
  flight: { label: "Flight + Local Transfer", pricePerDay: 180 },
  self: { label: "Self Drive / None", pricePerDay: 0 }
}

export default function TripPlanner() {
  // Wizard state
  const [currentStep, setCurrentStep] = useState<number>(1)

  // Step 1: Personal Info
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [country, setCountry] = useState<string>("Pakistan")

  // Step 2: Trip Logistics & Budget
  const [travelDate, setTravelDate] = useState<Date | undefined>(new Date())
  const [durationDays, setDurationDays] = useState<number>(5)
  const [travelers, setTravelers] = useState<number>(2)
  const [budgetCap, setBudgetCap] = useState<number>(1500)
  const [hotelCategory, setHotelCategory] = useState<string>("3star")
  const [transportType, setTransportType] = useState<string>("suv")
  const [includeGuide, setIncludeGuide] = useState<boolean>(true)

  // Step 3: Trip Type & Dynamic Dependent Activities
  const [selectedTripType, setSelectedTripType] = useState<string>("relaxation")
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    "Mountain Meditation",
    "Riverside Relaxation"
  ])
  const [specialRequests, setSpecialRequests] = useState<string>("")

  // Database Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Active Trip Type Object
  const activeTripTypeObj = useMemo(() => {
    return TRIP_TYPES.find((t) => t.id === selectedTripType) || TRIP_TYPES[0]
  }, [selectedTripType])

  // Handler when switching Trip Type
  const handleTripTypeSelect = (id: string) => {
    setSelectedTripType(id)
    const typeObj = TRIP_TYPES.find((t) => t.id === id)
    if (typeObj && typeObj.activities.length > 0) {
      // Pick first 2 default activities
      setSelectedActivities(typeObj.activities.slice(0, 2))
    } else {
      setSelectedActivities([])
    }
  }

  // Activity Toggle
  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a: string) => a !== activity))
    } else {
      setSelectedActivities([...selectedActivities, activity])
    }
  }

  // Calculation Logic
  const selectedHotelOption = useMemo(() => {
    const options = HOTEL_RECOMMENDATIONS[hotelCategory] || HOTEL_RECOMMENDATIONS["3star"]
    return options[0]
  }, [hotelCategory])

  const transportOption = useMemo(() => {
    return TRANSPORT_RATES[transportType] || TRANSPORT_RATES.suv
  }, [transportType])

  const calculatedCosts = useMemo(() => {
    const nights = Math.max(1, durationDays)
    const people = Math.max(1, travelers)

    const hotelTotal = selectedHotelOption.pricePerNight * nights
    const foodTotal = 25 * nights * people // $25 food per person/day
    const transportTotal = transportOption.pricePerDay * nights
    const guideTotal = includeGuide ? 35 * nights : 0
    const activitiesTotal = selectedActivities.length * 20 * people // $20 per activity per person

    const total = hotelTotal + foodTotal + transportTotal + guideTotal + activitiesTotal

    return {
      nights,
      people,
      hotelTotal,
      foodTotal,
      transportTotal,
      guideTotal,
      activitiesTotal,
      total
    }
  }, [durationDays, travelers, selectedHotelOption, transportOption, includeGuide, selectedActivities])

  // Recommendations based on Trip Type
  const recommendedPlaces = useMemo(() => {
    return PLACES_DATA[selectedTripType] || PLACES_DATA.default
  }, [selectedTripType])

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep((prev: number) => prev + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((prev: number) => prev - 1)
  }

  // Database Submission Function
  async function submitTripRequest() {
    setIsSubmitting(true)
    setSubmitMessage(null)

    const payload = {
      full_name: fullName.trim() || "",
      email: email.trim() || "",
      phone: phone.trim() || "",
      country: country.trim() || "",
      travel_date: travelDate ? format(travelDate, "yyyy-MM-dd") : null,
      duration_days: Number(durationDays) || 0,
      travelers: Number(travelers) || 0,
      budget: Number(budgetCap) || 0,
      hotel: selectedHotelOption?.name || "",
      hotel_category: hotelCategory || "",
      transport: transportType || "",
      include_guide: Boolean(includeGuide),
      trip_type: selectedTripType || "",
      activities: Array.isArray(selectedActivities) ? selectedActivities : [],
      special_requests: specialRequests.trim() || "",
      total_cost: Number(calculatedCosts?.total) || 0,
      status: "pending"
    }

    console.log("[TripPlanner] Submitting trip request to 'trip_requests':", payload)

    try {
      const { data, error } = await supabase
  .from("trip_requests")
  .insert([payload])
  .select()
  ;
  


      if (error) {
        console.error("[TripPlanner] Supabase error during insert:", error)
        console.error("Code:", error.code)
        console.error("Message:", error.message)
        console.error("Details:", error.details)
        console.error("Hint:", error.hint)

        setSubmitMessage({
          type: "error",
          text: `Failed to submit trip request: ${error.message || "Database error"}`
        })
      } else {
        console.log("[TripPlanner] Successfully inserted trip request:", data)
        setSubmitMessage({ type: "success", text: "Trip request successfully saved." })
      }
    } catch (err) {
      console.error("[TripPlanner] Unexpected submission error:", err)
      setSubmitMessage({ type: "error", text: "Failed to submit trip request due to an unexpected error." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="planner" className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/30 to-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            AI-Powered Trip Generator
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-primary to-emerald-600 bg-clip-text text-transparent mb-4">
            Plan Your Perfect Trip
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Customize your dream itinerary in Swat Valley with real-time budget estimation, dynamic place recommendations, and instant AI lodging match.
          </p> <br/>
        </motion.div>

        {/* Multi-Step Wizard Stepper */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-2 relative">
            {[
              { step: 1, title: "Personal", subtitle: "Contact Info" },
              { step: 2, title: "Logistics", subtitle: "Budget & Dates" },
              { step: 3, title: "Trip Type", subtitle: "Activities" },
              { step: 4, title: "AI Review", subtitle: "Summary & Places" }
            ].map((s: { step: number; title: string; subtitle: string }) => (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-300",
                  currentStep === s.step
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105 font-bold"
                    : currentStep > s.step
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
                    : "bg-card/60 backdrop-blur-md text-muted-foreground border-border hover:bg-accent"
                )}
              >
                <div className="flex items-center gap-1 text-xs md:text-sm font-semibold mb-1">
                  {currentStep > s.step ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs">
                      {s.step}
                    </span>
                  )}
                  <span className="hidden sm:inline">{s.title}</span>
                </div>
                <span className="text-[11px] opacity-80 hidden md:inline">{s.subtitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout: Wizard + Live Trip Summary Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT / CENTER: Wizard Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border border-border/60 shadow-2xl bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-muted/40 border-b border-border/50 pb-4">
                <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-2 text-foreground">
                  {currentStep === 1 && <><User className="w-6 h-6 text-primary" /> Step 1: Traveler Details</>}
                  {currentStep === 2 && <><Compass className="w-6 h-6 text-primary" /> Step 2: Logistics & Hotel Category</>}
                  {currentStep === 3 && <><Activity className="w-6 h-6 text-primary" /> Step 3: Trip Style & Custom Activities</>}
                  {currentStep === 4 && <><Sparkles className="w-6 h-6 text-primary" /> Step 4: AI Recommendations & Finalize</>}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Provide your basic contact information so our team can send your final plan."}
                  {currentStep === 2 && "Set your schedule, travelers count, hotel category, and preferred transit."}
                  {currentStep === 3 && "Choose your trip theme to unlock smart dependent activities and tours."}
                  {currentStep === 4 && "Review your live itinerary, recommended stay, top tourist spots, and budget."}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-8 space-y-6">
                <AnimatePresence mode="wait">
                  {/* STEP 1 */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="flex items-center gap-2 font-medium">
                            <User className="w-4 h-4 text-primary" /> Full Name
                          </Label>
                          <Input
                            id="fullName"
                            placeholder="e.g. John Doe"
                            value={fullName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                            className="rounded-xl bg-background/50 border-border focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                            <Mail className="w-4 h-4 text-primary" /> Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className="rounded-xl bg-background/50 border-border focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2 font-medium">
                            <Phone className="w-4 h-4 text-primary" /> Phone Number
                          </Label>
                          <Input
                            id="phone"
                            placeholder="+92 300 1234567"
                            value={phone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            className="rounded-xl bg-background/50 border-border focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country" className="flex items-center gap-2 font-medium">
                            <Globe className="w-4 h-4 text-primary" /> Country / Region
                          </Label>
                          <Input
                            id="country"
                            placeholder="Pakistan / USA / UK"
                            value={country}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
                            className="rounded-xl bg-background/50 border-border focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2 font-medium">
                            <CalendarIcon className="w-4 h-4 text-primary" /> Travel Start Date
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal rounded-xl border-border bg-background/50",
                                  !travelDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                {travelDate ? format(travelDate, "PPP") : "Pick date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 rounded-2xl shadow-xl" align="start">
                              <Calendar
                                mode="single"
                                selected={travelDate}
                                onSelect={setTravelDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="duration" className="flex items-center gap-2 font-medium">
                            <Clock className="w-4 h-4 text-primary" /> Duration (Nights)
                          </Label>
                          <div className="flex items-center gap-3">
                            <Input
                              type="number"
                              min={1}
                              max={30}
                              value={durationDays}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                              className="rounded-xl bg-background/50 border-border text-center font-bold text-lg"
                            />
                            <span className="text-sm text-muted-foreground font-medium">Days/Nights</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="travelers" className="flex items-center gap-2 font-medium">
                            <Users className="w-4 h-4 text-primary" /> Number of Travelers
                          </Label>
                          <Input
                            type="number"
                            min={1}
                            max={50}
                            value={travelers}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                            className="rounded-xl bg-background/50 border-border font-bold text-lg text-center"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2 font-medium">
                            <BedDouble className="w-4 h-4 text-primary" /> Hotel Category
                          </Label>
                          <Select value={hotelCategory} onValueChange={setHotelCategory}>
                            <SelectTrigger className="rounded-xl bg-background/50 border-border">
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="2star">2★ Standard Budget Lodge ($35/night)</SelectItem>
                              <SelectItem value="3star">3★ Deluxe Mountain Lodge ($65/night)</SelectItem>
                              <SelectItem value="4star">4★ Executive Heritage Hotel ($130/night)</SelectItem>
                              <SelectItem value="5star">5★ Luxury Resort ($230/night)</SelectItem>
                              <SelectItem value="luxury">Luxury Resort / 6★ Ski Lodge ($420/night)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 font-medium">
                          <Car className="w-4 h-4 text-primary" /> Transportation Mode
                        </Label>
                        <Select value={transportType} onValueChange={setTransportType}>
                          <SelectTrigger className="rounded-xl bg-background/50 border-border">
                            <SelectValue placeholder="Select transportation" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="sedan">Private Sedan Car ($45/day)</SelectItem>
                            <SelectItem value="suv">4x4 SUV / Prado Jeep ($90/day)</SelectItem>
                            <SelectItem value="coaster">Coaster Minibus ($140/day)</SelectItem>
                            <SelectItem value="flight">Flight + Local Transfer ($180/day)</SelectItem>
                            <SelectItem value="self">Self Drive / None ($0/day)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Guide Option & Target Budget Slider */}
                      <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                            <div>
                              <p className="font-semibold text-sm">Include Licensed Tour Guide</p>
                              <p className="text-xs text-muted-foreground">$35/day - Expert local insights and safety support</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={includeGuide}
                            onChange={(e) => setIncludeGuide(e.target.checked)}
                            className="w-5 h-5 accent-primary rounded cursor-pointer"
                          />
                        </div>

                        <div className="pt-2 border-t border-border/40 space-y-2">
                          <div className="flex justify-between text-xs font-semibold">
                            <span>Target Budget Cap (Per Person)</span>
                            <span className="text-primary font-bold">${budgetCap}</span>
                          </div>
                          <input
                            type="range"
                            min={200}
                            max={5000}
                            step={100}
                            value={budgetCap}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setBudgetCap(Number(e.target.value))}
                            className="w-full accent-primary cursor-pointer"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label className="text-sm font-semibold mb-3 block text-foreground">
                          Select Primary Trip Theme:
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {TRIP_TYPES.map((type) => {
                            const IconComp = type.icon
                            const isSelected = selectedTripType === type.id
                            return (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => handleTripTypeSelect(type.id)}
                                className={cn(
                                  "flex flex-col items-start p-3 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden",
                                  isSelected
                                    ? "border-primary bg-primary/10 ring-2 ring-primary/30 shadow-md"
                                    : "border-border bg-background/40 hover:bg-accent/50"
                                )}
                              >
                                <div className={cn(
                                  "p-2 rounded-xl mb-2",
                                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                                )}>
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold block mb-0.5">{type.label}</span>
                                <span className="text-[10px] text-muted-foreground line-clamp-1">
                                  {type.description}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* DEPENDENT DROPDOWN / CHIPS SECTION */}
                      <div className="p-5 rounded-2xl bg-muted/30 border border-border/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-bold flex items-center gap-2 text-foreground">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Available Activities for <span className="text-primary capitalize">{activeTripTypeObj.label}</span>:
                          </Label>
                          <span className="text-xs text-muted-foreground font-semibold">
                            {selectedActivities.length} selected
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Select or unselect custom experiences tailored to your trip style:
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {activeTripTypeObj.activities.map((act: string) => {
                            const active = selectedActivities.includes(act)
                            return (
                              <button
                                key={act}
                                type="button"
                                onClick={() => toggleActivity(act)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all duration-200",
                                  active
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                                    : "bg-background/60 text-foreground border-border hover:border-primary/50"
                                )}
                              >
                                {active ? <Check className="w-3 h-3" /> : <span className="text-primary">+</span>}
                                {act}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requests" className="font-medium text-sm">
                          Special Requirements / Dietary / Accessibility Notes
                        </Label>
                        <Textarea
                          id="requests"
                          placeholder="e.g. Halal food requirements, wheelchair accessibility needed, honeymoon anniversary setup..."
                          value={specialRequests}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSpecialRequests(e.target.value)}
                          className="rounded-xl bg-background/50 border-border min-h-[80px]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: AI RECOMMENDATIONS & FINAL REVIEW */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* AI Hotel Recommendation Card with Image */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                            <Hotel className="w-4 h-4 text-primary" /> Recommended Accommodations
                          </h4>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                            Matched for {selectedHotelOption.stars}
                          </span>
                        </div>

                        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-md flex flex-col sm:flex-row">
                          <div className="sm:w-2/5 relative h-48 sm:h-auto min-h-[160px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={selectedHotelOption.image}
                              alt={selectedHotelOption.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              {selectedHotelOption.stars}
                            </div>
                          </div>
                          <div className="p-4 sm:w-3/5 space-y-2 flex flex-col justify-between">
                            <div>
                              <h5 className="font-extrabold text-base text-foreground">{selectedHotelOption.name}</h5>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-primary" /> {selectedHotelOption.location}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                {selectedHotelOption.description}
                              </p>
                            </div>
                            <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {selectedHotelOption.amenities.map((a: string) => (
                                  <span key={a} className="text-[9px] bg-muted px-2 py-0.5 rounded-md font-medium text-foreground">
                                    {a}
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs font-extrabold text-primary">
                                ${selectedHotelOption.pricePerNight}/night
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recommended Tourist Places Cards with Images */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                          <MapIcon className="w-4 h-4 text-primary" /> Recommended Tourist Destinations
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {recommendedPlaces.map((place: any, idx: number) => (
                            <div key={idx} className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                              <div className="relative h-32 w-full">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={place.image}
                                  alt={place.name}
                                  className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm">
                                  {place.type}
                                </span>
                              </div>
                              <div className="p-3 space-y-1">
                                <h6 className="font-bold text-xs text-foreground">{place.name}</h6>
                                <p className="text-[11px] text-muted-foreground line-clamp-2">{place.description}</p>
                                <p className="text-[10px] text-primary font-semibold pt-1">⚡ Highlights: {place.highlights}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Weather API & Google Maps Integration Placeholder Badges */}
                      <div className="grid sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs flex items-center gap-2">
                          <Sun className="w-5 h-5 shrink-0" />
                          <div>
                            <p className="font-bold">Weather API Hook Ready</p>
                            <p className="text-[10px] opacity-80">Live forecast sync for Swat: Sunny 22°C (Optimal for {activeTripTypeObj.label})</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                          <MapIcon className="w-5 h-5 shrink-0" />
                          <div>
                            <p className="font-bold">Google Maps Route SDK</p>
                            <p className="text-[10px] opacity-80">Interactive GPS trail route ready to export upon booking confirmation.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              {/* Submission Status Message Feedback Banner */}
              {submitMessage && (
                <div className="px-6 pb-2">
                  <div
                    className={cn(
                      "p-3 rounded-xl text-xs font-semibold text-center transition-all",
                      submitMessage.type === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-destructive/10 border border-destructive/30 text-destructive"
                    )}
                  >
                    {submitMessage.text}
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <CardFooter className="bg-muted/30 border-t border-border/50 p-4 md:p-6 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1 || isSubmitting}
                  className="rounded-xl gap-2 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>

                {currentStep < 4 ? (
                  <Button onClick={handleNextStep} className="rounded-xl gap-2 font-bold px-6 shadow-md shadow-primary/20">
                    Continue <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={submitTripRequest}
                    disabled={isSubmitting}
                    className="rounded-xl gap-2 font-extrabold px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Saving Request...
                      </>
                    ) : (
                      <>
                        Confirm & Request Itinerary <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* RIGHT: Real-time Live Summary & Instant Budget Calculator Panel (5 Cols) */}
          <div className="lg:col-span-5 sticky top-8 space-y-6">
            <Card className="border border-border/60 shadow-2xl bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary/10 border-b border-primary/20 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                    <DollarSign className="w-5 h-5 text-primary" /> Live Trip Summary & Budget
                  </CardTitle>
                  <span className="text-xs bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold px-2.5 py-1 rounded-full">
                    Real-time AI
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                {/* Selected Options Overview */}
                <div className="space-y-2 text-xs border-b border-border/50 pb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Traveler:</span>
                    <span className="font-bold text-foreground">{fullName || "Guest Traveler"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Duration:</span>
                    <span className="font-bold text-foreground">
                      {travelDate ? format(travelDate, "MMM dd, yyyy") : "Not set"} ({calculatedCosts.nights} Nights)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Group Size:</span>
                    <span className="font-bold text-foreground">{calculatedCosts.people} Person(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trip Theme:</span>
                    <span className="font-bold text-primary capitalize">{activeTripTypeObj.label}</span>
                  </div>
                </div>

                {/* Cost Breakdown List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Estimated Cost Breakdown
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40">
                      <span className="flex items-center gap-2 text-foreground font-medium">
                        <Hotel className="w-3.5 h-3.5 text-primary" /> Hotel ({selectedHotelOption.stars})
                      </span>
                      <span className="font-bold text-foreground">
                        ${calculatedCosts.hotelTotal} <span className="text-[10px] text-muted-foreground">(${selectedHotelOption.pricePerNight}/night)</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40">
                      <span className="flex items-center gap-2 text-foreground font-medium">
                        <Car className="w-3.5 h-3.5 text-primary" /> Transport ({transportOption.label})
                      </span>
                      <span className="font-bold text-foreground">
                        ${calculatedCosts.transportTotal}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40">
                      <span className="flex items-center gap-2 text-foreground font-medium">
                        <Activity className="w-3.5 h-3.5 text-primary" /> Activities ({selectedActivities.length})
                      </span>
                      <span className="font-bold text-foreground">
                        ${calculatedCosts.activitiesTotal}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40">
                      <span className="flex items-center gap-2 text-foreground font-medium">
                        <Info className="w-3.5 h-3.5 text-primary" /> Estimated Meals / Food
                      </span>
                      <span className="font-bold text-foreground">
                        ${calculatedCosts.foodTotal}
                      </span>
                    </div>

                    {includeGuide && (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40">
                        <span className="flex items-center gap-2 text-foreground font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Local Guide Fee
                        </span>
                        <span className="font-bold text-foreground">
                          ${calculatedCosts.guideTotal}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Activities Badges */}
                <div className="space-y-2 pt-1 border-t border-border/40">
                  <span className="text-xs font-bold text-muted-foreground block">Active Activities:</span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {selectedActivities.map((act: string) => (
                      <span
                        key={act}
                        className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-semibold"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Total Cost Display Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-emerald-500/10 border border-primary/30 text-center space-y-1 shadow-inner">
                  <span className="text-xs uppercase font-extrabold text-muted-foreground tracking-wider">
                    Estimated Total Investment
                  </span>
                  <div className="text-3xl md:text-4xl font-extrabold text-primary flex items-center justify-center gap-1">
                    <span>${calculatedCosts.total}</span>
                    <span className="text-xs text-muted-foreground font-normal">USD</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground pt-1">
                    ≈ {(calculatedCosts.total * 278).toLocaleString()} PKR (Includes Taxes & Permits)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}
