"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type Prediction = {
  date: string
  aqi: number
  pm25: number
  pm10: number
  forecast: string
}

const staticData: Prediction[] = [
  { date: "2024-03-01", aqi: 210, pm25: 105, pm10: 170, forecast: "Poor" },
  { date: "2024-03-02", aqi: 195, pm25: 98, pm10: 160, forecast: "Moderate" },
  { date: "2024-03-03", aqi: 180, pm25: 90, pm10: 150, forecast: "Moderate" },
  { date: "2024-03-04", aqi: 220, pm25: 110, pm10: 180, forecast: "Poor" },
  { date: "2024-03-05", aqi: 250, pm25: 125, pm10: 200, forecast: "Very Poor" },
  { date: "2024-03-06", aqi: 230, pm25: 115, pm10: 190, forecast: "Poor" },
  { date: "2024-03-07", aqi: 200, pm25: 100, pm10: 165, forecast: "Poor" },
]

const getAQICategory = (aqi: number) => {
  if (isNaN(aqi)) return "Unknown"
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Satisfactory"
  if (aqi <= 200) return "Moderate"
  if (aqi <= 300) return "Poor"
  if (aqi <= 400) return "Very Poor"
  return "Severe"
}

const getAQIColor = (aqi: number) => {
  if (isNaN(aqi)) return "#f0f0f0" // Light gray for unknown values
  if (aqi <= 50) return "#a8e6cf" // Light green
  if (aqi <= 100) return "#dcedc1" // Light yellow-green
  if (aqi <= 150) return "#ffd3b6" // Light orange
  if (aqi <= 200) return "#ffaaa5" // Light red-orange
  if (aqi <= 300) return "#ff8b94" // Light red
  return "#ff6b6b" // Slightly darker red for severe levels
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <p className="font-bold">{label}</p>
        <p>
          AQI: {isNaN(data.aqi) ? "N/A" : data.aqi.toString()} ({data.forecast})
        </p>
        <p>PM2.5: {isNaN(data.pm25) ? "N/A" : data.pm25.toString()} µg/m³</p>
        <p>PM10: {isNaN(data.pm10) ? "N/A" : data.pm10.toString()} µg/m³</p>
      </div>
    )
  }
  return null
}

export default function PollutionPrediction() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>7-Day Pollution Forecast for New Delhi (2024) - Lighter Colors</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={staticData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="aqi"
              stroke="#ff6b6b"
              name="AQI"
              strokeWidth={2}
              dot={{ stroke: "#ff6b6b", strokeWidth: 2, r: 4 }}
            />
            <Line yAxisId="right" type="monotone" dataKey="pm25" stroke="#a8e6cf" name="PM2.5 (µg/m³)" />
            <Line yAxisId="right" type="monotone" dataKey="pm10" stroke="#dcedc1" name="PM10 (µg/m³)" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {staticData.map((day, index) => (
            <div key={index} className="text-center p-2 rounded" style={{ backgroundColor: getAQIColor(day.aqi) }}>
              <p className="font-bold">{day.date}</p>
              <p>AQI: {isNaN(day.aqi) ? "N/A" : day.aqi.toString()}</p>
              <p>{getAQICategory(day.aqi)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

