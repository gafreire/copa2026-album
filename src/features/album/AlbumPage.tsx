import { useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useThemeContext } from '../../contexts/ThemeContext'
import { useProfile } from '../../hooks/useProfile'
import { useAuth } from '../../hooks/useAuth'
import {
  COUNTRIES, COUNTRIES_BY_GROUP, GROUPS, SPECIAL_SECTIONS,
  getStickerIds, type GroupLetter,
} from '../../lib/constants'
import {
  Avatar, BottomNav, CardInfo, CompleteBadge, Content,
  CountryCard, CountryList, CountryName, FABCircle, FilterBar,
  FilterPill, FlagCircle, GroupBadge, GroupSelect, Header,
  HeaderActions, NavFAB, NavItem, Page, ProgressBarFill,
  ProgressBarTrack, ProgressBarWrapper, ProgressCard, ProgressCount,
  ProgressMeta, ProgressPct, ProgressTitle, SectionLabel,
  SideNav, SideNavFAB, SideNavItem, SideNavLogo, SpecialCard,
  SpecialColor, SpecialInfo, SpecialName, ThemeDot, ThemeToggle,
  CardProgressBarFill, CardProgressBarTrack,
} from './AlbumPage.styles'
import { useStickers } from '../../hooks/useStickers'

type FilterStatus = 'all' | 'owned' | 'missing'

