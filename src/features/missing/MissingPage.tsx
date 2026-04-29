/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/refs */
import { useRef, useState, useCallback, memo } from 'react'
import { useThemeContext } from '../../contexts/ThemeContext'
import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'
import { useStickers } from '../../hooks/useStickers'
import { COUNTRIES, SPECIAL_SECTIONS, getStickerIds } from '../../lib/constants'
import { AppNav } from '../../components/AppNav'
import { Avatar, ThemeDot, ThemeToggle } from '../album/AlbumPage.styles'
import {
  Page, HeaderRight, ProgressPill, ProgressPillBar,
  ProgressPillFill, ProgressPillText, Content, SectionDivider,
  FlagCircle, SpecialDot, DividerName, DividerLine, Grid,
  StickerSlot, StickerCircle, StickerId, EmptyState, SectionWrapper,
} from './MissingPage.styles'

type Section = {
  code: string
  name: string
  color1: string
  color2: string
  flagUrl: string | null
  missingIds: string[]
}

function buildSections(owned: Set<string>): Section[] {
  return [
    ...SPECIAL_SECTIONS.map(s => ({
      code: s.code, name: s.name,
      color1: s.color, color2: s.color + '88',
      flagUrl: null as string | null,
      ids: getStickerIds(s.code, s.totalStickers),
    })),
    ...COUNTRIES.map(c => ({
      code: c.code, name: c.name,
      color1: c.colors[0], color2: c.colors[1],
      flagUrl: c.flagUrl,
      ids: getStickerIds(c.code, c.totalStickers),
    })),
  ]
    .map(s => ({ ...s, missingIds: s.ids.filter(id => !owned.has(id)) }))
    .filter(s => s.missingIds.length > 0)
}

// Slot isolado com memo — só re-renderiza se suas props mudarem
const Slot = memo(({ id, color1, color2, isMarked, onToggle }: {
  id: string
  color1: string
  color2: string
  isMarked: boolean
  onToggle: (id: string) => void
}) => (
  <StickerSlot
    $color1={color1}
    $color2={color2}
    $marked={isMarked}
    onClick={() => onToggle(id)}
  >
    <StickerCircle $color={color1} $marked={isMarked} />
    <StickerId $marked={isMarked}>{id}</StickerId>
  </StickerSlot>
))

export function MissingPage() {
  const { themeName, toggleTheme } = useThemeContext()
  const { profile } = useProfile()
  const { signOut } = useAuth()
  const { owned, toggle, totalCount, ownedCount, percentage, loading } = useStickers()

  const snapshotRef = useRef<Section[] | null>(null)
  if (!loading && snapshotRef.current === null) {
    snapshotRef.current = buildSections(owned)
  }

  const [toggled, setToggled] = useState<Set<string>>(new Set())

  // useCallback evita recriar a função a cada render
  const handleToggle = useCallback((id: string) => {
    toggle(id)
    setToggled(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [toggle])

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const headerRight = (
    <HeaderRight>
      <ProgressPill>
        <ProgressPillBar>
          <ProgressPillFill $pct={percentage} />
        </ProgressPillBar>
        <ProgressPillText>{ownedCount}/{totalCount}</ProgressPillText>
      </ProgressPill>
      <ThemeToggle onClick={toggleTheme}>
        <ThemeDot $color="#f5c800" $active={themeName === 'yellow'} />
        <ThemeDot $color="#009cde" $active={themeName === 'blue'} />
      </ThemeToggle>
      <Avatar onClick={signOut}>{initials}</Avatar>
    </HeaderRight>
  )

  const snapshot = snapshotRef.current

  return (
    <Page>
      <AppNav title="Faltantes" headerRight={headerRight} />

      <Content>
        {loading || snapshot === null ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '40px 0' }}>
            Carregando...
          </p>
        ) : snapshot.length === 0 ? (
          <EmptyState>
            <p>🎉 Álbum completo!</p>
            <span>Você tem todas as figurinhas.</span>
          </EmptyState>
        ) : (
          snapshot.map(section => (
            <SectionWrapper key={section.code}>
              <SectionDivider>
                {section.flagUrl ? (
                  <FlagCircle>
                    <img src={section.flagUrl} alt={section.name} loading="lazy" />
                  </FlagCircle>
                ) : (
                  <SpecialDot $color={section.color1}>✦</SpecialDot>
                )}
                <DividerName>{section.name}</DividerName>
                <DividerLine $color={section.color1} />
              </SectionDivider>

              <Grid>
                {section.missingIds.map(id => (
                  <Slot
                    key={id}
                    id={id}
                    color1={section.color1}
                    color2={section.color2}
                    isMarked={toggled.has(id)}
                    onToggle={handleToggle}
                  />
                ))}
              </Grid>
            </SectionWrapper>
          ))
        )}
      </Content>
    </Page>
  )
}