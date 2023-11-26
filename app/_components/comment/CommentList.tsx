import React from 'react'
import CommentItem from './CommentItem'
import { CommentUserType } from '@/app/_interfaces/interface'
import { Session } from 'next-auth'
import SkeletonCommentList from './SkeletonCommentList'

interface CommentProps {
  postingId: string
  comments: CommentUserType[] | undefined
  setComments: React.Dispatch<
    React.SetStateAction<CommentUserType[] | undefined>
  >
  session: Session | null
  isLoading: boolean
}

export default function CommentList({
  postingId,
  comments,
  setComments,
  session,
  isLoading,
}: CommentProps) {
  if (isLoading) return <SkeletonCommentList />

  return (
    <ul>
      {comments?.map((comment) => {
        return (
          <CommentItem
            key={comment.commentId}
            postingId={postingId}
            comment={comment}
            session={session}
            setComments={setComments}
          />
        )
      })}
    </ul>
  )
}
