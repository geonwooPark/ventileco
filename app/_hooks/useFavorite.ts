import { Session } from 'next-auth'
import React, { useState } from 'react'

interface UseFavoriteType {
  postingId: string
  session: Session | null
}

export default function useFavorite({ postingId, session }: UseFavoriteType) {
  const [isFav, setIsFav] = useState(false)

  const handleFavoriteBtn = async () => {
    if (!session) return

    if (isFav) {
      await fetch('/api/favorite', {
        method: 'DELETE',
        body: JSON.stringify({
          postingId: postingId,
          userId: session.user.id,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        setIsFav(false)
      })
    } else {
      await fetch('/api/favorite', {
        method: 'POST',
        body: JSON.stringify({
          postingId: postingId,
          userId: session.user.id,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        setIsFav(true)
      })
    }
  }
  return { isFav, setIsFav, handleFavoriteBtn }
}
