export type User = {
  id: string
  email: string
}

export type Country = {
  code: string
  name: string
  group: string
  flagUrl: string
  totalStickers: number
  colors: [string, string]
}

export type SpecialSection = {
  code: string
  name: string
  totalStickers: number
  color: string
}

export type Profile = {
  id: string
  full_name: string | null
  email: string | null
  created_at: string
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