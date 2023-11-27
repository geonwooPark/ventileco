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
    const fetchData = async () => {
      if (!session) return

      try {
        await fetch(`/api/favorite?postingId=${postingId}`, {
          method: 'GET',
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch data')
            }
            return res.json()
          })
          .then((result) => {
            setIsFav(result.isFav)
          })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
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
