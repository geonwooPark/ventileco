'use client'

import React from 'react'
import { toast } from 'react-toastify'
import CommentItem from './CommentItem'
import SkeletonCommentList from './SkeletonCommentList'
import { useSession } from 'next-auth/react'
import useCommentListQuery from '@/app/hooks/query/useCommentListQuery'

interface CommentListProps {
  postingId: string
}

export default function CommentList({ postingId }: CommentListProps) {
  const { data: session } = useSession()
  const { comments, isPending, error } = useCommentListQuery(postingId)

  if (error) {
    toast.error(error.message)
  }
  if (isPending) return <SkeletonCommentList />

  return (
    <ul>
      {comments?.map((comment) => {
        return (
          <CommentItem
            key={comment.commentId}
            session={session}
            postingId={postingId}
            comment={comment}
          />
        )
      })}
    </ul>
  )
}
