'use client'

import React from 'react'
import CommentItem from './CommentItem/CommentItem'
import ReplyCommentItem from './ReplyCommentItem/ReplyCommentItem'
import useCommentListQuery from '@/hooks/query/useCommentListQuery'

interface CommentListProps {
  postingId: string
}

export default function CommentList({ postingId }: CommentListProps) {
  const { allComment } = useCommentListQuery(postingId)
  if (!allComment) return

  return (
    <div>
      {allComment?.comments.map((comment) => (
        <div key={comment.commentId}>
          <CommentItem postingId={postingId} comment={comment} />
          <div>
            {allComment.replyComments
              .filter((r) => r.commentId === comment.commentId)
              .map((replyComment) => (
                <ReplyCommentItem
                  key={replyComment.replyCommentId}
                  postingId={postingId}
                  replyComment={replyComment}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
