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
        className={`mx-auto h-full w-full rounded-sm bg-white transition duration-300 md:h-[auto] md:w-[300px]
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
        <div className="p-4">{description}</div>
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
              level="secondary"
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
  )
}
