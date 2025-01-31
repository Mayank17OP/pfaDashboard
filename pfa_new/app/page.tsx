import dynamic from "next/dynamic"

const DynamicDashboard = dynamic(() => import("@/components/dashboard"), {
  ssr: false,
  loading: () => <p>Loading dashboard...</p>,
})

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Pollution Forecast and Action System (PFA) for New Delhi</h1>
      <DynamicDashboard />
    </main>
  )
}

