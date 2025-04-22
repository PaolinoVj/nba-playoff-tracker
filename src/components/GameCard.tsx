type GameProps = {
  teamA: string
  teamB: string
  date: string
  time: string
  round: string
}

export default function GameCard({ teamA, teamB, date, time, round }: GameProps) {
  return (
    <div className="border rounded-2xl p-4 shadow-md w-full max-w-xl bg-white">
      <div className="text-sm text-gray-500 mb-1">{round}</div>
      <h2 className="text-xl font-semibold">{teamA} vs {teamB}</h2>
      <div className="mt-2 text-gray-700">
        🗓 {new Date(date).toLocaleDateString("it-IT")} – 🕒 {time}
      </div>
    </div>
  )
}
