import React from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

interface CommentSectionProps {
  postingId: string
}
export default function Comment({ postingId }: CommentSectionProps) {
  return (
    <div>
      <CommentInput postingId={postingId} />
      <CommentList postingId={postingId} />
    </div>
  )
}
