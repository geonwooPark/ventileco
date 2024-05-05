import React, { PropsWithChildren, useContext } from 'react'
import { ModalContext } from './Modal'

interface ModalCardProps {
  size: 'small' | 'large'
}

export default function ModalCard({
  children,
  size,
}: PropsWithChildren<ModalCardProps>) {
  const { showModalCard } = useContext(ModalContext)

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`mx-auto h-full w-full transition duration-300 md:h-[auto] ${
        size === 'small' ? 'md:w-[300px]' : 'md:w-[500px]'
      }  ${
        showModalCard
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0'
      }`}
    >
      <div className={`modal-shadowed h-full w-full`}>{children}</div>
    </div>
  )
}
