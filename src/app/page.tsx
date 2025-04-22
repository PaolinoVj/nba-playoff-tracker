import LiveCountdownCard from "@/components/LiveCountdownCard"

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-6 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">
        Prossime Partite Squadre Preferite
      </h1>

      <LiveCountdownCard team="Golden State Warriors" />
      <LiveCountdownCard team="Boston Celtics" />
      <LiveCountdownCard team="Los Angeles Lakers" />
      <LiveCountdownCard team="Minnesota Timberwolves" />
    </main>
  )
}
