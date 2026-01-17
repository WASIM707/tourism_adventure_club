"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Users, MapPin, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function TripPlanner() {
  const [date, setDate] = useState<Date>()

  return (
    <section id="planner" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Perfect Trip</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Let us help you create a customized itinerary for your visit to Swat Valley. Fill out the form below, and
            our travel experts will get back to you with a personalized plan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Why Plan With Us?</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary h-12 w-12 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Local Expertise</h4>
                  <p className="text-muted-foreground">
                    Our team has extensive knowledge of Swat Valley, ensuring you visit the best locations at the
                    optimal times.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary h-12 w-12 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Time-Saving</h4>
                  <p className="text-muted-foreground">
                    We handle all the logistics, bookings, and arrangements, saving you hours of research and planning.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary h-12 w-12 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Personalized Experience</h4>
                  <p className="text-muted-foreground">
                    Every itinerary is customized based on your interests, preferences, and travel style.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Trip Planning Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Travel Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-5">3-5 days</SelectItem>
                          <SelectItem value="6-10">6-10 days</SelectItem>
                          <SelectItem value="11-15">11-15 days</SelectItem>
                          <SelectItem value="custom">Custom duration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelers">Number of Travelers</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3-5">3-5 people</SelectItem>
                        <SelectItem value="6-10">6-10 people</SelectItem>
                        <SelectItem value="10+">10+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nature">Nature & Landscapes</SelectItem>
                        <SelectItem value="adventure">Adventure & Trekking</SelectItem>
                        <SelectItem value="culture">Culture & History</SelectItem>
                        <SelectItem value="relaxation">Relaxation</SelectItem>
                        <SelectItem value="all">All of the above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Special Requests</Label>
                    <Textarea id="message" placeholder="Any special requirements or preferences..." />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
