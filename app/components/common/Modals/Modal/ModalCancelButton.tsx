import React, { useContext } from 'react'
import { ModalContext } from './Modal'
import Button from '../../Button'

export default function ModalCancelButton() {
  const { handleClose } = useContext(ModalContext)

  return (
    <Button
      type="button"
      level="secondary"
      size="s"
      label="취소"
      fullWidth={true}
      onClick={handleClose}
    />
  )
}
