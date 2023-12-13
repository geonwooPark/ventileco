'use client'

import React from 'react'
import CommentItem from './CommentItem'
import { CommentUserType } from '@/app/interfaces/interface'
import { Session } from 'next-auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import getData from '@/app/actions/getData'
import SkeletonCommentList from './SkeletonCommentList'
import DeleteCommentModal from '../../modals/DeleteCommentModal'
import ModalContainer from '../../modals/ModalContainer'
import { useDeleteCommentModalActions } from '@/app/hooks/useDeleteCommentModalStore'
import { useSelectedCommentIdForDeletion } from '@/app/hooks/useSelectedCommentForDeletionStore'

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

  const selectedCommentIdForDeletion = useSelectedCommentIdForDeletion()
  const { onClose: closeDeleteCommentModal } = useDeleteCommentModalActions()

  const queryClient = useQueryClient()
  const {
    data: comments,
    isPending,
    error,
  } = useQuery({
    queryKey: ['comments', { postingId }],
    queryFn: () =>
      getData<CommentUserType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/comment?postingId=${postingId}`,
      ),
    staleTime: 1000 * 60 * 3, // 3분
    gcTime: 1000 * 60 * 5, // 5분
  })

  const { mutate } = useMutation({
    mutationFn: () =>
      deleteComment({
        session,
        postingId,
        commentId: selectedCommentIdForDeletion,
      }),
    onSuccess: () => {
      if (!session) return
      queryClient.invalidateQueries({ queryKey: ['comments', { postingId }] })
      queryClient.invalidateQueries({
        queryKey: ['my-comment', { user: session.user.id }],
      })
      queryClient.invalidateQueries({
        queryKey: ['my-commented-post', { user: session.user.id }],
      })
      closeDeleteCommentModal()
    },
    onError: () => {
      toast.error('댓글 삭제에 실패했습니다!')
    },
  })

  if (error) {
    toast.error(error.message)
  }

  if (isPending) return <SkeletonCommentList />

  return (
    <div>
      <ModalContainer>
        <DeleteCommentModal onDelete={() => mutate()} />
      </ModalContainer>
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
