'use client'

import React, { useEffect } from 'react'
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

  useEffect(() => {
    const getFav = async () => {
      await fetch(`/api/favorite?${postingId}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === '200') {
            setIsFav(true)
          }
        })
    }
    getFav()
  }, [])

  return (
    <div
      className={`border px-1.5 py-1 rounded hover:opacity-70 transition cursor-pointer ${className}`}
      onClick={handleFavoriteBtn}
    >
      {isFav ? (
        <AiFillHeart size={30} className="text-rose-500" />
      ) : (
        <AiOutlineHeart size={30} />
      )}
    </div>
  )
}
