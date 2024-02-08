'use client'

import React from 'react'
import CommentItem from './CommentItem'
import ReplyCommentItem from './ReplyCommentItem'
import useCommentListQuery from '@/hooks/query/useCommentListQuery'

interface CommentListProps {
  postingId: string
}

export default function CommentList({ postingId }: CommentListProps) {
  const { allComment } = useCommentListQuery(postingId)
  if (!allComment) return

  return (
    <ul>
      {allComment?.comments.map((comment) => (
        <>
          <CommentItem
            key={comment.commentId}
            postingId={postingId}
            comment={comment}
          />
          <ul>
            {allComment.replyComments
              .filter((r) => r.commentId === comment.commentId)
              .map((replyComment) => (
                <ReplyCommentItem
                  key={replyComment.replyCommentId}
                  postingId={postingId}
                  replyComment={replyComment}
                />
              ))}
          </ul>
        </>
      ))}
    </ul>
  )
}
