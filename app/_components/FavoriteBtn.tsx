'use client'

import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useFavorite from '../_hooks/useFavorite'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

interface FavoriteBtn {
  className?: string
  postingId: string
}

export default function FavoriteBtn({ className, postingId }: FavoriteBtn) {
  const { data: session } = useSession()
  const { isFav, setIsFav, handleFavoriteBtn } = useFavorite({
    postingId,
    session,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getFav = async () => {
      if (!session) return

      try {
        await fetch(`/api/favorite?postingId=${postingId}`, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.status === 201) {
              setIsFav(true)
            } else if (result.error) {
              throw new Error(result.error)
            }
          })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    getFav()
  }, [session])

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
