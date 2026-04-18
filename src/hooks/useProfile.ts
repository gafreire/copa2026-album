import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types'
import { useAuth } from './useAuth'

export function useProfile() {
  const { session } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
      return
    }

    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data, error }) => {
        if (!error) setProfile(data)
        setLoading(false)
      })
      
  }, [session])

  const updateProfile = async (updates: Partial<Pick<Profile, 'full_name'>>) => {
    if (!session?.user.id) return { error: new Error('Não autenticado') }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', session.user.id)
      .select()
      .single()

    if (!error) setProfile(data)
    return { error }
  }

  return { profile, loading, updateProfile }
}