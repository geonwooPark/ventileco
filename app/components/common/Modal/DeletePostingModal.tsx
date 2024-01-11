import React from 'react'
import Modal from './Modal'
import {
  useDeletePostingModalActions,
  useDeletePostingModalIsOpen,
} from '@/hooks/store/useDeletePostingModalStore'

export default function DeletePostingModal({
  onSubmit,
}: {
  onSubmit: () => Promise<void>
}) {
  const deletePostingModalIsOpen = useDeletePostingModalIsOpen()
  const { onClose: closeDeletePostingModal } = useDeletePostingModalActions()
  const bodyContent = <p>글을 삭제하시겠습니까?</p>

  return (
    <Modal
      title="삭제"
      body={bodyContent}
      isOpen={deletePostingModalIsOpen}
      onClose={closeDeletePostingModal}
      onSubmit={onSubmit}
      actionLabel="삭제"
      secondaryAction={closeDeletePostingModal}
      secondaryActionLabel="취소"
    />
  )
}
