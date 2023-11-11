import React, { useState } from 'react'
import { UserType } from '../actions/getCurrentUser'

interface UseFavorite {
  postingId: string
  currentUser: UserType | null
}

export default function useFavorite({ postingId, currentUser }: UseFavorite) {
  const [isFav, setIsFav] = useState(false)

  const handleFavoriteBtn = async () => {
    if (!currentUser) return

    if (isFav) {
      await fetch('/api/favorite', {
        method: 'DELETE',
        body: JSON.stringify({
          postingId: postingId,
          userId: currentUser._id,
        }),
      }).then(() => setIsFav(false))
    } else {
      await fetch('/api/favorite', {
        method: 'POST',
        body: JSON.stringify({
          postingId: postingId,
          userId: currentUser._id,
        }),
      }).then(() => setIsFav(true))
    }
  }
  return { isFav, setIsFav, handleFavoriteBtn }
}
