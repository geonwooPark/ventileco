import React from 'react'
import CommentItem from './CommentItem'
import { CommentUserType, ReplyCommentUserType } from '@/interfaces/interface'
import ReplyCommentItem from './ReplyCommentItem'

interface CommentListProps {
  postingId: string
  comments: CommentUserType[]
  replyComments: ReplyCommentUserType[]
}

export default function CommentList({
  postingId,
  comments,
  replyComments,
}: CommentListProps) {
  return (
    <ul>
      {comments?.map((comment) => (
        <>
          <CommentItem
            key={comment.commentId}
            postingId={postingId}
            comment={comment}
          />
          <ul>
            {replyComments
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
