'use client'

import React from 'react'
import CommentItem from './CommentItem'
import { CommentUserType, UserType } from '@/app/interfaces/interface'
import DeleteCommentModal from '../modals/DeleteCommentModal'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import useDeleteCommentModal from '@/app/hooks/useDeleteCommentModal'
import useSelectedComment from '@/app/hooks/useSelectedComment'
import CommentInput from './CommentInput'

interface CommentProps {
  comments: CommentUserType[] | null
  currentUser: UserType
}

export default function Comment({ comments, currentUser }: CommentProps) {
  const router = useRouter()
  const params = useParams()
  const { id: postingId } = params
  const deleteCommentModal = useDeleteCommentModal()
  const selectedComment = useSelectedComment()

  const onSubmit = async () => {
    if (!currentUser) return
    try {
      await fetch('/api/comment', {
        method: 'DELETE',
        body: JSON.stringify({
          postingId: postingId,
          commentId: selectedComment.commentId,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            deleteCommentModal.onClose()
            router.refresh()
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="text-sm">
      <div className="absolute top-0 left-0">
        <DeleteCommentModal onSubmit={onSubmit} />
      </div>
      <h1 className="md:text-lg mb-4">댓글</h1>
      <CommentInput
        type="post"
        currentUser={currentUser}
        buttonLabel="댓글 작성"
      />
      <div>
        {comments?.map((comment) => {
          return (
            <CommentItem
              key={comment.commentId}
              comment={comment}
              currentUser={currentUser}
            />
          )
        })}
      </div>
    </div>
  )
}
