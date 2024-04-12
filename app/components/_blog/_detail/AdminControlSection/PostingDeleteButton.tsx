import Button from '@/components/common/Button'
import ConfirmModal from '@/components/common/Modal/ConfirmModal'
import { useModalActions } from '@/hooks/store/useModalStore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

interface PostingDeleteButtonProps {
  postingId: string
}

export default function PostingDeleteButton({
  postingId,
}: PostingDeleteButtonProps) {
  const router = useRouter()
  const { data: session } = useSession()

  const { addModal, removeModal } = useModalActions()

  const deletePosting = async () => {
    if (!session || session.user.role !== 'admin') return

    try {
      await fetch('/api/blog/posting', {
        method: 'DELETE',
        body: JSON.stringify(postingId),
      })
        .then((res) => res.json())
        .then((result) => {
          removeModal('confirm-modal')
          router.push('/blog')
          router.refresh()
          toast.success(result.message)
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const bodyContent = (
    <p className="text-beige-light">게시글을 삭제하시겠습니까?</p>
  )

  const onClick = () => {
    addModal({
      key: 'confirm-modal',
      component: () => (
        <ConfirmModal
          title="Delete"
          bodyContent={bodyContent}
          onSubmit={deletePosting}
          actionLabel="삭제하기"
          secondaryActionLabel="취소"
        />
      ),
    })
  }

  return (
    <Button
      type="button"
      level="ghost"
      size="l"
      label="삭제하기"
      fullWidth={true}
      className="border-red-600 text-red-600"
      onClick={onClick}
    />
  )
}
