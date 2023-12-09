'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import Spinner from '../common/Spinner'
import getData from '@/app/_actions/getData'
import { toast } from 'react-toastify'

interface ViewCounterProps {
  postingId: string
}

export default function ViewCounter({ postingId }: ViewCounterProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ['viewCount', { postingId }],
    queryFn: () => getData<number>(`/api/view-count?postingId=${postingId}`),
  })

  if (error) {
    toast.error(error.message)
  }

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
