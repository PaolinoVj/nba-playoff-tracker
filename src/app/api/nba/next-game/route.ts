import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const teamName = searchParams.get("team") || "Los Angeles Lakers"

  try {
    // 1. Trova l'ID squadra
    const teamRes = await fetch(`https://api-basketball.p.rapidapi.com/teams?search=${encodeURIComponent(teamName)}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
      }
    })

    if (!teamRes.ok) return NextResponse.json({ error: 'Errore ricerca team' }, { status: 500 })

    const teamData = await teamRes.json()
    const team = teamData.response[0]
    if (!team || !team.id) {
      return NextResponse.json({ error: "Squadra non trovata" }, { status: 404 })
    }

    const teamId = team.id

    // 2. Recupera la prossima partita
    const gameRes = await fetch(`https://api-basketball.p.rapidapi.com/games?team=${teamId}&season=2024&next=1`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
      }
    })

    if (!gameRes.ok) return NextResponse.json({ error: 'Errore recupero partita' }, { status: 500 })

    const gameData = await gameRes.json()
    const game = gameData.response[0]
    if (!game) {
      return NextResponse.json({ error: "Nessuna partita trovata" }, { status: 404 })
    }

    return NextResponse.json({
      teamA: game.teams.home.name,
      teamALogo: game.teams.home.logo,
      teamB: game.teams.away.name,
      teamBLogo: game.teams.away.logo,
      dateTime: game.date // ISO string
    })
 } catch {
  return NextResponse.json({ error: "Errore sconosciuto" }, { status: 500 })
}

}
