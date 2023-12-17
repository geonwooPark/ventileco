'use client'

import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { toast } from 'react-toastify'
import Spinner from '@/app/components/common/Spinner'
import useLikeCountQuery from '@/app/hooks/query/useLikeCountQuery'

interface LikeCounterProps {
  postingId: string
}

export default function LikeCounter({ postingId }: LikeCounterProps) {
  const { likeCount, isPending, error } = useLikeCountQuery(postingId)

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
          likeCount
        )}
      </div>
    </div>
  )
}
