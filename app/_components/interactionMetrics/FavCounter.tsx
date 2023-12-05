'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import Spinner from '../common/Spinner'

interface FavCounterProps {
  postingId: string
}

const fetchData = async (postingId: string) => {
  const result = await fetch(`/api/favorite-count?postingId=${postingId}`)
  return result.json()
}

export default function FavCounter({ postingId }: FavCounterProps) {
  const { data, isPending } = useQuery<number>({
    queryKey: ['favCount', { postingId }],
    queryFn: () => fetchData(postingId),
  })

  return (
    <div className="flex justify-center items-center ml-2">
      <div>
        <AiFillHeart />
      </div>
      <div className="ml-1">
        {isPending ? (
          <Spinner width="w-3" height="w-3" fillColor="fill-blue-600" />
        ) : (
          data
        )}
      </div>
    </div>
  )
}
