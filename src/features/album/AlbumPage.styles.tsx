import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 90px;

  @media (min-width: 768px) {
    padding-left: 240px;
    padding-bottom: 0;
  }
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.background}ee;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h1 {
    font-family: "Arial Black", sans-serif;
    font-style: italic;
    font-size: 1.4rem;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 4px 10px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ThemeDot = styled.span<{ $color: string; $active: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  opacity: ${({ $active }) => ($active ? 1 : 0.35)};
  transition: opacity 0.2s;
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Content = styled.div`
  padding: 16px 20px;
  max-width: 640px;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 800px;
    padding: 24px 32px;
  }
`;

export const ProgressCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 16px 18px;
  margin-bottom: 16px;
  animation: ${fadeUp} 0.4s ease both;
`;

export const ProgressTitle = styled.p`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 10px;
  letter-spacing: 0.3px;

  span {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 1rem;
    font-weight: 800;
  }
`;

export const ProgressBarWrapper = styled.div`
  position: relative;
  margin-bottom: 6px;
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  transition: width 0.6s ease;
`;

export const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

export const ProgressCount = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProgressPct = styled.span`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.4s ease 0.05s both;
`;

export const FilterPill = styled.button<{ $active?: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary + "22" : theme.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const GroupSelect = styled.select`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CountryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CountryCard = styled.div<{ $color1: string; $color2: string }>`
  background: linear-gradient(
    135deg,
    ${({ $color1 }) => $color1}70 0%,
    ${({ $color2 }) => $color2}50 50%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  border: 1px solid ${({ $color1 }) => $color1}80;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition:
    border-color 0.2s,
    transform 0.15s;

  &:hover {
    border-color: ${({ $color1 }) => $color1}99;
    transform: translateY(-1px);
  }
`;

export const FlagCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CountryName = styled.p`
  font-size: 0.9rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 2px;
  text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const GroupBadge = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.75);
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
`

export const StickerSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  flex-shrink: 0;
`;

export const StickerSlot = styled.button<{ $owned: boolean; $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1.5px solid
    ${({ $owned, $color, theme }) => ($owned ? $color : theme.colors.border)};
  background: ${({ $owned, $color }) =>
    $owned ? $color + "33" : "transparent"};
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: ${({ $owned, $color, theme }) =>
      $owned ? $color : theme.colors.border};
    transition: all 0.15s;
  }

  &:hover {
    border-color: ${({ $color }) => $color};
    transform: scale(1.1);
  }
`;

export const CompleteBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

export const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: ${({ theme }) => theme.colors.surface}ee;
  backdrop-filter: blur(16px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 8px;
  z-index: 20;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textMuted};
  transition: color 0.15s;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.3px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NavFAB = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  top: -12px;

  span {
    font-size: 0.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 0.3px;
  }
`;

export const FABCircle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}55;
  transition:
    transform 0.15s,
    box-shadow 0.15s;

  svg {
    width: 22px;
    height: 22px;
    color: #0a0a0a;
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 28px ${({ theme }) => theme.colors.primary}77;
  }
`;

export const SideNav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    background: ${({ theme }) => theme.colors.surface};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    padding: 24px 16px;
    z-index: 20;
    gap: 4px;
  }
`;

export const SideNavLogo = styled.div`
  font-family: "Arial Black", sans-serif;
  font-style: italic;
  font-size: 1.3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0 8px;
  margin-bottom: 28px;
`;

export const SideNavItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary + "22" : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  width: 100%;

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary}18;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SideNavFAB = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  width: 100%;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}44;

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const SectionLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 10px;
`;

export const SpecialCard = styled.div<{ $color: string }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.2s,
    transform 0.15s;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ $color }) => $color}15 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ $color }) => $color}88;
    transform: translateY(-1px);
  }
`;

export const SpecialColor = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ $color }) => $color}22;
  border: 1.5px solid ${({ $color }) => $color}55;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "✦";
    font-size: 18px;
    color: ${({ $color }) => $color};
  }
`;

export const SpecialInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SpecialName = styled.p`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 6px;
`;

export const CardProgressBarTrack = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
`;

export const CardProgressBarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: 999px;
  transition: width 0.5s ease;
`;
