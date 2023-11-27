'use client'

import React, { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { toast } from 'react-toastify'

interface FavCounterProps {
  postingId: string
}

export default function FavCounter({ postingId }: FavCounterProps) {
  const [favCount, setFavCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`/api/favorite-count?postingId=${postingId}`, {
          method: 'GET',
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch data')
            }
            return res.json()
          })
          .then((result) => {
            setFavCount(result)
          })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    }
    fetchData()
  }, [postingId])

  return (
    <div className="flex items-center ml-2">
      <div>
        <AiFillHeart />
      </div>
      <p className="ml-1">{favCount}</p>
    </div>
  )
}