const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
)
const IconAlbum = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)
const IconMissing = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)
const IconResults = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
  </svg>
)
const IconProfile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="10" height="10">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export function AlbumPage() {
  const { themeName, toggleTheme } = useThemeContext()
  const { profile } = useProfile()
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const { owned, loading, missingCount, totalCount, ownedCount, percentage } = useStickers()

  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [filterGroup, setFilterGroup] = useState<GroupLetter | 'all'>('all')

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const filteredCountries = useMemo(() => {
    let list = filterGroup === 'all' ? COUNTRIES : COUNTRIES_BY_GROUP[filterGroup]
    if (filterStatus === 'owned') {
      list = list.filter(c => getStickerIds(c.code, c.totalStickers).some(id => owned.has(id)))
    } else if (filterStatus === 'missing') {
      list = list.filter(c => getStickerIds(c.code, c.totalStickers).some(id => !owned.has(id)))
    }
    return list
  }, [filterGroup, filterStatus, owned])

  const navItems = [
    { label: 'Dashboard', icon: <IconDashboard />, path: '/dashboard' },
    { label: 'Album',     icon: <IconAlbum />,     path: '/album' },
    { label: 'Resultados',icon: <IconResults />,   path: '/results' },
    { label: 'Perfil',    icon: <IconProfile />,   path: '/profile' },
  ]

  return (
    <Page>
      {/* Sidebar desktop */}
      <SideNav>
        <SideNavLogo>MyAlbum</SideNavLogo>
        {navItems.slice(0, 2).map(item => (
          <SideNavItem key={item.path} $active={location.pathname === item.path} onClick={() => navigate(item.path)}>
            {item.icon} {item.label}
          </SideNavItem>
        ))}
        <SideNavFAB onClick={() => navigate('/missing')}>
          <IconMissing /> Faltantes
        </SideNavFAB>
        {navItems.slice(2).map(item => (
          <SideNavItem key={item.path} $active={location.pathname === item.path} onClick={() => navigate(item.path)}>
            {item.icon} {item.label}
          </SideNavItem>
        ))}
      </SideNav>

      {/* Header */}
      <Header>
        <h1>MyAlbum</h1>
        <HeaderActions>
          <ThemeToggle onClick={toggleTheme} title="Trocar tema">
            <ThemeDot $color="#f5c800" $active={themeName === 'yellow'} />
            <ThemeDot $color="#009cde" $active={themeName === 'blue'} />
          </ThemeToggle>
          <Avatar onClick={signOut} title="Sair">{initials}</Avatar>
        </HeaderActions>
      </Header>

      <Content>
        {/* Progress card */}
        <ProgressCard>
          <ProgressTitle>
            Faltam <span>{missingCount}</span> figurinhas
          </ProgressTitle>
          <ProgressBarWrapper>
            <ProgressBarTrack>
              <ProgressBarFill $pct={percentage} />
            </ProgressBarTrack>
          </ProgressBarWrapper>
          <ProgressMeta>
            <ProgressPct>↑{percentage}%</ProgressPct>
            <ProgressCount>{ownedCount}/{totalCount}</ProgressCount>
          </ProgressMeta>
        </ProgressCard>

        {/* Filters */}
        <FilterBar>
          <FilterPill $active={filterStatus === 'all'}     onClick={() => setFilterStatus('all')}>Todos</FilterPill>
          <FilterPill $active={filterStatus === 'owned'}   onClick={() => setFilterStatus('owned')}>Tenho</FilterPill>
          <FilterPill $active={filterStatus === 'missing'} onClick={() => setFilterStatus('missing')}>Faltam</FilterPill>
          <GroupSelect value={filterGroup} onChange={e => setFilterGroup(e.target.value as GroupLetter | 'all')}>
            <option value="all">Grupo ▾</option>
            {GROUPS.map(g => <option key={g} value={g}>Grupo {g}</option>)}
          </GroupSelect>
        </FilterBar>

        {loading ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '40px 0' }}>
            Carregando...
          </p>
        ) : (
          <>
            {/* Especiais — só aparecem quando filtro é "todos" ou "all group" */}
            {filterGroup === 'all' && filterStatus !== 'owned' && (
              <>
                <SectionLabel>✦ Cartas Especiais</SectionLabel>
                <CountryList style={{ marginBottom: 24 }}>
                  {SPECIAL_SECTIONS.map((section, idx) => {
                    const ids = getStickerIds(section.code, section.totalStickers)
                    const ownedCount = ids.filter(id => owned.has(id)).length
                    const pct = Math.round((ownedCount / ids.length) * 100)
                    const allDone = ownedCount === ids.length

                    return (
                      <SpecialCard
                        key={section.code}
                        $color={section.color}
                        style={{ animationDelay: `${idx * 0.04}s` }}
                        onClick={() => navigate(`/album/${section.code}`)}
                      >
                        {allDone && <CompleteBadge><IconCheck /></CompleteBadge>}
                        <SpecialColor $color={section.color} />
                        <SpecialInfo>
                          <SpecialName>{section.name}</SpecialName>
                          <CardProgressBarTrack>
                            <CardProgressBarFill $pct={pct} $color={section.color} />
                          </CardProgressBarTrack>
                        </SpecialInfo>
                        <ProgressCount style={{ marginLeft: 'auto', flexShrink: 0 }}>
                          {ownedCount}/{ids.length}
                        </ProgressCount>
                        <IconChevron />
                      </SpecialCard>
                    )
                  })}
                </CountryList>

                <SectionLabel>⚽ Seleções</SectionLabel>
              </>
            )}

            {/* Country list */}
            <CountryList>
              {filteredCountries.map((country, idx) => {
                const ids = getStickerIds(country.code, country.totalStickers)
                const countryOwned = ids.filter(id => owned.has(id)).length
                const pct = Math.round((countryOwned / ids.length) * 100)
                const allDone = countryOwned === ids.length

                return (
                  <CountryCard
                    key={country.code}
                    $color1={country.colors[0]}
                    $color2={country.colors[1]}
                    style={{ animationDelay: `${idx * 0.03}s` }}
                    onClick={() => navigate(`/album/${country.code}`)}
                  >
                    {allDone && <CompleteBadge><IconCheck /></CompleteBadge>}

                    <FlagCircle>
                      <img src={country.flagUrl} alt={country.name} loading="lazy" />
                    </FlagCircle>

                    <CardInfo>
                      <CountryName>{country.name}</CountryName>
                      <GroupBadge>Grupo {country.group}</GroupBadge>
                      <CardProgressBarTrack style={{ marginTop: 6 }}>
                        <CardProgressBarFill $pct={pct} $color={country.colors[0]} />
                      </CardProgressBarTrack>
                    </CardInfo>

                    <ProgressCount style={{ flexShrink: 0 }}>
                      {countryOwned}/{ids.length}
                    </ProgressCount>
                    <IconChevron />
                  </CountryCard>
                )
              })}
            </CountryList>
          </>
        )}
      </Content>

      {/* Bottom nav mobile */}
      <BottomNav>
        <NavItem $active={location.pathname === '/dashboard'} onClick={() => navigate('/dashboard')}><IconDashboard />Dashboard</NavItem>
        <NavItem $active={location.pathname === '/album'}     onClick={() => navigate('/album')}><IconAlbum />Album</NavItem>
        <NavFAB onClick={() => navigate('/missing')}>
          <FABCircle><IconMissing /></FABCircle>
          <span>Faltantes</span>
        </NavFAB>
        <NavItem $active={location.pathname === '/results'} onClick={() => navigate('/results')}><IconResults />Resultados</NavItem>
        <NavItem $active={location.pathname === '/profile'} onClick={() => navigate('/profile')}><IconProfile />Perfil</NavItem>
      </BottomNav>
    </Page>
  )
}