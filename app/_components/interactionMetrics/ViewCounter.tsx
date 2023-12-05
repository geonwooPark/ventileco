'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import Spinner from '../common/Spinner'

interface ViewCounterProps {
  postingId: string
}

const fetchData = async (postingId: string) => {
  const result = await fetch(`/api/view-count?postingId=${postingId}`)
  return result.json()
}

export default function ViewCounter({ postingId }: ViewCounterProps) {
  const { data, isPending } = useQuery<number>({
    queryKey: ['viewCount', { postingId }],
    queryFn: () => fetchData(postingId),
  })

  return (
    <div className="flex justify-center items-center">
      <div>
        <AiFillEye />
      </div>
      <div className="ml-1">
        {isPending ? (
          <Spinner width="w-3" height="h-3" fillColor="fill-blue-600" />
        ) : (
          data
        )}
      </div>
    </div>
  )
}
