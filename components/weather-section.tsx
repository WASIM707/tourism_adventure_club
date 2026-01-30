  "use client"

  import { useState, useEffect } from "react"
  import { motion } from "framer-motion"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Cloud, CloudRain, Sun, Wind, Droplets, Loader2 } from "lucide-react"

  export default function WeatherSection() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentWeather, setCurrentWeather] = useState({
      temp: 0,
      condition: "",
      humidity: 0,
      windSpeed: 0,
      icon: <Sun className="h-12 w-12 text-yellow-500" />,
    })

    const [forecast, setForecast] = useState<any[]>([])
    const [selectedLocation, setSelectedLocation] = useState("Kalam")
    const [lastUpdated, setLastUpdated] = useState("")

    const locations = ["Kalam", "Mingora", "Malam Jabba", "Bahrain"]

    const coords: Record<string, { lat: number; lon: number }> = {
      "Kalam": { lat: 35.4906, lon: 72.5796 },
      "Mingora": { lat: 34.7717, lon: 72.3602 },
      "Malam Jabba": { lat: 34.7995, lon: 72.5726 },
      "Bahrain": { lat: 35.2074, lon: 72.5489 },
    }

    const getWeatherIcon = (code: number, className: string) => {
      // WMO Weather interpretation codes (Open-Meteo)
      if (code === 0 || code === 1) return <Sun className={`${className} text-yellow-500`} />
      if (code === 2) return <Cloud className={`${className} text-yellow-500`} /> // Partly cloudy
      if (code === 3) return <Cloud className={`${className} text-gray-400`} /> // Overcast
      if (code >= 45 && code <= 48) return <Cloud className={`${className} text-gray-500`} /> // Fog
      if (code >= 51 && code <= 67) return <CloudRain className={`${className} text-blue-400`} /> // Drizzle/Rain
      if (code >= 71 && code <= 77) return <Cloud className={`${className} text-blue-200`} /> // Snow
      if (code >= 80 && code <= 99) return <CloudRain className={`${className} text-blue-600`} /> // Showers/Thunder
      return <Sun className={`${className} text-yellow-500`} />
    }

    const getWeatherCondition = (code: number) => {
      const conditions: Record<number, string> = {
        0: "Sunny", 1: "Mainly Sunny", 2: "Partly Cloudy", 3: "Cloudy",
        45: "Foggy", 48: "Foggy",
        51: "Drizzle", 53: "Drizzle", 55: "Drizzle",
        56: "Freezing Drizzle", 57: "Freezing Drizzle",
        61: "Rain", 63: "Rain", 65: "Heavy Rain",
        66: "Freezing Rain", 67: "Freezing Rain",
        71: "Snow", 73: "Snow", 75: "Heavy Snow",
        77: "Snow Grains",
        80: "Showers", 81: "Showers", 82: "Violent Showers",
        85: "Snow Showers", 86: "Snow Showers",
        95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm"
      }
      return conditions[code] || "Unknown"
    }

    useEffect(() => {
      const fetchWeather = async () => {
        setLoading(true)
        setError(null)
        try {
          const { lat, lon } = coords[selectedLocation]
          // Fetch current weather and daily forecast from Open-Meteo (Free API)
          // Updated URL: removed 'time' from daily params (it's returned by default) and set explicit timezone
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKarachi&forecast_days=6`
          )

          if (!response.ok) {
            throw new Error("Failed to fetch weather data")
          }

          const data = await response.json()

          // Update Current Weather
          setCurrentWeather({
            temp: Math.round(data.current.temperature_2m),
            condition: getWeatherCondition(data.current.weather_code),
            humidity: data.current.relative_humidity_2m,
            windSpeed: data.current.wind_speed_10m,
            icon: getWeatherIcon(data.current.weather_code, "h-12 w-12"),
          })

          // Update Forecast (Skip today index 0, take next 5)
          const daily = data.daily
          const nextDays = daily.time.slice(1, 6).map((time: string, index: number) => {
            const i = index + 1 // Adjust index to match sliced time
            const date = new Date(time)
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
            const avgTemp = Math.round((daily.temperature_2m_max[i] + daily.temperature_2m_min[i]) / 2)
            
            return {
              day: dayName,
              temp: avgTemp,
              condition: getWeatherCondition(daily.weather_code[i]),
              icon: getWeatherIcon(daily.weather_code[i], "h-8 w-8"),
            }
          })
          setForecast(nextDays)
          setLastUpdated(new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }))

        } catch (err) {
          console.error("Weather fetch error:", err)
          setError("Unable to load weather data. Please check your connection.")
        } finally {
          setLoading(false)
        }
      }

      fetchWeather()
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
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <p className="text-muted-foreground">Loading weather data...</p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4 text-red-500">
                      <CloudRain className="h-10 w-10" />
                      <p>{error}</p>
                    </div>
                  ) : (
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
                                <div className="text-sm font-medium truncate">{day.day}</div>
                                <div className="my-2 flex justify-center">{day.icon}</div>
                                <div className="text-lg font-bold">{day.temp}°C</div>
                                <div className="text-xs text-muted-foreground truncate">{day.condition}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Weather data is updated daily. Last updated: {lastUpdated || "Loading..."}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }