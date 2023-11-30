'use client'

import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { toast } from 'react-toastify'

interface ViewCounterProps {
  postingId: string
}

export default function ViewCounter({ postingId }: ViewCounterProps) {
  const [viewCount, setViewCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_FE_URL}/api/view-count?postingId=${postingId}`,
          {
            method: 'GET',
          },
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch data')
            }
            return res.json()
          })
          .then((result) => {
            setViewCount(result)
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
  }, [postingId])

  return (
    <div className="flex items-center">
      <div>
        <AiFillEye />
      </div>
      <p className="ml-1">{isLoading ? '-' : viewCount}</p>
    </div>
  )
}
