'use client'

import DeleteCommentModal from '@/app/components/common/modals/DeleteCommentModal'
import DeletePostingModal from '@/app/components/common/modals/DeletePostingModal'
import ModalContainer from '@/app/components/common/modals/ModalContainer'
import useDeleteCommentMutation from '@/app/hooks/mutation/useDeleteCommentMutation'
import { useDeleteCommentModalActions } from '@/app/hooks/store/useDeleteCommentModalStore'
import { useDeletePostingModalActions } from '@/app/hooks/store/useDeletePostingModalStore'
import { useSelectedCommentIdForDeletion } from '@/app/hooks/store/useSelectedCommentForDeletionStore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

interface ModalsProps {
  postingId: string
}

export default function Modals({ postingId }: ModalsProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const { onClose: closeDeletePostingModal } = useDeletePostingModalActions()
  const { onClose: closeDeleteCommentModal } = useDeleteCommentModalActions()
  const selectedCommentIdForDeletion = useSelectedCommentIdForDeletion()

  const { mutation: deleteCommentMutation } = useDeleteCommentMutation({
    session,
    postingId,
  })
  const deleteComment = () => {
    deleteCommentMutation.mutate(
      {
        session,
        postingId,
        selectedCommentIdForDeletion,
      },
      {
        onSuccess: () => closeDeleteCommentModal(),
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

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
      <DeleteCommentModal onDelete={deleteComment} />
    </ModalContainer>
  )
}
