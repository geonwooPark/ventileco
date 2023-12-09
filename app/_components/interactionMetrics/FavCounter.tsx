'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import Spinner from '../common/Spinner'
import getData from '@/app/_actions/getData'
import { toast } from 'react-toastify'

interface FavCounterProps {
  postingId: string
}

export default function FavCounter({ postingId }: FavCounterProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ['favCount', { postingId }],
    queryFn: () =>
      getData<number>(`/api/favorite-count?postingId=${postingId}`),
  })

  if (error) {
    toast.error(error.message)
  }

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
