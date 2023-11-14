'use client'

import React from 'react'
import Modal from './Modal'
import useDeletePostingModal from '@/app/hooks/useDeletePostingModal'

export default function DeletePostingModal({
  onSubmit,
}: {
  onSubmit: () => Promise<void>
}) {
  const deletePostingModal = useDeletePostingModal()
  const bodyContent = <p>글을 삭제하시겠습니까?</p>

  return (
    <Modal
      title="삭제"
      body={bodyContent}
      isOpen={deletePostingModal.isOpen}
      onClose={deletePostingModal.onClose}
      onSubmit={onSubmit}
      actionLabel="삭제"
      secondaryAction={deletePostingModal.onClose}
      secondaryActionLabel="취소"
    />
  )
}
