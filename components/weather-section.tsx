"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react"

export default function WeatherSection() {
  const [currentWeather, setCurrentWeather] = useState({
    temp: 22,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 8,
    icon: <Sun className="h-12 w-12 text-yellow-500" />,
  })

  const forecast = [
    {
      day: "Monday",
      temp: 22,
      condition: "Sunny",
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
    },
    {
      day: "Tuesday",
      temp: 20,
      condition: "Partly Cloudy",
      icon: <Cloud className="h-8 w-8 text-gray-400" />,
    },
    {
      day: "Wednesday",
      temp: 18,
      condition: "Rainy",
      icon: <CloudRain className="h-8 w-8 text-blue-400" />,
    },
    {
      day: "Thursday",
      temp: 19,
      condition: "Cloudy",
      icon: <Cloud className="h-8 w-8 text-gray-400" />,
    },
    {
      day: "Friday",
      temp: 21,
      condition: "Sunny",
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
    },
  ]

  const locations = ["Kalam", "Mingora", "Malam Jabba", "Bahrain"]
  const [selectedLocation, setSelectedLocation] = useState("Kalam")

  // Simulate weather data change when location changes
  useEffect(() => {
    // In a real app, you would fetch weather data for the selected location
    const weatherData = {
      Kalam: {
        temp: 18,
        condition: "Partly Cloudy",
        humidity: 52,
        windSpeed: 10,
        icon: <Cloud className="h-12 w-12 text-gray-400" />,
      },
      Mingora: {
        temp: 24,
        condition: "Sunny",
        humidity: 40,
        windSpeed: 6,
        icon: <Sun className="h-12 w-12 text-yellow-500" />,
      },
      "Malam Jabba": {
        temp: 15,
        condition: "Cloudy",
        humidity: 60,
        windSpeed: 12,
        icon: <Cloud className="h-12 w-12 text-gray-400" />,
      },
      Bahrain: {
        temp: 20,
        condition: "Sunny",
        humidity: 45,
        windSpeed: 8,
        icon: <Sun className="h-12 w-12 text-yellow-500" />,
      },
    }

    setCurrentWeather(weatherData[selectedLocation as keyof typeof weatherData])
  }, [selectedLocation])

  return (
    <section className="py-20 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Weather in Swat Valley</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Check the current weather conditions and forecast for different locations in Swat Valley to plan your trip
            better.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue={locations[0]} onValueChange={setSelectedLocation}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              {locations.map((location) => (
                <TabsTrigger key={location} value={location}>
                  {location}
                </TabsTrigger>
              ))}
            </TabsList>

            {locations.map((location) => (
              <TabsContent key={location} value={location} className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Weather in {location}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {currentWeather.icon}
                          <div className="ml-4">
                            <div className="text-4xl font-bold">{currentWeather.temp}°C</div>
                            <div className="text-muted-foreground">{currentWeather.condition}</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                            <span>Humidity: {currentWeather.humidity}%</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Wind className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Wind: {currentWeather.windSpeed} km/h</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>5-Day Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-5 gap-2">
                        {forecast.map((day, index) => (
                          <div key={index} className="text-center">
                            <div className="text-sm font-medium">{day.day}</div>
                            <div className="my-2 flex justify-center">{day.icon}</div>
                            <div className="text-lg font-bold">{day.temp}°C</div>
                            <div className="text-xs text-muted-foreground">{day.condition}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Weather data is updated daily. Last updated: April 17, 2025</p>
          </div>
        </div>
      </div>
    </section>
  )
}
