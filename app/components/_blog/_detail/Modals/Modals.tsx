'use client'

import DeleteCommentModal from '@/app/components/modals/DeleteCommentModal'
import DeletePostingModal from '@/app/components/modals/DeletePostingModal'
import ModalContainer from '@/app/components/modals/ModalContainer'
import { useDeleteCommentModalActions } from '@/app/hooks/useDeleteCommentModalStore'
import { useDeletePostingModalActions } from '@/app/hooks/useDeletePostingModalStore'
import { useSelectedCommentIdForDeletion } from '@/app/hooks/useSelectedCommentForDeletionStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

interface ModalsProps {
  postingId: string
}

const deleteComment = async (
  session: Session | null,
  postingId: string,
  commentId: string,
) => {
  if (!session) return

  await fetch('/api/comment', {
    method: 'DELETE',
    body: JSON.stringify({
      postingId,
      commentId,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function Modals({ postingId }: ModalsProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const { onClose: closeDeletePostingModal } = useDeletePostingModalActions()
  const { onClose: closeDeleteCommentModal } = useDeleteCommentModalActions()
  const selectedCommentIdForDeletion = useSelectedCommentIdForDeletion()

  const queryClient = useQueryClient()
  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: () =>
      deleteComment(session, postingId, selectedCommentIdForDeletion),
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
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // ssr 리액트 쿼리 적용해야함
  const deletePosting = async () => {
    try {
      await fetch('/api/posting', {
        method: 'DELETE',
        body: JSON.stringify(postingId),
      })
        .then((res) => res.json())
        .then((result) => {
          closeDeletePostingModal()
          router.push('/blog')
          toast.success(result.message)
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <ModalContainer>
      <DeletePostingModal onSubmit={deletePosting} />
      <DeleteCommentModal onDelete={() => deleteCommentMutation()} />
    </ModalContainer>
  )
}
