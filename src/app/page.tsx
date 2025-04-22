import GameCard from "@/components/GameCard"

export default function Home() {
  const games = [
    {
      teamA: "Lakers",
      teamB: "Nuggets",
      date: "2025-04-22",
      time: "02:30", // orario italiano
      round: "Primo turno - Gara 2"
    },
    {
      teamA: "Celtics",
      teamB: "Heat",
      date: "2025-04-23",
      time: "01:00",
      round: "Primo turno - Gara 2"
    },
    {
      teamA: "Suns",
      teamB: "Clippers",
      date: "2025-04-24",
      time: "04:00",
      round: "Primo turno - Gara 2"
    }
  ]

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Partite Playoff NBA (Orario Italiano)</h1>
      <div className="flex flex-col gap-4">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
    </main>
  )
}
