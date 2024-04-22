'use client'

import React, { useEffect, useState } from 'react'
import { useIsModalOpen, useModalActions } from '@/hooks/store/useModalStore'
import {
  IconClose,
  IconEmail,
  IconGithub,
  IconPhone,
} from '../../../../public/svgs/icons'
import Image from 'next/image'
import placeholder from '../../../../public/images/speaker.png'

export default function ContactModal() {
  const isModalOpen = useIsModalOpen()
  const { removeModal } = useModalActions()

  const [showModalCard, setShowModalCard] = useState(false)

  const handleClose = () => {
    setShowModalCard(false)
    setTimeout(() => removeModal('contact-modal'), 300)
  }

  useEffect(() => {
    setShowModalCard(isModalOpen)
  }, [isModalOpen])

  return (
    <div
      className="fixed inset-0 z-[200] flex h-full w-full items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`mx-auto h-full w-full transition duration-300 md:h-[auto] md:w-[500px] ${
          showModalCard
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0'
        }`}
      >
        <div className={`modal-shadowed h-full w-full`}>
          {/* 헤더 */}
          <div className="flex justify-between p-4 text-beige-normal">
            <div className="font-point text-lg">Contact</div>
            <button onClick={handleClose} className="size-5">
              <IconClose />
            </button>
          </div>
          {/* 바디 */}
          <div className="px-4 pb-8 pt-4 text-beige-light">
            <div className="relative mx-auto mb-8 size-[200px]">
              <Image
                src={placeholder}
                alt="profile"
                fill
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="space-y-2 ">
              <div className="flex items-center gap-2">
                <div className="size-5">
                  <IconEmail />
                </div>
                <span>white0581@naver.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-5">
                  <IconPhone />
                </div>
                <span>010-6331-0581</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-5">
                  <IconGithub />
                </div>
                <a
                  href="https://github.com/geonwooPark"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/geonwooPark
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
