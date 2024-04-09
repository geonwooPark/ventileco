import Button from '@/components/common/Button'
import { useConfirmModalContentActions } from '@/hooks/store/useConfirmModalContentStore'
import { useConfirmModalDisplayActions } from '@/hooks/store/useConfirmModalDisplayStore'
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

  const { onOpen: openDeletePostingModal, onClose: closeDeletePostingModal } =
    useConfirmModalDisplayActions()
  const { onChange: changeModalContent } = useConfirmModalContentActions()

  const deletePosting = async () => {
    if (!session || session.user.role !== 'admin') return

    try {
      await fetch('/api/blog/posting', {
        method: 'DELETE',
        body: JSON.stringify(postingId),
      })
        .then((res) => res.json())
        .then((result) => {
          closeDeletePostingModal()
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

  const onDelete = () => {
    changeModalContent({
      title: 'Delete',
      description: '글을 삭제하시겠습니까?',
      action: () => deletePosting(),
      actionLabel: '삭제',
    })
    openDeletePostingModal()
  }

  return (
    <Button
      type="button"
      level="ghost"
      size="l"
      label="삭제하기"
      fullWidth={true}
      className="border-red-600 text-red-600"
      onClick={onDelete}
    />
  )
}
