'use client'

import React from 'react'
import { toast } from 'react-toastify'
import Spinner from '@common/Spinner'
import useViewQuery from '@/hooks/query/useViewQuery'
import { IconEye } from '../../../../../../public/svgs/icons'

interface ViewCounterProps {
  postingId: string
}

export default function ViewCounter({ postingId }: ViewCounterProps) {
  const { views, isPending, error } = useViewQuery(postingId)

  if (error) {
    toast.error(error.message)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="size-3">
        <IconEye />
      </div>
      <div className="ml-1">
        {isPending ? <Spinner width="w-3" height="h-3" /> : views}
      </div>
    </div>
  )
}
