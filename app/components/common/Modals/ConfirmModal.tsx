'use client'

import React from 'react'
import Modal from './Modal/Modal'
import Button from '../Button'

interface ConfirmModalProps {
  title: string
  description: string
  onSubmit: () => void
  actionLabel: string
}

export default function ConfirmModal({
  title,
  description,
  onSubmit,
  actionLabel,
}: ConfirmModalProps) {
  return (
    <Modal>
      <Modal.Dim>
        <Modal.Card size="small">
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Content>
            <p className="mb-6 text-beige-light">{description}</p>
            <div className="flex gap-4">
              <Modal.CancelButton />
              <Button
                type="button"
                level="primary"
                size="s"
                label={actionLabel}
                fullWidth={true}
                onClick={onSubmit}
              />
            </div>
          </Modal.Content>
        </Modal.Card>
      </Modal.Dim>
    </Modal>
  )
}
