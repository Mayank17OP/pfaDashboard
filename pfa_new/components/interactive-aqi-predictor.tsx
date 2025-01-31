"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

type PollutantLevels = {
  pm25: number
  pm10: number
  no2: number
  o3: number
  co: number
  so2: number
}

const calculateAQI = (pollutants: PollutantLevels): number => {
  // This is a simplified AQI calculation and not accurate for real-world use
  const { pm25, pm10, no2, o3, co, so2 } = pollutants
  const pm25Index = (pm25 / 12) * 50
  const pm10Index = (pm10 / 54) * 50
  const no2Index = (no2 / 40) * 50
  const o3Index = (o3 / 70) * 50
  const coIndex = (co / 4.4) * 50
  const so2Index = (so2 / 40) * 50

  return Math.max(pm25Index, pm10Index, no2Index, o3Index, coIndex, so2Index)
}

const getAQICategory = (aqi: number): string => {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "#00e400"
  if (aqi <= 100) return "#ffff00"
  if (aqi <= 150) return "#ff7e00"
  if (aqi <= 200) return "#ff0000"
  if (aqi <= 300) return "#99004c"
  return "#7e0023"
}

export default function InteractiveAQIPredictor() {
  const [isMounted, setIsMounted] = useState(false)
  const [pollutants, setPollutants] = useState<PollutantLevels>({
    pm25: 12,
    pm10: 54,
    no2: 40,
    o3: 70,
    co: 4.4,
    so2: 40,
  })
  const [aqi, setAQI] = useState(50)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const calculatedAQI = calculateAQI(pollutants)
    setAQI(Math.round(calculatedAQI))
  }, [pollutants])

  const handlePollutantChange = (pollutant: keyof PollutantLevels, value: number[]) => {
    setPollutants((prev) => ({ ...prev, [pollutant]: value[0] }))
  }

  if (!isMounted) {
    return null
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Interactive AQI Predictor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {Object.entries(pollutants).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={key}>{key.toUpperCase()} (µg/m³)</Label>
                <Slider
                  id={key}
                  min={0}
                  max={key === "co" ? 50 : 500}
                  step={1}
                  value={[value]}
                  onValueChange={(newValue) => handlePollutantChange(key as keyof PollutantLevels, newValue)}
                />
                <p className="text-sm text-muted-foreground mt-1">Current: {value} µg/m³</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-2">Estimated AQI</h3>
            <div
              className="text-6xl font-bold p-6 rounded-full"
              style={{ backgroundColor: getAQIColor(aqi), color: aqi > 150 ? "white" : "black" }}
            >
              {aqi}
            </div>
            <p className="mt-4 text-xl">{getAQICategory(aqi)}</p>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Note: This is a simplified AQI calculation for demonstration purposes. Real AQI calculations are more complex
          and consider additional factors.
        </p>
      </CardContent>
    </Card>
  )
}

