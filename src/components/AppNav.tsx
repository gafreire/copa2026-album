import { useLocation, useNavigate } from 'react-router-dom'
import { useThemeContext } from '../contexts/ThemeContext'
import { useProfile } from '../hooks/useProfile'
import { useAuth } from '../hooks/useAuth'
import {
  BottomNav, NavItem, NavFAB, FABCircle,
  SideNav, SideNavLogo, SideNavItem, SideNavFAB,
  ThemeToggle, ThemeDot, Avatar, Header, HeaderActions,
} from '../features/album/AlbumPage.styles'
import {
  IconDashboard, IconAlbum, IconMissing, IconResults, IconProfile,
} from './icons'

type AppNavProps = {
  title?: string
  headerRight?: React.ReactNode
}

const NAV_ITEMS = [
  { label: 'Dashboard',  icon: <IconDashboard />, path: '/dashboard' },
  { label: 'Album',      icon: <IconAlbum />,     path: '/album' },
  { label: 'Resultados', icon: <IconResults />,   path: '/results' },
  { label: 'Perfil',     icon: <IconProfile />,   path: '/profile' },
]

export function AppNav({ title = 'MyAlbum', headerRight }: AppNavProps) {
  const { themeName, toggleTheme } = useThemeContext()
  const { profile } = useProfile()
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const defaultHeaderRight = (
    <HeaderActions>
      <ThemeToggle onClick={toggleTheme} title="Trocar tema">
        <ThemeDot $color="#f5c800" $active={themeName === 'yellow'} />
        <ThemeDot $color="#009cde" $active={themeName === 'blue'} />
      </ThemeToggle>
      <Avatar onClick={signOut} title="Sair">{initials}</Avatar>
    </HeaderActions>
  )

  return (
    <>
      {/* Sidebar desktop */}
      <SideNav>
        <SideNavLogo>MyAlbum</SideNavLogo>
        {NAV_ITEMS.slice(0, 2).map(item => (
          <SideNavItem
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            {item.icon} {item.label}
          </SideNavItem>
        ))}
        <SideNavFAB onClick={() => navigate('/missing')}>
          <IconMissing /> Faltantes
        </SideNavFAB>
        {NAV_ITEMS.slice(2).map(item => (
          <SideNavItem
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            {item.icon} {item.label}
          </SideNavItem>
        ))}
      </SideNav>

      {/* Header */}
      <Header>
        <h1>{title}</h1>
        {headerRight ?? defaultHeaderRight}
      </Header>

      {/* Bottom nav mobile */}
      <BottomNav>
        <NavItem $active={location.pathname === '/dashboard'} onClick={() => navigate('/dashboard')}>
          <IconDashboard />Dashboard
        </NavItem>
        <NavItem $active={location.pathname === '/album'} onClick={() => navigate('/album')}>
          <IconAlbum />Album
        </NavItem>
        <NavFAB onClick={() => navigate('/missing')}>
          <FABCircle><IconMissing /></FABCircle>
          <span>Faltantes</span>
        </NavFAB>
        <NavItem $active={location.pathname === '/results'} onClick={() => navigate('/results')}>
          <IconResults />Resultados
        </NavItem>
        <NavItem $active={location.pathname === '/profile'} onClick={() => navigate('/profile')}>
          <IconProfile />Perfil
        </NavItem>
      </BottomNav>
    </>
  )
}