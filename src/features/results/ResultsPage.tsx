import { AppNav } from '../../components/AppNav'
import { Ball, ComingSoonBadge, Content, Page, Sub, Title } from './ResultsPage.styles'


export function ResultsPage() {
  return (
    <Page>
      <AppNav title="Resultados" />

      <Content>
        <Ball>⚽</Ball>

        <div style={{ textAlign: 'center' }}>
          <ComingSoonBadge>Em breve</ComingSoonBadge>
        </div>

        <Title>Resultados da Copa 2026</Title>

        <Sub>
          Acompanhe os jogos em tempo real assim que o torneio começar.
        </Sub>

      </Content>
    </Page>
  )
}