import React from 'react'
import Modal from './Modal'
import { UseMutateFunction } from '@tanstack/react-query'
import {
  useDeleteCommentModalActions,
  useDeleteCommentModalIsOpen,
} from '@/hooks/store/useDeleteCommentModalStore'

export default function DeleteCommentModal({
  onDelete,
}: {
  onDelete: UseMutateFunction<void, Error, void, unknown>
}) {
  const deleteCommentModalIsOpen = useDeleteCommentModalIsOpen()
  const { onClose: closeDeleteCommentModal } = useDeleteCommentModalActions()
  const bodyContent = <p>댓글을 삭제하시겠습니까?</p>

  return (
    <Modal
      title="삭제"
      body={bodyContent}
      isOpen={deleteCommentModalIsOpen}
      onClose={closeDeleteCommentModal}
      onSubmit={onDelete}
      actionLabel="삭제"
      secondaryAction={closeDeleteCommentModal}
      secondaryActionLabel="취소"
    />
  )
}
