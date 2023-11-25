'use client'

import React, { useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import { CommentUserType } from '@/app/_interfaces/interface'
import DeleteCommentModal from '../modals/DeleteCommentModal'
import { toast } from 'react-toastify'
import useDeleteCommentModal from '@/app/_hooks/useDeleteCommentModal'
import useSelectedComment from '@/app/_hooks/useSelectedComment'
import CommentInput from './CommentInput'
import { useSession } from 'next-auth/react'
import EmptyState from '../EmptyState'

interface CommentProps {
  postingId: string
}

export default function Comment({ postingId }: CommentProps) {
  const { data: session } = useSession()
  const deleteCommentModal = useDeleteCommentModal()
  const selectedComment = useSelectedComment()

  const [comments, setComments] = useState<CommentUserType[]>()
  const [isLoading, setIsLoading] = useState(true)

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
            setComments(result)
            deleteCommentModal.onClose()
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    const getFav = async () => {
      try {
        await fetch(`/api/comment?postingId=${postingId}`, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((result) => {
            if (!result.error) {
              setComments(result)
            }
          })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    getFav()
  }, [postingId])

  if (isLoading) return <EmptyState label="댓글을 불러오고 있어요!" />

  return (
    <div className="text-sm">
      <div className="absolute top-0 left-0">
        <DeleteCommentModal onSubmit={onSubmit} />
      </div>
      <h1 className="md:text-lg mb-4">댓글</h1>
      <CommentInput
        type="post"
        postingId={postingId}
        buttonLabel="댓글 작성"
        session={session}
        setComments={setComments}
      />
      <div>
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
      </div>
    </div>
  )
}
