'use client'

import React from 'react'
import CommentItem from './CommentItem'
import { CommentUserType } from '@/app/_interfaces/interface'
import DeleteCommentModal from '../modals/DeleteCommentModal'
import { toast } from 'react-toastify'
import useDeleteCommentModal from '@/app/_hooks/useDeleteCommentModal'
import useSelectedComment from '@/app/_hooks/useSelectedComment'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface CommentProps {
  postingId: string
  comments: CommentUserType[]
}

export default function Comments({ postingId, comments }: CommentProps) {
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
    <>
      <div className="absolute top-0 left-0">
        <DeleteCommentModal onSubmit={onSubmit} />
      </div>
      <div>
        {comments?.map((comment) => {
          return (
            <CommentItem
              key={comment.commentId}
              postingId={postingId}
              comment={comment}
              session={session}
            />
          )
        })}
      </div>
    </>
  )
}
