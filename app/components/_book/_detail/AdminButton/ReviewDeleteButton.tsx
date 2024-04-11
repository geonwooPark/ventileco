import React from 'react'
import { useConfirmModalDisplayActions } from '@/hooks/store/useConfirmModalDisplayStore'
import { useConfirmModalContentActions } from '@/hooks/store/useConfirmModalContentStore'
import useDeleteReviewMutation from '@/hooks/mutation/useDeleteReviewMutation'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface ReviewDeleteButtonProps {
  bookId: string
}

export default function ReviewDeleteButton({
  bookId,
}: ReviewDeleteButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { handleModal: handleDeleteReviewModal } =
    useConfirmModalDisplayActions()
  const { onChange: changeModalContent } = useConfirmModalContentActions()
  const { mutation: deleteStoreMutation } = useDeleteReviewMutation()

  const deleteReview = () => {
    if (!session || session.user.role !== 'admin') return

    deleteStoreMutation.mutate(
      {
        bookId,
      },
      {
        onSuccess: () => {
          handleDeleteReviewModal()
          router.push('/book')
          toast.success('리뷰 제거 성공!')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  const handleModal = () => {
    changeModalContent({
      title: '삭제하기',
      description: '정말 리뷰를 삭제하시겠습니까?',
      action: () => deleteReview(),
      actionLabel: '삭제',
      isLoading: deleteStoreMutation.isPending,
    })
    handleDeleteReviewModal()
  }

  return (
    <button onClick={handleModal}>
      <span className="text-sm text-red-600">삭제</span>
    </button>
  )
}
