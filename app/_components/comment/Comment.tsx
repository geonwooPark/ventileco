'use client'

import React from 'react'
import CommentItem from './CommentItem'
import { CommentUserType } from '@/app/_interfaces/interface'
import DeleteCommentModal from '../modals/DeleteCommentModal'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import useDeleteCommentModal from '@/app/_hooks/useDeleteCommentModal'
import useSelectedComment from '@/app/_hooks/useSelectedComment'
import CommentInput from './CommentInput'
import { useSession } from 'next-auth/react'

interface CommentProps {
  comments: CommentUserType[] | null
  postingId: string
}

export default function Comment({ comments, postingId }: CommentProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const deleteCommentModal = useDeleteCommentModal()
  const selectedComment = useSelectedComment()

  const onSubmit = async () => {
    if (!session) return
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
      <CommentInput type="post" session={session} buttonLabel="댓글 작성" />
      <div>
        {comments?.map((comment) => {
          return (
            <CommentItem
              key={comment.commentId}
              comment={comment}
              session={session}
            />
          )
        })}
      </div>
    </div>
  )
}
