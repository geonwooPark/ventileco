'use client'

import React, { useEffect, useState } from 'react'
import CommentInput from './CommentInput'
import { CommentUserType } from '@/app/_interfaces/interface'
import { toast } from 'react-toastify'
import DeleteCommentModal from '../modals/DeleteCommentModal'
import { useSession } from 'next-auth/react'
import useDeleteCommentModal from '@/app/_hooks/useDeleteCommentModal'
import useSelectedComment from '@/app/_hooks/useSelectedComment'
import CommentList from './CommentList'

interface CommentSectionProps {
  postingId: string
}

export default function Comment({ postingId }: CommentSectionProps) {
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
    const fetchData = async () => {
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
    fetchData()
  }, [postingId])

  return (
    <div>
      <div className="absolute top-0 left-0">
        <DeleteCommentModal onSubmit={onSubmit} />
      </div>
      <CommentInput postingId={postingId} setComments={setComments} />
      <CommentList
        postingId={postingId}
        comments={comments}
        setComments={setComments}
        session={session}
        isLoading={isLoading}
      />
    </div>
  )
}
