import type { Country, SpecialSection } from '../types'

export const STICKERS_PER_COUNTRY = 20

export const SPECIAL_SECTIONS: SpecialSection[] = [
  { code: 'SPE-INT', name: 'Introdução',          totalStickers: 8,  color: '#FFD700' },
  { code: 'SPE-EST', name: 'Estádios',             totalStickers: 12, color: '#00B4D8' },
  { code: 'SPE-MAS', name: 'Mascote',              totalStickers: 4,  color: '#FF6B6B' },
  { code: 'SPE-TRO', name: 'Troféu & História',   totalStickers: 6,  color: '#C77DFF' },
  { code: 'SPE-HIS', name: 'Seleções Históricas', totalStickers: 10, color: '#06D6A0' },
]

export const COUNTRIES: Country[] = [
  // Grupo A
  { code: 'MEX', name: 'México',             group: 'A', flagUrl: 'https://flagcdn.com/mx.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#006847', '#CE1126'] },
  { code: 'ZAF', name: 'África do Sul',      group: 'A', flagUrl: 'https://flagcdn.com/za.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#007A4D', '#FFB81C'] },
  { code: 'KOR', name: 'Coreia do Sul',      group: 'A', flagUrl: 'https://flagcdn.com/kr.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#CD2E3A', '#003478'] },
  { code: 'CZE', name: 'Tchéquia',           group: 'A', flagUrl: 'https://flagcdn.com/cz.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#D7141A', '#11457E'] },

  // Grupo B
  { code: 'CAN', name: 'Canadá',               group: 'B', flagUrl: 'https://flagcdn.com/ca.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#FF0000', '#FFFFFF'] },
  { code: 'BIH', name: 'Bósnia e Herzegovina', group: 'B', flagUrl: 'https://flagcdn.com/ba.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#002395', '#FECB00'] },
  { code: 'QAT', name: 'Catar',                group: 'B', flagUrl: 'https://flagcdn.com/qa.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#8D1B3D', '#FFFFFF'] },
  { code: 'SUI', name: 'Suíça',                group: 'B', flagUrl: 'https://flagcdn.com/ch.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#FF0000', '#FFFFFF'] },

  // Grupo C
  { code: 'BRA', name: 'Brasil',   group: 'C', flagUrl: 'https://flagcdn.com/br.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#009C3B', '#FFDF00'] },
  { code: 'MAR', name: 'Marrocos', group: 'C', flagUrl: 'https://flagcdn.com/ma.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#C1272D', '#006233'] },
  { code: 'HAI', name: 'Haiti',    group: 'C', flagUrl: 'https://flagcdn.com/ht.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#00209F', '#D21034'] },
  { code: 'SCO', name: 'Escócia',  group: 'C', flagUrl: 'https://flagcdn.com/gb-sct.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#003399', '#FFFFFF'] },

  // Grupo D
  { code: 'USA', name: 'Estados Unidos', group: 'D', flagUrl: 'https://flagcdn.com/us.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#002868', '#BF0A30'] },
  { code: 'PAR', name: 'Paraguai',       group: 'D', flagUrl: 'https://flagcdn.com/py.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#D52B1E', '#0038A8'] },
  { code: 'AUS', name: 'Austrália',      group: 'D', flagUrl: 'https://flagcdn.com/au.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#00008B', '#FFCC00'] },
  { code: 'TUR', name: 'Turquia',        group: 'D', flagUrl: 'https://flagcdn.com/tr.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#E30A17', '#FFFFFF'] },

  // Grupo E
  { code: 'GER', name: 'Alemanha',        group: 'E', flagUrl: 'https://flagcdn.com/de.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#000000', '#DD0000'] },
  { code: 'CUW', name: 'Curaçao',         group: 'E', flagUrl: 'https://flagcdn.com/cw.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#002B7F', '#F9E814'] },
  { code: 'CIV', name: 'Costa do Marfim', group: 'E', flagUrl: 'https://flagcdn.com/ci.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#F77F00', '#009A44'] },
  { code: 'ECU', name: 'Equador',         group: 'E', flagUrl: 'https://flagcdn.com/ec.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#FFD100', '#0033A0'] },

  // Grupo F
  { code: 'NED', name: 'Holanda', group: 'F', flagUrl: 'https://flagcdn.com/nl.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#FF6600', '#FFFFFF'] },
  { code: 'JPN', name: 'Japão',   group: 'F', flagUrl: 'https://flagcdn.com/jp.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#BC002D', '#FFFFFF'] },
  { code: 'SWE', name: 'Suécia',  group: 'F', flagUrl: 'https://flagcdn.com/se.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#006AA7', '#FECC02'] },
  { code: 'TUN', name: 'Tunísia', group: 'F', flagUrl: 'https://flagcdn.com/tn.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#E70013', '#FFFFFF'] },

  // Grupo G
  { code: 'BEL', name: 'Bélgica',       group: 'G', flagUrl: 'https://flagcdn.com/be.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#EF3340', '#000000'] },
  { code: 'EGY', name: 'Egito',         group: 'G', flagUrl: 'https://flagcdn.com/eg.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#CE1126', '#FFFFFF'] },
  { code: 'IRN', name: 'Irã',           group: 'G', flagUrl: 'https://flagcdn.com/ir.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#239F40', '#DA0000'] },
  { code: 'NZL', name: 'Nova Zelândia', group: 'G', flagUrl: 'https://flagcdn.com/nz.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#00247D', '#CC142B'] },

  // Grupo H
  { code: 'ESP', name: 'Espanha',        group: 'H', flagUrl: 'https://flagcdn.com/es.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#AA151B', '#F1BF00'] },
  { code: 'CPV', name: 'Cabo Verde',     group: 'H', flagUrl: 'https://flagcdn.com/cv.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#003893', '#CF2027'] },
  { code: 'KSA', name: 'Arábia Saudita', group: 'H', flagUrl: 'https://flagcdn.com/sa.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#006C35', '#FFFFFF'] },
  { code: 'URU', name: 'Uruguai',        group: 'H', flagUrl: 'https://flagcdn.com/uy.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#75AADB', '#FFFFFF'] },

  // Grupo I
  { code: 'FRA', name: 'França',  group: 'I', flagUrl: 'https://flagcdn.com/fr.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#002395', '#ED2939'] },
  { code: 'SEN', name: 'Senegal', group: 'I', flagUrl: 'https://flagcdn.com/sn.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#00853F', '#FDEF42'] },
  { code: 'IRQ', name: 'Iraque',  group: 'I', flagUrl: 'https://flagcdn.com/iq.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#CE1126', '#000000'] },
  { code: 'NOR', name: 'Noruega', group: 'I', flagUrl: 'https://flagcdn.com/no.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#EF2B2D', '#002868'] },

  // Grupo J
  { code: 'ARG', name: 'Argentina', group: 'J', flagUrl: 'https://flagcdn.com/ar.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#74ACDF', '#FFFFFF'] },
  { code: 'ALG', name: 'Argélia',   group: 'J', flagUrl: 'https://flagcdn.com/dz.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#006233', '#FFFFFF'] },
  { code: 'AUT', name: 'Áustria',   group: 'J', flagUrl: 'https://flagcdn.com/at.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#ED2939', '#FFFFFF'] },
  { code: 'JOR', name: 'Jordânia',  group: 'J', flagUrl: 'https://flagcdn.com/jo.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#007A3D', '#CE1126'] },

  // Grupo K
  { code: 'POR', name: 'Portugal',    group: 'K', flagUrl: 'https://flagcdn.com/pt.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#006600', '#FF0000'] },
  { code: 'COD', name: 'RD Congo',    group: 'K', flagUrl: 'https://flagcdn.com/cd.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#007FFF', '#F7D618'] },
  { code: 'UZB', name: 'Uzbequistão', group: 'K', flagUrl: 'https://flagcdn.com/uz.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#1EB53A', '#CE1126'] },
  { code: 'COL', name: 'Colômbia',    group: 'K', flagUrl: 'https://flagcdn.com/co.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#FCD116', '#003087'] },

  // Grupo L
  { code: 'ENG', name: 'Inglaterra', group: 'L', flagUrl: 'https://flagcdn.com/gb-eng.svg', totalStickers: STICKERS_PER_COUNTRY, colors: ['#FFFFFF', '#CF081F'] },
  { code: 'CRO', name: 'Croácia',    group: 'L', flagUrl: 'https://flagcdn.com/hr.svg',     totalStickers: STICKERS_PER_COUNTRY, colors: ['#FF0000', '#FFFFFF'] },
  { code: 'GHA', name: 'Gana',       group: 'L', flagUrl: 'https://flagcdn.com/gh.svg',     totalStickers: STICKERS_PER_COUNTRY, colors: ['#006B3F', '#FCD116'] },
  { code: 'PAN', name: 'Panamá',     group: 'L', flagUrl: 'https://flagcdn.com/pa.svg',     totalStickers: STICKERS_PER_COUNTRY, colors: ['#DB121A', '#005293'] },
]

export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const
export type GroupLetter = typeof GROUPS[number]

export const COUNTRIES_BY_GROUP = GROUPS.reduce((acc, group) => {
  acc[group] = COUNTRIES.filter(c => c.group === group)
  return acc
}, {} as Record<GroupLetter, Country[]>)

export function getStickerIds(code: string, total: number): string[] {
  return Array.from({ length: total }, (_, i) =>
    `${code}-${String(i + 1).padStart(2, '0')}`
  )
}

export const ALL_STICKER_IDS: string[] = [
  ...SPECIAL_SECTIONS.flatMap(s => getStickerIds(s.code, s.totalStickers)),
  ...COUNTRIES.flatMap(c => getStickerIds(c.code, c.totalStickers)),
]