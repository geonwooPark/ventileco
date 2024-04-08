'use client'

import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Button from '../Button'
import {
  useConfirmModalDisplay,
  useConfirmModalDisplayActions,
} from '@/hooks/store/useConfirmModalDisplayStore'
import { useConfirmModalContent } from '@/hooks/store/useConfirmModalContentStore'

export default function ConfirmModal() {
  const isOpen = useConfirmModalDisplay()
  const { onClose } = useConfirmModalDisplayActions()
  const modalContent = useConfirmModalContent()
  const { title, description, action, actionLabel, isLoading } = modalContent

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
      className="fixed z-[200] flex h-full w-full items-center justify-center bg-black/30"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`mx-auto h-full w-full transition duration-300 md:h-[auto] md:w-[300px]
      ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
      >
        <div className={`modal-shadowed h-full w-full`}>
          {/* 헤더 */}
          <div className="flex justify-between p-4 text-beige-normal">
            <div className="font-point text-lg">{title}</div>
            <button onClick={handleClose}>
              <AiOutlineClose size={20} />
            </button>
          </div>
          {/* 바디 */}
          <div className="p-4 text-beige-light">{description}</div>
          {/* 푸터 */}
          <div className="p-4">
            <div className="flex justify-center gap-2">
              <Button
                type="button"
                level="outline"
                size="s"
                fullWidth={true}
                label="취소"
                onClick={handleClose}
              />
              <Button
                type="button"
                level="primary"
                size="s"
                fullWidth={true}
                label={actionLabel}
                disabled={isLoading}
                onClick={action}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
