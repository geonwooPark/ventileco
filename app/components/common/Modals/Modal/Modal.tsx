import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react'
import ModalDim from './ModalDim'
import ModalCard from './ModalCard'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import ModalTitle from './ModalTitle'
import ModalCloseButton from './ModalCloseButton'
import { useIsModalOpen, useModalActions } from '@/hooks/store/useModalStore'
import ModalCancelButton from './ModalCancelButton'

type ModalContextState = {
  showModalCard: boolean
  handleClose: () => void
}

export const ModalContext = createContext<ModalContextState>({
  showModalCard: false,
  handleClose: () => {},
})

export default function Modal({ ...props }: PropsWithChildren) {
  const isModalOpen = useIsModalOpen()
  const { removeModal } = useModalActions()

  const [showModalCard, setShowModalCard] = useState(false)

  const handleClose = () => {
    setShowModalCard(false)
    setTimeout(removeModal, 300)
  }

  useEffect(() => {
    setShowModalCard(isModalOpen)
  }, [isModalOpen])

  const providerValue = { showModalCard, handleClose }

  return (
    <ModalContext.Provider value={providerValue}>
      {props.children}
    </ModalContext.Provider>
  )
}

Modal.Dim = ModalDim
Modal.Card = ModalCard
Modal.Header = ModalHeader
Modal.Title = ModalTitle
Modal.CloseButton = ModalCloseButton
Modal.Content = ModalContent
Modal.CancelButton = ModalCancelButton
