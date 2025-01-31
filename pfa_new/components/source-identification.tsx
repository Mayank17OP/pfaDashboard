"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { source: "Vehicle Emissions", contribution: 40 },
  { source: "Industrial Emissions", contribution: 25 },
  { source: "Construction Dust", contribution: 20 },
  { source: "Crop Burning", contribution: 10 },
  { source: "Other Sources", contribution: 5 },
]

export default function SourceIdentification() {
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
        <CardTitle>Pollution Sources in New Delhi</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="source" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="contribution" fill="#8884d8" name="Contribution (%)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

