'use client'

import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import { toast } from 'react-toastify'
import Spinner from '@common/Spinner'
import useViewQuery from '@/hooks/query/useViewQuery'

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
      <div>
        <AiFillEye />
      </div>
      <div className="ml-1">
        {isPending ? (
          <Spinner width="w-3" height="h-3" fillColor="fill-blue-600" />
        ) : (
          views
        )}
      </div>
    </div>
  )
}
