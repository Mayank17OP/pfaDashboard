"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Info } from "lucide-react"

export default function PersonalizedAlerts() {
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
        <CardTitle>Personalized Alerts for New Delhi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>High Pollution Alert</AlertTitle>
          <AlertDescription>
            Tomorrow AQI in New Delhi: 450 (Severe). Wear a mask and avoid outdoor activities.
          </AlertDescription>
        </Alert>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Health Advisory</AlertTitle>
          <AlertDescription>
            Air quality is improving. It's safe for sensitive groups to engage in outdoor activities in the evening.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

