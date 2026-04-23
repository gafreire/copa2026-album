import { useParams, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { COUNTRIES, SPECIAL_SECTIONS, getStickerIds } from '../../lib/constants'
import { useStickers } from '../../hooks/useStickers'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 40px;

  @media (min-width: 768px) {
    padding-left: 240px;
  }
`

const Header = styled.div<{ $color1: string; $color2: string }>`
  padding: 12px 16px 14px;
  background: linear-gradient(
    135deg,
    ${({ $color1 }) => $color1}30 0%,
    ${({ $color2 }) => $color2}18 100%
  );
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.6);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 0;
  transition: color 0.15s;

  &:hover { color: #fff; }
  svg { width: 14px; height: 14px; }
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const FlagCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  border: 1.5px solid rgba(255,255,255,0.15);
  flex-shrink: 0;

  img { width: 100%; height: 100%; object-fit: cover; }
`

const SpecialIcon = styled.div<{ $color: string }>`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${({ $color }) => $color}22;
  border: 1.5px solid ${({ $color }) => $color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`

const HeaderInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 2px;
`

const Title = styled.h1`
  font-size: 1.05rem;
  font-weight: 800;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProgressText = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
  white-space: nowrap;
  flex-shrink: 0;
`

const Subtitle = styled.p`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin-bottom: 8px;
`

const ProgressBarTrack = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(255,255,255,0.15);
  border-radius: 999px;
  overflow: hidden;
`

const ProgressBarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: 999px;
  transition: width 0.6s ease;
`

const Content = styled.div`
  padding: 12px 14px;
  max-width: 640px;
  margin: 0 auto;
`

const SelectAllRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`

const SelectAllBtn = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 8px;
`

const StickerSlot = styled.button<{ $owned: boolean; $color1: string; $color2: string }>`
  aspect-ratio: 3/4;
  border-radius: 8px;
  border: 1.5px solid ${({ $owned, $color1, theme }) => $owned ? $color1 : theme.colors.border};
  background: ${({ $owned, $color1, $color2 }) =>
    $owned
      ? `linear-gradient(135deg, ${$color1}40 0%, ${$color2}25 100%)`
      : 'transparent'
  };
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.15s;
  animation: ${fadeUp} 0.3s ease both;

  &:hover {
    border-color: ${({ $color1 }) => $color1};
    transform: scale(1.05);
  }
`

const StickerCheck = styled.div<{ $owned: boolean; $color: string }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid ${({ $owned, $color, theme }) => $owned ? $color : theme.colors.border};
  background: ${({ $owned, $color }) => $owned ? $color : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  svg { opacity: ${({ $owned }) => $owned ? 1 : 0}; }
`

const StickerId = styled.span<{ $owned: boolean; $color: string }>`
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: ${({ $owned, $color }) => $owned ? $color : 'rgba(255,255,255,0.4)'};
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  transition: color 0.15s;
`

const IconBack = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export function CountryDetailPage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const { owned, toggle } = useStickers()

  const country = COUNTRIES.find(c => c.code === code)
  const special = SPECIAL_SECTIONS.find(s => s.code === code)
  const entity = country ?? special

  if (!entity) return (
    <Page><p style={{ padding: 20, color: 'white' }}>Não encontrado.</p></Page>
  )

  const color1 = country ? country.colors[0] : special!.color
  const color2 = country ? country.colors[1] : special!.color + '88'

  const ids = getStickerIds(entity.code, entity.totalStickers)
  const ownedCount = ids.filter(id => owned.has(id)).length
  const pct = Math.round((ownedCount / ids.length) * 100)
  const allOwned = ids.every(id => owned.has(id))

  const handleToggleAll = () => {
    ids.forEach(id => {
      if (allOwned ? owned.has(id) : !owned.has(id)) toggle(id)
    })
  }

  return (
    <Page>
      <Header $color1={color1} $color2={color2}>
        <BackButton onClick={() => navigate('/album')}>
          <IconBack /> Voltar ao álbum
        </BackButton>

        <HeaderContent>
          {country ? (
            <FlagCircle>
              <img src={country.flagUrl} alt={country.name} />
            </FlagCircle>
          ) : (
            <SpecialIcon $color={special!.color}>✦</SpecialIcon>
          )}

          <HeaderInfo>
            <HeaderRow>
              <Title>{entity.name}</Title>
              <ProgressText>{ownedCount}/{ids.length}</ProgressText>
            </HeaderRow>
            <Subtitle>
              {country ? `Grupo ${country.group}` : 'Cartas Especiais'}
            </Subtitle>
            <ProgressBarTrack>
              <ProgressBarFill $pct={pct} $color={color1} />
            </ProgressBarTrack>
          </HeaderInfo>
        </HeaderContent>
      </Header>

      <Content>
        <SelectAllRow>
          <SelectAllBtn onClick={handleToggleAll}>
            {allOwned ? 'Desmarcar todas' : 'Marcar todas'}
          </SelectAllBtn>
        </SelectAllRow>

        <Grid>
          {ids.map((id, idx) => (
            <StickerSlot
              key={id}
              $owned={owned.has(id)}
              $color1={color1}
              $color2={color2}
              onClick={() => toggle(id)}
              style={{ animationDelay: `${idx * 0.015}s` }}
              title={id}
            >
              <StickerCheck $owned={owned.has(id)} $color={color1}>
                <IconCheck />
              </StickerCheck>
              <StickerId $owned={owned.has(id)} $color={color1}>{id}</StickerId>
            </StickerSlot>
          ))}
        </Grid>
      </Content>
    </Page>
  )
}