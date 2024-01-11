import React from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import Section from '@common/Section'

interface CommentSectionProps {
  postingId: string
}
export default function CommentSection({ postingId }: CommentSectionProps) {
  return (
    <Section label="댓글" className="!pb-10">
      <CommentInput postingId={postingId} />
      <CommentList postingId={postingId} />
    </Section>
  )
}
