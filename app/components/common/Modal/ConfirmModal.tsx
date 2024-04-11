'use client'

import React from 'react'
import { useIsModalOpen, useModalActions } from '@/hooks/store/useModalStore'
import Modal from './Modal'

interface ConfirmModalProps {
  title: string
  bodyContent: React.ReactElement
  onSubmit: () => void
  actionLabel: string
  secondaryActionLabel: string
}

export default function ConfirmModal({
  title,
  bodyContent,
  onSubmit,
  actionLabel,
  secondaryActionLabel,
}: ConfirmModalProps) {
  const isModalOpen = useIsModalOpen()
  const { removeModal } = useModalActions()

  const onClose = () => {
    removeModal('confirm-modal')
  }

  return (
    <Modal
      title={title}
      body={bodyContent}
      isOpen={isModalOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
    />
  )
}
