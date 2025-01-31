"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export default function GreenCoverSimulation() {
  const [isMounted, setIsMounted] = useState(false)
  const [greenCover, setGreenCover] = useState(20)

  const [aqiReduction, setAqiReduction] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleGreenCoverChange = (value: number[]) => {
    setGreenCover(value[0])
    // Simulate AQI reduction (this would be based on a more complex model in a real application)
    setAqiReduction(Math.round(value[0] * 0.5))
  }

  if (!isMounted) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Green Cover Impact Simulation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="green-cover">Green Cover Percentage</Label>
            <Slider
              id="green-cover"
              min={0}
              max={100}
              step={1}
              value={[greenCover]}
              onValueChange={handleGreenCoverChange}
            />
            <p className="text-sm text-muted-foreground mt-1">Current: {greenCover}%</p>
          </div>
          <div>
            <h3 className="font-semibold">Estimated AQI Reduction</h3>
            <p className="text-2xl font-bold">{aqiReduction} points</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Increasing green cover in New Delhi can significantly reduce air pollution. This simulation provides an
            estimate of the potential impact.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

