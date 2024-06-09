import ConfirmModal from '@/components/common/Modals/ConfirmModal'
import { useModalActions } from '@/hooks/store/useModalStore'
import { useAlert } from '@/hooks/useAlert'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PostingDeleteButtonProps {
  postingId: string
}

export default function PostingDeleteButton({
  postingId,
}: PostingDeleteButtonProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const alert = useAlert()

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
          removeModal()
          router.push('/blog')
          router.refresh()
          alert.success(result.message)
        })
    } catch (error) {
      if (error instanceof Error) {
        alert.error(error.message)
      }
    }
  }

  const onClick = () => {
    addModal(
      <ConfirmModal
        title="Delete"
        description="게시글을 삭제하시겠습니까?"
        onSubmit={deletePosting}
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
