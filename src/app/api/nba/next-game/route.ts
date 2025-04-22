import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const teamName = searchParams.get("team") || "Los Angeles Lakers"

  const response = await fetch(`https://api-basketball.p.rapidapi.com/teams?search=${encodeURIComponent(teamName)}`, {
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '', // ⚠️ vedi .env.local
      'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
    }
  })

  const teamData = await response.json()
  const teamId = teamData.response[0]?.id

  if (!teamId) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 })
  }

  // Prendi il prossimo match
  const nextGameRes = await fetch(`https://api-basketball.p.rapidapi.com/games?team=${teamId}&season=2024&next=1`, {
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
      'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
    }
  })

  const nextGameData = await nextGameRes.json()
  const game = nextGameData.response[0]

  return NextResponse.json({
    teamA: game.teams.home.name,
    teamALogo: game.teams.home.logo,
    teamB: game.teams.away.name,
    teamBLogo: game.teams.away.logo,
    dateTime: game.date // ISO string
  })
}
