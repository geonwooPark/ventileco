import React from 'react'
import Modal from './Modal'
import useDeleteCommentModal from '@/app/_hooks/useDeleteCommentModal'
import { UseMutateFunction } from '@tanstack/react-query'

export default function DeleteCommentModal({
  onDelete,
}: {
  onDelete: UseMutateFunction<void, Error, void, unknown>
}) {
  const deleteCommentModal = useDeleteCommentModal()
  const bodyContent = <p>댓글을 삭제하시겠습니까?</p>

  return (
    <Modal
      title="삭제"
      body={bodyContent}
      isOpen={deleteCommentModal.isOpen}
      onClose={deleteCommentModal.onClose}
      onSubmit={onDelete}
      actionLabel="삭제"
      secondaryAction={deleteCommentModal.onClose}
      secondaryActionLabel="취소"
    />
  )
}
