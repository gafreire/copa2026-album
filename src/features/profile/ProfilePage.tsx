import { useState } from 'react'
import { AppNav } from '../../components/AppNav'
import { useProfile } from '../../hooks/useProfile'
import { useAuth } from '../../hooks/useAuth'
import { useStickers } from '../../hooks/useStickers'
import { AvatarBlock, BigAvatar, Card, Content, Divider, FeedbackMsg, FieldGroup, Input, Label, Page, SaveButton, SectionLabel, SignOutButton, StatItem, StatLabel, StatsGrid, StatValue, UserEmail, UserName } from './ProfilePage.styles'


export function ProfilePage() {
  const { profile, loading: profileLoading, updateProfile } = useProfile()
  const { signOut, session } = useAuth()
  const { ownedCount, totalCount, missingCount, percentage } = useStickers()

  const [name, setName] = useState(profile?.full_name ?? '')
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null)

  // Sincroniza o input quando o profile carrega
  if (!profileLoading && name === '' && profile?.full_name) {
    setName(profile.full_name)
  }

  const initials = (profile?.full_name ?? session?.user.email ?? '?')
    .split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    setFeedback(null)
    const { error } = await updateProfile({ full_name: name.trim() })
    setSaving(false)
    setFeedback(error
      ? { ok: false, msg: 'Erro ao salvar. Tente novamente.' }
      : { ok: true, msg: 'Nome atualizado com sucesso!' }
    )
  }

  return (
    <Page>
      <AppNav title="Perfil" />

      <Content>
        <AvatarBlock>
          <BigAvatar>{initials}</BigAvatar>
          <div style={{ textAlign: 'center' }}>
            <UserName>{profile?.full_name ?? '—'}</UserName>
            <UserEmail>{session?.user.email}</UserEmail>
          </div>
        </AvatarBlock>

        {/* Stats do álbum */}
        <SectionLabel>Meu álbum</SectionLabel>
        <Card>
          <StatsGrid>
            <StatItem>
              <StatValue>{ownedCount}</StatValue>
              <StatLabel>Tenho</StatLabel>
            </StatItem>
            <Divider />
            <StatItem>
              <StatValue>{missingCount}</StatValue>
              <StatLabel>Faltam</StatLabel>
            </StatItem>
            <Divider />
            <StatItem>
              <StatValue>{percentage}%</StatValue>
              <StatLabel>Completo</StatLabel>
            </StatItem>
          </StatsGrid>

          <div style={{ marginTop: 16, width: '100%', height: 3, background: 'var(--border, #254d2a)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${percentage}%`, borderRadius: 999, background: 'currentColor', transition: 'width 0.6s ease' }} />
          </div>

          <p style={{ fontSize: '0.68rem', textAlign: 'right', marginTop: 4, opacity: 0.5, fontWeight: 700 }}>
            {ownedCount}/{totalCount} figurinhas
          </p>
        </Card>

        {/* Editar nome */}
        <SectionLabel>Informações</SectionLabel>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FieldGroup>
            <Label>Nome</Label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome"
              disabled={profileLoading}
            />
          </FieldGroup>
          <FieldGroup>
            <Label>Email</Label>
            <Input
              value={session?.user.email ?? ''}
              disabled
            />
          </FieldGroup>

          {feedback && <FeedbackMsg $ok={feedback.ok}>{feedback.msg}</FeedbackMsg>}

          <SaveButton onClick={handleSave} disabled={saving} $loading={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </SaveButton>
        </Card>

        {/* Sair */}
        <SignOutButton onClick={signOut}>Sair da conta</SignOutButton>
      </Content>
    </Page>
  )
}