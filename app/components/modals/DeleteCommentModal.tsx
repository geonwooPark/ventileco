'use client'

import React from 'react'
import Modal from './Modal'
import useDeleteCommentModal from '@/app/hooks/useDeleteCommentModal'

export default function DeleteCommentModal({
  onSubmit,
}: {
  onSubmit: () => Promise<void>
}) {
  const deleteCommentModal = useDeleteCommentModal()
  const bodyContent = <p>댓글을 삭제하시겠습니까?</p>

  return (
    <Modal
      title="삭제"
      body={bodyContent}
      isOpen={deleteCommentModal.isOpen}
      onClose={deleteCommentModal.onClose}
      onSubmit={onSubmit}
      actionLabel="삭제"
      secondaryAction={deleteCommentModal.onClose}
      secondaryActionLabel="취소"
    />
  )
}
