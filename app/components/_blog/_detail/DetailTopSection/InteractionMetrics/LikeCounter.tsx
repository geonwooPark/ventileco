'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import getData from '@/app/actions/getData'
import { toast } from 'react-toastify'
import Spinner from '@/app/components/common/Spinner'

interface LikeCounterProps {
  postingId: string
}

export default function LikeCounter({ postingId }: LikeCounterProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ['likeCount', { postingId }],
    queryFn: () =>
      getData<number>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/like-count?postingId=${postingId}`,
      ),
    staleTime: 1000 * 60 * 3, // 3분
    gcTime: 1000 * 60 * 5, // 5분
  })

  if (error) {
    toast.error(error.message)
  }

  return (
    <div className="ml-2 flex items-center justify-center">
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
