import React from 'react'
import ViewCounter from './ViewCounter'
import LikeCounter from './LikeCounter'
import Container from '@common/Container'

interface InteractionMetricsProps {
  postingId: string
}

export default function InteractionMetrics({
  postingId,
}: InteractionMetricsProps) {
  return (
    <Container>
      <div className="absolute bottom-4 flex items-center text-xs text-gray-200">
        <ViewCounter postingId={postingId} />
        <LikeCounter postingId={postingId} />
      </div>
    </Container>
  )
}
