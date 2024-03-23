import React from 'react'
import CommentInput from './CommentInput/CommentInput'
import CommentList from './CommentList'
import Section from '@common/Section'
import getAllComment from '@/actions/_blog/getAllComment'
import getQueryClient from '@/utils/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { detailKeys } from '@/constants/queryKey'

interface CommentSectionProps {
  postingId: string
}

export default async function CommentSection({
  postingId,
}: CommentSectionProps) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: detailKeys.comment(postingId),
    queryFn: () => getAllComment(postingId),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Section label="댓글" className="!pb-10">
      <HydrationBoundary state={dehydratedState}>
        <CommentInput postingId={postingId} />
        <CommentList postingId={postingId} />
      </HydrationBoundary>
    </Section>
  )
}
