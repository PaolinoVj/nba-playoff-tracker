// src/components/CountdownCard.tsx
'use client'

import { useEffect, useState } from "react"

type CountdownCardProps = {
  teamA: string
  teamALogo: string // path all'immagine es: "/logos/lakers.svg"
  teamB: string
  teamBLogo: string
  dateTime: string // ISO string es: "2025-04-25T02:30:00"
}

export default function CountdownCard({ teamA, teamALogo, teamB, teamBLogo, dateTime }: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(dateTime).getTime()
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

      setTimeLeft(
        `${days > 0 ? days + 'g ' : ''}${hours}h ${minutes}m ${seconds}s`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [dateTime])

  return (
    <div className="flex items-center justify-between p-4 border rounded-xl shadow bg-white w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <img src={teamALogo} alt={teamA} className="w-12 h-12" />
        <span className="font-bold text-lg">{teamA}</span>
      </div>

      <div className="text-center">
        <div className="text-sm text-gray-500">Prossima partita</div>
        <div className="text-xl font-semibold text-blue-600">{timeLeft}</div>
        <div className="text-sm text-gray-700">
          🗓 {new Date(dateTime).toLocaleDateString("it-IT")} – 🕒 {new Date(dateTime).toLocaleTimeString("it-IT", { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">{teamB}</span>
        <img src={teamBLogo} alt={teamB} className="w-12 h-12" />
      </div>
    </div>
  )
}
