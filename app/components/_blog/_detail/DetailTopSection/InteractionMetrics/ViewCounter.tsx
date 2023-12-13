'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import getData from '@/app/actions/getData'
import { toast } from 'react-toastify'
import Spinner from '@/app/components/common/Spinner'

interface ViewCounterProps {
  postingId: string
}

export default function ViewCounter({ postingId }: ViewCounterProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ['viewCount', { postingId }],
    queryFn: () =>
      getData<number>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/view-count?postingId=${postingId}`,
      ),
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
