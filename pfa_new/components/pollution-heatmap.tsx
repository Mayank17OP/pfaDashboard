"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const pollutionHotspots = [
  { name: "Anand Vihar", lat: 28.6469, lng: 77.3163, aqi: 380 },
  { name: "ITO", lat: 28.6289, lng: 77.2405, aqi: 320 },
  { name: "Mundka", lat: 28.6835, lng: 77.078, aqi: 400 },
  { name: "Punjabi Bagh", lat: 28.6683, lng: 77.1267, aqi: 350 },
  { name: "RK Puram", lat: 28.5665, lng: 77.1765, aqi: 300 },
  { name: "Dwarka", lat: 28.5823, lng: 77.05, aqi: 280 },
  { name: "Rohini", lat: 28.7415, lng: 77.0648, aqi: 330 },
  { name: "Okhla", lat: 28.5681, lng: 77.2797, aqi: 360 },
]

function getColor(aqi: number) {
  if (aqi > 400) return "#7e0023"
  if (aqi > 300) return "#99004c"
  if (aqi > 200) return "#ff0000"
  if (aqi > 150) return "#ff7e00"
  if (aqi > 100) return "#ffff00"
  if (aqi > 50) return "#00e400"
  return "#00e400"
}

function ScaleCorrector() {
  const map = useMap()

  useEffect(() => {
    const updateCircles = () => {
      const zoom = map.getZoom()
      const circles = document.querySelectorAll(".leaflet-interactive")
      circles.forEach((circle: any) => {
        const baseRadius = 20
        const scale = 1 / Math.pow(2, zoom - 11)
        circle.setAttribute("r", baseRadius * scale)
      })
    }

    map.on("zoomend", updateCircles)
    return () => {
      map.off("zoomend", updateCircles)
    }
  }, [map])

  return null
}

export default function PollutionHeatmap() {
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
        <CardTitle>Pollution Hotspots in New Delhi</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: "500px", width: "100%" }}>
          <MapContainer center={[28.6139, 77.209]} zoom={11} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pollutionHotspots.map((hotspot, index) => (
              <CircleMarker
                key={index}
                center={[hotspot.lat, hotspot.lng]}
                radius={20}
                fillColor={getColor(hotspot.aqi)}
                color={getColor(hotspot.aqi)}
                weight={1}
                opacity={0.8}
                fillOpacity={0.6}
              >
                <Popup>
                  <strong>{hotspot.name}</strong>
                  <br />
                  AQI: {hotspot.aqi}
                </Popup>
              </CircleMarker>
            ))}
            <ScaleCorrector />
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}

