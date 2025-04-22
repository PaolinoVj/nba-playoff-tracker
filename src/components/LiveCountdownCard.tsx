// src/components/LiveCountdownCard.tsx
'use client'

import { useEffect, useState } from "react"

interface GameData {
  teamA: string
  teamALogo?: string
  teamB: string
  teamBLogo?: string
  dateTime: string
}

export default function LiveCountdownCard({ team }: { team: string }) {
  const [data, setData] = useState<GameData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/nba/next-game?team=${encodeURIComponent(team)}`)
        const json = await res.json()

        if (!res.ok) throw new Error(json.error || "Errore nella richiesta")

        setData(json as GameData)
        setLoading(false)

        const target = new Date(json.dateTime).getTime()

        const interval = setInterval(() => {
          const now = new Date().getTime()
          const distance = target - now

          if (distance < 0) {
            setTimeLeft("In corso o terminata")
            clearInterval(interval)
            return
          }

          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))

          setTimeLeft(`${days > 0 ? days + 'g ' : ''}${hours}h ${minutes}m ${seconds}s`)
        }, 1000)

        return () => clearInterval(interval)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Errore sconosciuto'
        setError(message)
        setLoading(false)
      }
    }

    fetchData()
  }, [team])

  if (loading) return <div>Caricamento partita di {team}...</div>
  if (error) return <div>Errore: {error}</div>
  if (!data) return null

  return (
    <div className="flex items-center justify-between p-4 border rounded-xl shadow bg-white w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        {data.teamALogo && <img src={data.teamALogo} alt={data.teamA} className="w-12 h-12" />}
        <span className="font-bold text-lg">{data.teamA}</span>
      </div>

      <div className="text-center">
        <div className="text-sm text-gray-500">Prossima partita</div>
        <div className="text-xl font-semibold text-blue-600">{timeLeft}</div>
        <div className="text-sm text-gray-700">
          🗓 {new Date(data.dateTime).toLocaleDateString("it-IT")} – 🕒 {new Date(data.dateTime).toLocaleTimeString("it-IT", { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">{data.teamB}</span>
        {data.teamBLogo && <img src={data.teamBLogo} alt={data.teamB} className="w-12 h-12" />}
      </div>
    </div>
  )
}
