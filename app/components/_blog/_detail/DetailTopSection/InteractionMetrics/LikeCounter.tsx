'use client'

import React from 'react'
import Spinner from '@common/Spinner'
import useLikeQuery from '@/hooks/query/useLikeQuery'
import { IconHeart } from '../../../../../../public/svgs/icons'
import { useAlert } from '@/hooks/useAlert'

interface LikeCounterProps {
  postingId: string
}

export default function LikeCounter({ postingId }: LikeCounterProps) {
  const alert = useAlert()
  const { data, isPending, error } = useLikeQuery(postingId)

  if (error) {
    alert.error(error.message)
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
