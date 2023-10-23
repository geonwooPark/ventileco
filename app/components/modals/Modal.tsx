'use client'

import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Button from '../Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  onSubmit: () => void
  actionLabel: string
  secondaryAction?: () => void
  secondaryActionLabel?: string
  isLoading?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  title,
  body,
  footer,
  onSubmit,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  isLoading,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setShowModal(false)
    setTimeout(() => onClose(), 300)
  }

  if (!isOpen) return null

  return (
    <div
      className="w-full h-full fixed flex justify-center items-center bg-black/30 z-50"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full h-full md:w-[300px] md:h-[auto] mx-auto rounded-sm transition duration-300
      ${showModal ? 'translate-y-0' : 'translate-y-full'}
      ${showModal ? 'opacity-100' : 'opacity-0'}
      `}
      >
        {/* 헤더 */}
        <div className="flex justify-between p-4">
          <div className="text-lg font-semibold">{title}</div>
          <button onClick={handleClose}>
            <AiOutlineClose size={20} />
          </button>
        </div>
        {/* 바디 */}
        <div className="p-4">{body}</div>
        {/* 푸터 */}
        <div className="p-4">
          <div className="flex justify-center gap-2">
            {secondaryAction && secondaryActionLabel && (
              <Button
                type="button"
                level="outline"
                size="s"
                fullWidth={true}
                label={secondaryActionLabel}
                onClick={handleClose}
              />
            )}
            <Button
              type="button"
              level="secondary"
              size="s"
              fullWidth={true}
              label={actionLabel}
              disabled={isLoading}
              onClick={onSubmit}
            />
          </div>
          {footer}
        </div>
      </div>
    </div>
  )
}
