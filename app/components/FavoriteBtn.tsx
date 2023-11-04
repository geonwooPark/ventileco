'use client'

import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useFavorite from '../hooks/useFavorite'
import { UserType } from '../utils/getCurrentUser'

interface FavoriteBtn {
  className?: string
  postingId: string
  currentUser: UserType | null
}

export default function FavoriteBtn({
  className,
  currentUser,
  postingId,
}: FavoriteBtn) {
  const { isFav, setIsFav, handleFavoriteBtn } = useFavorite({
    postingId,
    currentUser,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getFav = async () => {
      if (!currentUser) return
      await fetch(`/api/favorite?postingId=${postingId}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((result) => {
          if (result === 1) {
            setIsFav(true)
          } else {
            setIsFav(false)
          }
        })
        .finally(() => setIsLoading(false))
    }
    getFav()
  }, [currentUser])

  return (
    <button
      className={`border px-1.5 py-1 rounded transition cursor-pointer hover:opacity-70 disabled:cursor-not-allowed
      ${className}`}
      onClick={handleFavoriteBtn}
      disabled={isLoading}
    >
      {isFav ? (
        <AiFillHeart size={30} className="text-rose-500" />
      ) : (
        <AiOutlineHeart size={30} />
      )}
    </button>
  )
}
