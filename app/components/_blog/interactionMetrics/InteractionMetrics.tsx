import React from 'react'
import ViewCounter from './ViewCounter'
import LikeCounter from './LikeCounter'

interface InteractionMetricsProps {
  postingId: string
}

export default function InteractionMetrics({
  postingId,
}: InteractionMetricsProps) {
  return (
    <div className="my-container">
      <div className="absolute flex items-center text-xs text-gray-200 bottom-4">
        <ViewCounter postingId={postingId} />
        <LikeCounter postingId={postingId} />
      </div>
    </div>
  )
}
