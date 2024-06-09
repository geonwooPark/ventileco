import ConfirmModal from '@/components/common/Modals/ConfirmModal'
import useDeleteCommentMutation from '@/hooks/mutation/useDeleteCommentMutation'
import { useModalActions } from '@/hooks/store/useModalStore'
import { useAlert } from '@/hooks/useAlert'
import { useSession } from 'next-auth/react'
import React from 'react'

interface ReplyCommentDeleteButtonProps {
  postingId: string
  replyCommentId: string
  userId: string
}

export default function ReplyCommentDeleteButton({
  postingId,
  replyCommentId,
  userId,
}: ReplyCommentDeleteButtonProps) {
  const { data: session } = useSession()
  const alert = useAlert()

  const { addModal, removeModal } = useModalActions()

  const { mutation: deleteCommentMutation } = useDeleteCommentMutation({
    session,
    postingId,
  })

  const deleteComment = () => {
    if (!session || session.user.id !== userId) return

    deleteCommentMutation.mutate(
      {
        postingId,
        commentId: replyCommentId,
        type: 'reply',
      },
      {
        onSuccess: () => {
          removeModal()
        },
        onError: (error) => {
          alert.error(error.message)
        },
      },
    )
  }

  const onClick = () => {
    addModal(
      <ConfirmModal
        title="Delete"
        description="댓글을 삭제하시겠습니까?"
        onSubmit={deleteComment}
        actionLabel="삭제하기"
      />,
    )
  }

  return <button onClick={onClick}>삭제</button>
}
