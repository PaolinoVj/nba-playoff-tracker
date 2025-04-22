import CountdownCard from "@/components/CountdownCard"

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-6 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">
        Countdown Prossime Partite NBA
      </h1>

      <CountdownCard
        teamA="Golden State Warriors"
        teamALogo="/logos/warriors.svg"
        teamB="Phoenix Suns"
        teamBLogo="/logos/suns.svg"
        dateTime="2025-04-24T04:00:00"
      />
      <CountdownCard
        teamA="Boston Celtics"
        teamALogo="/logos/celtics.svg"
        teamB="Miami Heat"
        teamBLogo="/logos/heat.svg"
        dateTime="2025-04-24T01:30:00"
      />
      <CountdownCard
        teamA="Los Angeles Lakers"
        teamALogo="/logos/lakers.svg"
        teamB="Denver Nuggets"
        teamBLogo="/logos/nuggets.svg"
        dateTime="2025-04-25T03:00:00"
      />
      <CountdownCard
        teamA="Minnesota Timberwolves"
        teamALogo="/logos/timberwolves.svg"
        teamB="Dallas Mavericks"
        teamBLogo="/logos/mavericks.svg"
        dateTime="2025-04-25T02:00:00"
      />
    </main>
  )
}
