import dynamic from "next/dynamic"

const PollutionPrediction = dynamic(() => import("./pollution-prediction"), {
  ssr: false,
  loading: () => <p>Loading pollution prediction...</p>,
})

const PersonalizedAlerts = dynamic(() => import("./personalized-alerts"), {
  ssr: false,
  loading: () => <p>Loading personalized alerts...</p>,
})

const PollutionHeatmap = dynamic(() => import("./pollution-heatmap"), {
  ssr: false,
  loading: () => <p>Loading pollution heatmap...</p>,
})

const SourceIdentification = dynamic(() => import("./source-identification"), {
  ssr: false,
  loading: () => <p>Loading source identification...</p>,
})

const GreenCoverSimulation = dynamic(() => import("./green-cover-simulation"), {
  ssr: false,
  loading: () => <p>Loading green cover simulation...</p>,
})

const CitizenEngagement = dynamic(() => import("./citizen-engagement"), {
  ssr: false,
  loading: () => <p>Loading citizen engagement...</p>,
})

const InteractiveAQIPredictor = dynamic(() => import("./interactive-aqi-predictor"), {
  ssr: false,
  loading: () => <p>Loading interactive AQI predictor...</p>,
})

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InteractiveAQIPredictor />
      <PollutionPrediction />
      <PersonalizedAlerts />
      <PollutionHeatmap />
      <SourceIdentification />
      <GreenCoverSimulation />
      <CitizenEngagement />
    </div>
  )
}

