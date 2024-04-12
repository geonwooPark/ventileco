'use client'

import { useModalActions, useModals } from '@/hooks/store/useModalStore'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ModalContainer() {
  const modals = useModals()
  const { clearModal } = useModalActions()
  const pathname = usePathname()

  const modalArr = modals.map((modal) => {
    return <div key={modal.key}>{modal.component}</div>
  })

  useEffect(() => {
    clearModal()
  }, [pathname])

  return modals && modalArr
}
