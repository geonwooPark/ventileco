'use client'

import React from 'react'
import Sign from './Sign'
import { useModalActions } from '@/hooks/store/useModalStore'
import IntroModal from '../../common/Modal/IntroModal'
import ContactModal from '../../common/Modal/ContactModal'

export default function Signs() {
  const { addModal } = useModalActions()

  const openIntroModal = () => {
    addModal({
      key: 'intro-modal',
      component: <IntroModal />,
    })
  }

  const openContactModal = () => {
    addModal({
      key: 'contact-modal',
      component: <ContactModal />,
    })
  }

  return (
    <group>
      <Sign
        position={{
          x: 0,
          y: -0.8,
          z: 0,
        }}
        label="Introduce"
        openModal={openIntroModal}
      />
      <Sign
        position={{
          x: 0,
          y: -1.6,
          z: 0,
        }}
        label="Contact"
        openModal={openContactModal}
      />
    </group>
  )
}
