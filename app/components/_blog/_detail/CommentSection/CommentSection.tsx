import React from 'react'
import CommentInput from './CommentInput/CommentInput'
import CommentList from './CommentList'
import Section from '@common/Section'
import getAllComment from '@/actions/_blog/getAllComment'
import getQueryClient from '@/utils/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { commonKeys } from '@/constants/queryKey'

interface CommentSectionProps {
  postingId: string
}

export default async function CommentSection({
  postingId,
}: CommentSectionProps) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: commonKeys.comment(postingId),
    queryFn: () => getAllComment(postingId),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Section className="!pb-10">
      <HydrationBoundary state={dehydratedState}>
        <div className="rounded-md bg-white px-4 pt-4 text-brown-dark">
          <CommentInput postingId={postingId} />
          <CommentList postingId={postingId} />
        </div>
      </HydrationBoundary>
    </Section>
  )
}
