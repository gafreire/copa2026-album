/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from './useAuth'
import { supabase } from '../lib/supabase'
import { ALL_STICKER_IDS } from '../lib/constants'

export function useStickers() {
  const { session } = useAuth()
  const [owned, setOwned] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user.id) return

    supabase
      .from('stickers')
      .select('sticker_id')
      .eq('user_id', session.user.id)
      .then(({ data }) => {
        if (data) setOwned(new Set(data.map(r => r.sticker_id)))
        setLoading(false)
      })
  }, [session])

  const toggle = useCallback(async (stickerId: string) => {
    if (!session?.user.id) return
    const isOwned = owned.has(stickerId)

    // 1. Atualiza o estado local imediatamente — sem esperar o Supabase
    setOwned(prev => {
      const next = new Set(prev)
      isOwned ? next.delete(stickerId) : next.add(stickerId)
      return next
    })

    // 2. Sincroniza com o Supabase em background — sem await no caller
    if (isOwned) {
      supabase
        .from('stickers')
        .delete()
        .eq('user_id', session.user.id)
        .eq('sticker_id', stickerId)
        .then(({ error }) => {
          if (error) {
            // Reverte se falhou
            setOwned(prev => {
              const next = new Set(prev)
              next.add(stickerId)
              return next
            })
          }
        })
    } else {
      supabase
        .from('stickers')
        .insert({ user_id: session.user.id, sticker_id: stickerId })
        .then(({ error }) => {
          if (error) {
            // Reverte se falhou
            setOwned(prev => {
              const next = new Set(prev)
              next.delete(stickerId)
              return next
            })
          }
        })
    }
  }, [session, owned])

  const ownedCount = owned.size
  const totalCount = ALL_STICKER_IDS.length
  const missingCount = totalCount - ownedCount
  const percentage = totalCount > 0 ? Math.round((ownedCount / totalCount) * 100) : 0

  return { owned, loading, toggle, ownedCount, totalCount, missingCount, percentage }
}