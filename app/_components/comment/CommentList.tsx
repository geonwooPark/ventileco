'use client'

import React from 'react'
import CommentItem from './CommentItem'
import { CommentUserType } from '@/app/_interfaces/interface'
import { Session } from 'next-auth'
import SkeletonCommentList from './SkeletonCommentList'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DeleteCommentModal from '../modals/DeleteCommentModal'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import useDeleteCommentModal from '@/app/_hooks/useDeleteCommentModal'
import getData from '@/app/_actions/getData'
import useSelectedCommentForDeletion from '@/app/_hooks/useSelectedCommentForDeletion'

interface CommentListProps {
  postingId: string
}

interface deleteCommentType {
  session: Session | null
  postingId: string
  commentId: string
}

const deleteComment = async ({
  session,
  postingId,
  commentId,
}: deleteCommentType) => {
  if (!session) return

  await fetch('/api/comment', {
    method: 'DELETE',
    body: JSON.stringify({
      postingId,
      commentId,
    }),
  })
}

export default function CommentList({ postingId }: CommentListProps) {
  const { data: session } = useSession()

  const deleteCommentModal = useDeleteCommentModal()
  const selectedCommentForDeletion = useSelectedCommentForDeletion()

  const queryClient = useQueryClient()
  const {
    data: comments,
    isPending,
    error,
  } = useQuery({
    queryKey: ['comments', { postingId }],
    queryFn: () =>
      getData<CommentUserType[]>(`/api/comment?postingId=${postingId}`),
  })

  if (error) {
    toast.error(error.message)
  }

  const { mutate } = useMutation({
    mutationFn: () =>
      deleteComment({
        session,
        postingId,
        commentId: selectedCommentForDeletion.commentId,
      }),
    onSuccess: () => {
      if (!session) return
      queryClient.invalidateQueries({ queryKey: ['comments', { postingId }] })
      deleteCommentModal.onClose()
    },
    onError: () => {
      toast.error('댓글 삭제에 실패했습니다!')
    },
  })

  if (isPending) return <SkeletonCommentList />

  return (
    <div>
      <div className="absolute top-0 left-0">
        <DeleteCommentModal onDelete={() => mutate()} />
      </div>
      <ul>
        {comments?.map((comment) => {
          return (
            <CommentItem
              key={comment.commentId}
              postingId={postingId}
              comment={comment}
            />
          )
        })}
      </ul>
    </div>
  )
}
