import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { COUNTRIES, SPECIAL_SECTIONS, getStickerIds } from '../../lib/constants'
import { useStickers } from '../../hooks/useStickers'
import { AppNav } from '../../components/AppNav'
import { CompleteBadge, Content, FlagCircle, MainCard, MissingLabel, MissingNumber, Page, ProgressBarFill, ProgressBarTrack, ProgressMeta, ProgressMetaText, SectionTitle, SpecialIcon, StatBadge, StatCard, StatInfo, StatName, StatSub } from './DashboardPage.styles'

export function DashboardPage() {
  const navigate = useNavigate()
  const { owned, ownedCount, totalCount, missingCount, percentage, loading } = useStickers()

  const stats = useMemo(() => {
    const allSections = [
      ...SPECIAL_SECTIONS.map(s => ({
        code: s.code, name: s.name,
        color1: s.color, color2: s.color + '88',
        flagUrl: null as string | null,
        total: s.totalStickers,
      })),
      ...COUNTRIES.map(c => ({
        code: c.code, name: c.name,
        color1: c.colors[0], color2: c.colors[1],
        flagUrl: c.flagUrl,
        total: c.totalStickers,
      })),
    ].map(s => {
      const ids = getStickerIds(s.code, s.total)
      const sOwned = ids.filter(id => owned.has(id)).length
      const missing = ids.length - sOwned
      return { ...s, sOwned, missing, total: ids.length }
    })

    const completed = allSections.filter(s => s.missing === 0)
    const incomplete = allSections.filter(s => s.missing > 0)

    const firstCompleted = completed[0] ?? null
    const closest = incomplete.length > 0
      ? [...incomplete].sort((a, b) => a.missing - b.missing)[0]
      : null
    const farthest = incomplete.length > 0
      ? [...incomplete].sort((a, b) => b.missing - a.missing)[0]
      : null

    return { firstCompleted, closest, farthest }
  }, [owned])

  return (
    <Page>
      <AppNav title="Dashboard" />

      <Content>
        {/* Card principal */}
        <MainCard>
          <MissingNumber>{loading ? '—' : missingCount}</MissingNumber>
          <MissingLabel>figurinhas faltando</MissingLabel>
          <ProgressBarTrack>
            <ProgressBarFill $pct={percentage} />
          </ProgressBarTrack>
          <ProgressMeta>
            <ProgressMetaText>{percentage}% completo</ProgressMetaText>
            <ProgressMetaText>{ownedCount}/{totalCount}</ProgressMetaText>
          </ProgressMeta>
        </MainCard>

        {/* Primeiro completo */}
        <SectionTitle>
          {stats.firstCompleted ? '🏆 Primeiro completo' : '🎯 Mais próximo de completar'}
        </SectionTitle>

        {stats.firstCompleted ? (
          <StatCard
            $color1={stats.firstCompleted.color1}
            $color2={stats.firstCompleted.color2}
            $delay={0.1}
            onClick={() => navigate(`/album/${stats.firstCompleted!.code}`)}
          >
            {stats.firstCompleted.flagUrl ? (
              <FlagCircle>
                <img src={stats.firstCompleted.flagUrl} alt={stats.firstCompleted.name} />
              </FlagCircle>
            ) : (
              <SpecialIcon $color={stats.firstCompleted.color1}>✦</SpecialIcon>
            )}
            <StatInfo>
              <StatName>{stats.firstCompleted.name}</StatName>
              <StatSub>{stats.firstCompleted.total}/{stats.firstCompleted.total} figurinhas</StatSub>
            </StatInfo>
            <CompleteBadge>✓ Completo</CompleteBadge>
          </StatCard>
        ) : stats.closest ? (
          <StatCard
            $color1={stats.closest.color1}
            $color2={stats.closest.color2}
            $delay={0.1}
            onClick={() => navigate(`/album/${stats.closest!.code}`)}
          >
            {stats.closest.flagUrl ? (
              <FlagCircle>
                <img src={stats.closest.flagUrl} alt={stats.closest.name} />
              </FlagCircle>
            ) : (
              <SpecialIcon $color={stats.closest.color1}>✦</SpecialIcon>
            )}
            <StatInfo>
              <StatName>{stats.closest.name}</StatName>
              <StatSub>faltam {stats.closest.missing} de {stats.closest.total}</StatSub>
            </StatInfo>
            <StatBadge $color={stats.closest.color1}>
              {stats.closest.sOwned}/{stats.closest.total}
            </StatBadge>
          </StatCard>
        ) : null}

        {/* Mais perto de completar (só aparece se já tem completo) */}
        {stats.firstCompleted && stats.closest && (
          <>
            <SectionTitle>🎯 Mais próximo de completar</SectionTitle>
            <StatCard
              $color1={stats.closest.color1}
              $color2={stats.closest.color2}
              $delay={0.2}
              onClick={() => navigate(`/album/${stats.closest!.code}`)}
            >
              {stats.closest.flagUrl ? (
                <FlagCircle>
                  <img src={stats.closest.flagUrl} alt={stats.closest.name} />
                </FlagCircle>
              ) : (
                <SpecialIcon $color={stats.closest.color1}>✦</SpecialIcon>
              )}
              <StatInfo>
                <StatName>{stats.closest.name}</StatName>
                <StatSub>faltam {stats.closest.missing} de {stats.closest.total}</StatSub>
              </StatInfo>
              <StatBadge $color={stats.closest.color1}>
                {stats.closest.sOwned}/{stats.closest.total}
              </StatBadge>
            </StatCard>
          </>
        )}

        {/* Mais longe de completar */}
        {stats.farthest && (
          <>
            <SectionTitle>📦 Mais longe de completar</SectionTitle>
            <StatCard
              $color1={stats.farthest.color1}
              $color2={stats.farthest.color2}
              $delay={0.3}
              onClick={() => navigate(`/album/${stats.farthest!.code}`)}
            >
              {stats.farthest.flagUrl ? (
                <FlagCircle>
                  <img src={stats.farthest.flagUrl} alt={stats.farthest.name} />
                </FlagCircle>
              ) : (
                <SpecialIcon $color={stats.farthest.color1}>✦</SpecialIcon>
              )}
              <StatInfo>
                <StatName>{stats.farthest.name}</StatName>
                <StatSub>faltam {stats.farthest.missing} de {stats.farthest.total}</StatSub>
              </StatInfo>
              <StatBadge $color={stats.farthest.color1}>
                {stats.farthest.sOwned}/{stats.farthest.total}
              </StatBadge>
            </StatCard>
          </>
        )}
      </Content>
    </Page>
  )
}