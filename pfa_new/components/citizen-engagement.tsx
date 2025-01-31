"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CitizenEngagement() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Citizen Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Current Challenges</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Plant a Tree</span>
                <Badge>500 points</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Carpool for a Week</span>
                <Badge>300 points</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Use Public Transport</span>
                <Badge>200 points</Badge>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Your Impact</h3>
            <p>Trees Planted: 5</p>
            <p>CO2 Reduced: 50 kg</p>
            <p>Total Points: 1500</p>
          </div>
          <Button className="w-full">Join a Challenge</Button>
        </div>
      </CardContent>
    </Card>
  )
}

