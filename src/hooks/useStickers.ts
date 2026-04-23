import { useEffect, useState } from 'react'
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

  const toggle = async (stickerId: string) => {
    if (!session?.user.id) return
    const isOwned = owned.has(stickerId)

    setOwned(prev => {
      const next = new Set(prev)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isOwned ? next.delete(stickerId) : next.add(stickerId)
      return next
    })

    if (isOwned) {
      await supabase
        .from('stickers')
        .delete()
        .eq('user_id', session.user.id)
        .eq('sticker_id', stickerId)
    } else {
      await supabase
        .from('stickers')
        .insert({ user_id: session.user.id, sticker_id: stickerId })
    }
  }

  const ownedCount = owned.size
  const totalCount = ALL_STICKER_IDS.length
  const missingCount = totalCount - ownedCount
  const percentage = totalCount > 0 ? Math.round((ownedCount / totalCount) * 100) : 0

  return { owned, loading, toggle, ownedCount, totalCount, missingCount, percentage }
}