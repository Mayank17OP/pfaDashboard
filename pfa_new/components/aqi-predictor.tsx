"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AQIPredictor() {
  const [temperature, setTemperature] = useState("")
  const [humidity, setHumidity] = useState("")
  const [windSpeed, setWindSpeed] = useState("")
  const [previousAQI, setPreviousAQI] = useState("")
  const [predictedAQI, setPredictedAQI] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePredict = async () => {
    setIsLoading(true)
    setError(null)
    setPredictedAQI(null)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature: Number.parseFloat(temperature),
          humidity: Number.parseFloat(humidity),
          windSpeed: Number.parseFloat(windSpeed),
          previousAQI: Number.parseFloat(previousAQI),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch prediction")
      }

      const data = await response.json()
      setPredictedAQI(data.predictedAQI)
    } catch (err) {
      setError("An error occurred while predicting AQI")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return "Good"
    if (aqi <= 100) return "Moderate"
    if (aqi <= 150) return "Unhealthy for Sensitive Groups"
    if (aqi <= 200) return "Unhealthy"
    if (aqi <= 300) return "Very Unhealthy"
    return "Hazardous"
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-100 text-green-800"
    if (aqi <= 100) return "bg-yellow-100 text-yellow-800"
    if (aqi <= 150) return "bg-orange-100 text-orange-800"
    if (aqi <= 200) return "bg-red-100 text-red-800"
    if (aqi <= 300) return "bg-purple-100 text-purple-800"
    return "bg-rose-100 text-rose-800"
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AQI Predictor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g., 25"
              />
            </div>
            <div>
              <Label htmlFor="humidity">Humidity (%)</Label>
              <Input
                id="humidity"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g., 60"
              />
            </div>
            <div>
              <Label htmlFor="windSpeed">Wind Speed (km/h)</Label>
              <Input
                id="windSpeed"
                value={windSpeed}
                onChange={(e) => setWindSpeed(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <Label htmlFor="previousAQI">Previous Day AQI</Label>
              <Input
                id="previousAQI"
                value={previousAQI}
                onChange={(e) => setPreviousAQI(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g., 150"
              />
            </div>
          </div>
          <Button onClick={handlePredict} className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Predicting...
              </>
            ) : (
              "Predict AQI"
            )}
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {predictedAQI !== null && (
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">Predicted AQI</h3>
              <p className={`text-4xl font-bold py-2 px-4 rounded-full inline-block ${getAQIColor(predictedAQI)}`}>
                {predictedAQI}
              </p>
              <p className="text-lg">{getAQICategory(predictedAQI)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

