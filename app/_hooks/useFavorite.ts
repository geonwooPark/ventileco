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
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsFav(false)
          } else {
            throw new Error(result.error)
          }
        })
    } else {
      await fetch('/api/favorite', {
        method: 'POST',
        body: JSON.stringify({
          postingId: postingId,
          userId: session.user.id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsFav(true)
          } else {
            throw new Error(result.error)
          }
        })
    }
  }
  return { isFav, setIsFav, handleFavoriteBtn }
}
