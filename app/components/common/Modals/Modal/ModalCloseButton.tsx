import React, { useContext } from 'react'
import { IconClose } from '../../../../../public/svgs/icons'
import { ModalContext } from './Modal'

export default function ModalCloseButton() {
  const { handleClose } = useContext(ModalContext)

  return (
    <button onClick={handleClose} className="size-5">
      <IconClose />
    </button>
  )
}
