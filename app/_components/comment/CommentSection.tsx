import React from 'react'
import CommentInput from './CommentInput'
import Comments from './Comments'
import getComments from '@/app/_actions/getComments'

export const revalidate = 0

interface CommentSectionProps {
  postingId: string
}

export default async function CommentSection({
  postingId,
}: CommentSectionProps) {
  const comments = await getComments(postingId)
  return (
    <div>
      <h1 className="md:text-lg mb-4">댓글</h1>
      <CommentInput postingId={postingId} />
      <Comments postingId={postingId} comments={comments} />
    </div>
  )
}
