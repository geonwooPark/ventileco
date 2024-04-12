import ConfirmModal from '@/components/common/Modal/ConfirmModal'
import useDeleteCommentMutation from '@/hooks/mutation/useDeleteCommentMutation'
import { useModalActions } from '@/hooks/store/useModalStore'
import { useSession } from 'next-auth/react'
import React from 'react'
import { toast } from 'react-toastify'

interface CommentDeleteButtonProps {
  postingId: string
  commentId: string
  userId: string
}

export default function CommentDeleteButton({
  postingId,
  commentId,
  userId,
}: CommentDeleteButtonProps) {
  const { data: session } = useSession()

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
        commentId,
        type: 'origin',
      },
      {
        onSuccess: () => {
          removeModal('confirm-modal')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  const bodyContent = (
    <p className="text-beige-light">댓글을 삭제하시겠습니까?</p>
  )

  const onClick = () => {
    addModal({
      key: 'confirm-modal',
      component: () => (
        <ConfirmModal
          title="Delete"
          bodyContent={bodyContent}
          onSubmit={deleteComment}
          actionLabel="삭제하기"
          secondaryActionLabel="취소"
        />
      ),
    })
  }

  return <button onClick={onClick}>삭제</button>
}
