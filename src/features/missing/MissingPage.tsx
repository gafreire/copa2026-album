import { useNavigate, useLocation } from 'react-router-dom'
import { COUNTRIES, SPECIAL_SECTIONS, getStickerIds } from '../../lib/constants'
import { useStickers } from '../../hooks/useStickers'
import { useThemeContext } from '../../contexts/ThemeContext'
import { useProfile } from '../../hooks/useProfile'
import { useAuth } from '../../hooks/useAuth'
import {
  BottomNav, NavItem, NavFAB, FABCircle,
  SideNav, SideNavLogo, SideNavItem, SideNavFAB,
  ThemeToggle, ThemeDot, Avatar,
} from '../album/AlbumPage.styles'
import {
  Page, Header, HeaderRight, ProgressPill, ProgressPillBar,
  ProgressPillFill, ProgressPillText, Content, SectionDivider,
  FlagCircle, SpecialDot, DividerName, DividerLine, Grid,
  StickerSlot, StickerCircle, StickerId, EmptyState,
} from './MissingPage.styles'

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

export function MissingPage() {
  const { themeName, toggleTheme } = useThemeContext()
  const { profile } = useProfile()
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
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

  const navItems = [
    { label: 'Dashboard',  icon: <IconDashboard />, path: '/dashboard' },
    { label: 'Album',      icon: <IconAlbum />,     path: '/album' },
    { label: 'Resultados', icon: <IconResults />,   path: '/results' },
    { label: 'Perfil',     icon: <IconProfile />,   path: '/profile' },
  ]

  return (
    <Page>
      <SideNav>
        <SideNavLogo>MyAlbum</SideNavLogo>
        {navItems.slice(0, 2).map(item => (
          <SideNavItem key={item.path} $active={location.pathname === item.path} onClick={() => navigate(item.path)}>
            {item.icon} {item.label}
          </SideNavItem>
        ))}
        <SideNavFAB onClick={() => navigate('/missing')}><IconMissing /> Faltantes</SideNavFAB>
        {navItems.slice(2).map(item => (
          <SideNavItem key={item.path} $active={location.pathname === item.path} onClick={() => navigate(item.path)}>
            {item.icon} {item.label}
          </SideNavItem>
        ))}
      </SideNav>

      <Header>
        <h1>Faltantes</h1>
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
      </Header>

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