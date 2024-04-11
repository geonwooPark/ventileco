'use client'

import { useModals } from '@/hooks/store/useModalStore'
import React from 'react'

export default function ModalContainer() {
  const modals = useModals()

  const modalArr = modals.map((modal) => {
    return <div key={modal.key}>{modal.component}</div>
  })

  return modals && modalArr
}
