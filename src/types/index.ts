export type User = {
  id: string
  email: string
}

export type Sticker = {
  id: string        // ex: "BRA-01"
  countryCode: string
  countryName: string
  number: number
  owned: boolean
}

export type Country = {
  code: string
  name: string
  group: string
  flagUrl: string
  totalStickers: number
}

export type Match = {
  id: number
  utcDate: string
  status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED'
  stage: string
  group?: string
  homeTeam: { id: number; name: string; crest: string }
  awayTeam: { id: number; name: string; crest: string }
  score: {
    fullTime: { home: number | null; away: number | null }
    halfTime: { home: number | null; away: number | null }
  }
}