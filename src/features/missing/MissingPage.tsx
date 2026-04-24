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
  StickerSlot, StickerCircle, StickerId, EmptyState,
} from './MissingPage.styles'

export function MissingPage() {
  const { themeName, toggleTheme } = useThemeContext()
  const { profile } = useProfile()
  const { signOut } = useAuth()
  const { owned, toggle, totalCount, ownedCount, percentage } = useStickers()

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const allSections = [
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

  const missingSections = allSections
    .map(s => ({ ...s, missingIds: s.ids.filter(id => !owned.has(id)) }))
    .filter(s => s.missingIds.length > 0)

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

  return (
    <Page>
      <AppNav title="Faltantes" headerRight={headerRight} />

      <Content>
        {missingSections.length === 0 ? (
          <EmptyState>
            <p>🎉 Álbum completo!</p>
            <span>Você tem todas as figurinhas.</span>
          </EmptyState>
        ) : (
          missingSections.map((section, sIdx) => (
            <div key={section.code} style={{ animationDelay: `${sIdx * 0.03}s` }}>
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
                {section.missingIds.map((id, idx) => (
                  <StickerSlot
                    key={id}
                    $color1={section.color1}
                    $color2={section.color2}
                    onClick={() => toggle(id)}
                    style={{ animationDelay: `${idx * 0.015}s` }}
                  >
                    <StickerCircle $color={section.color1} />
                    <StickerId>{id}</StickerId>
                  </StickerSlot>
                ))}
              </Grid>
            </div>
          ))
        )}
      </Content>
    </Page>
  )
}