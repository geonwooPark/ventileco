import React, { PropsWithChildren, useContext } from 'react'
import { ModalContext } from './Modal'

export default function ModalDim({ children }: PropsWithChildren) {
  const { handleClose } = useContext(ModalContext)

  return (
    <div
      className="fixed inset-0 z-[500] flex h-full w-full items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      {children}
    </div>
  )
}
