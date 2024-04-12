'use client'

import { useModalActions, useModals } from '@/hooks/store/useModalStore'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ModalContainer() {
  const modals = useModals()
  const { clearModal } = useModalActions()
  const pathname = usePathname()

  const modalArr = modals.map((modal) => {
    const ModalComponent = modal.component
    return <ModalComponent key={modal.key} />
  })

  useEffect(() => {
    clearModal()
  }, [pathname])

  return modals && modalArr
}
