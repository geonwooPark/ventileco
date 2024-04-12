'use client'

import React from 'react'
import { toast } from 'react-toastify'
import Spinner from '@common/Spinner'
import useLikeQuery from '@/hooks/query/useLikeQuery'
import { IconHeart } from '../../../../../../public/svgs/icons'

interface LikeCounterProps {
  postingId: string
}

export default function LikeCounter({ postingId }: LikeCounterProps) {
  const { data, isPending, error } = useLikeQuery(postingId)

  if (error) {
    toast.error(error.message)
  }

  return (
    <div className="ml-2 flex items-center justify-center">
      <div className="size-3">
        <IconHeart />
      </div>
      <div className="ml-1">
        {isPending ? <Spinner width="w-3" height="w-3" /> : data?.likes}
      </div>
    </div>
  )
}
