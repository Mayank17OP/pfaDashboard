import { NextResponse } from "next/server"
import { predictAQI } from "../../../aqi_predictor_bridge"

export async function POST(request: Request) {
  const { temperature, humidity, windSpeed, previousAQI } = await request.json()

  try {
    const predictedAQI = await predictAQI(temperature, humidity, windSpeed, previousAQI)
    return NextResponse.json({ predictedAQI })
  } catch (error) {
    console.error("Error predicting AQI:", error)
    return NextResponse.json({ error: "Failed to predict AQI" }, { status: 500 })
  }
}

