'use client'

import React from 'react'
import Sign from './Sign'
import { useModalActions } from '@/hooks/store/useModalStore'
import IntroModal from '@/components/common/Modals/IntroModal'
import ContactModal from '@/components/common/Modals/ContactModal'

export default function Signs() {
  const { addModal } = useModalActions()

  const openIntroModal = () => {
    addModal(<IntroModal />)
  }

  const openContactModal = () => {
    addModal(<ContactModal />)
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
