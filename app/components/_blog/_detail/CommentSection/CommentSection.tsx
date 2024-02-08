import React from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import Section from '@common/Section'
import getAllComment from '@/actions/getAllComment'

interface CommentSectionProps {
  postingId: string
}

export default async function CommentSection({
  postingId,
}: CommentSectionProps) {
  const { comments, replyComments } = await getAllComment(postingId)

  return (
    <Section label="댓글" className="!pb-10">
      <CommentInput postingId={postingId} />
      {comments && (
        <CommentList
          postingId={postingId}
          comments={comments}
          replyComments={replyComments}
        />
      )}
    </Section>
  )
}
