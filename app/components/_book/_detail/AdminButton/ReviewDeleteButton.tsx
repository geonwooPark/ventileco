import React from 'react'
import useDeleteReviewMutation from '@/hooks/mutation/useDeleteReviewMutation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useModalActions } from '@/hooks/store/useModalStore'
import ConfirmModal from '@/components/common/Modals/ConfirmModal'
import { useAlert } from '@/hooks/useAlert'

interface ReviewDeleteButtonProps {
  bookId: string
}

export default function ReviewDeleteButton({
  bookId,
}: ReviewDeleteButtonProps) {
  const { data: session } = useSession()
  const alert = useAlert()
  const router = useRouter()

  const { addModal, removeModal } = useModalActions()

  const { mutation: deleteStoreMutation } = useDeleteReviewMutation()

  const deleteReview = () => {
    if (!session || session.user.role !== 'admin') return

    deleteStoreMutation.mutate(
      {
        bookId,
      },
      {
        onSuccess: () => {
          removeModal()
          router.push('/book')
          alert.success('리뷰 제거 성공!')
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
        description="정말 리뷰를 삭제하시겠습니까?"
        onSubmit={deleteReview}
        actionLabel="삭제하기"
      />,
    )
  }

  return (
    <button onClick={onClick}>
      <span className="text-sm text-red-600">삭제</span>
    </button>
  )
}
