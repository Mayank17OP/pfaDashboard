import { NextResponse } from "next/server"

const API_KEY = process.env.WAQI_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`)
    const data = await response.json()

    if (data.status === "ok") {
      return NextResponse.json({
        aqi: data.data.aqi,
        city: data.data.city.name,
        dominantPollutant: data.data.dominentpol,
      })
    } else {
      return NextResponse.json({ error: "Failed to fetch AQI data" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error fetching AQI data:", error)
    return NextResponse.json({ error: "An error occurred while fetching AQI data" }, { status: 500 })
  }
}

