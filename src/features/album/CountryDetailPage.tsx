import { useParams, useNavigate } from 'react-router-dom'
import { COUNTRIES, SPECIAL_SECTIONS, getStickerIds } from '../../lib/constants'
import { useStickers } from '../../hooks/useStickers'
import { AppNav } from '../../components/AppNav'
import { IconBack, IconCheck } from '../../components/icons'
import { BackButton, Content, DetailHeader, FlagCircle, Grid, HeaderContent, HeaderInfo, HeaderRow, Page, ProgressBarFill, ProgressBarTrack, ProgressText, SelectAllBtn, SelectAllRow, SpecialIcon, StickerCheck, StickerId, StickerSlot, Subtitle, Title } from './CountryDetailPage.styles'

export function CountryDetailPage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const { owned, toggle } = useStickers()

  const country = COUNTRIES.find(c => c.code === code)
  const special = SPECIAL_SECTIONS.find(s => s.code === code)
  const entity = country ?? special

  if (!entity) return <Page><p style={{ padding: 20, color: 'white' }}>Não encontrado.</p></Page>

  const color1 = country ? country.colors[0] : special!.colors[0]
  const color2 = country ? country.colors[1] : special!.colors[1]
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
      <AppNav />
      <DetailHeader $color1={color1} $color2={color2}>
        <BackButton onClick={() => navigate('/album')}>
          <IconBack /> Voltar ao álbum
        </BackButton>
        <HeaderContent>
          {country ? (
            <FlagCircle><img src={country.flagUrl} alt={country.name} /></FlagCircle>
          ) : (
            <SpecialIcon $color={special!.colors[0]}>✦</SpecialIcon>
          )}
          <HeaderInfo>
            <HeaderRow>
              <Title>{entity.name}</Title>
              <ProgressText>{ownedCount}/{ids.length}</ProgressText>
            </HeaderRow>
            <Subtitle>{country ? `Grupo ${country.group}` : 'Cartas Especiais'}</Subtitle>
            <ProgressBarTrack>
              <ProgressBarFill $pct={pct} $color={color1} />
            </ProgressBarTrack>
          </HeaderInfo>
        </HeaderContent>
      </DetailHeader>

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
            >
              <StickerCheck $owned={owned.has(id)} $color={color1}>
                <IconCheck stroke="white" width={12} height={12} />
              </StickerCheck>
              <StickerId $owned={owned.has(id)} $color={color1}>{id}</StickerId>
            </StickerSlot>
          ))}
        </Grid>
      </Content>
    </Page>
  )
}