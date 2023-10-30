'use client'

import React from 'react'
import Modal from './Modal'
import useYesNoModal from '@/app/hooks/useYesNoModal'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'

export default function YesNoModal() {
  const router = useRouter()
  const params = useParams()
  const yesNoModal = useYesNoModal()
  const bodyContent = <p>정말 삭제하시겠습니까?</p>

  const onSubmit = async () => {
    try {
      await fetch('/api/postings', {
        method: 'DELETE',
        body: JSON.stringify(params.id),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === '201') {
            toast.success(result.message)
            yesNoModal.onClose()
            router.push('/')
            router.refresh()
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <Modal
      title="삭제"
      body={bodyContent}
      isOpen={yesNoModal.isOpen}
      onClose={yesNoModal.onClose}
      onSubmit={onSubmit}
      actionLabel="삭제"
      secondaryAction={yesNoModal.onClose}
      secondaryActionLabel="취소"
    />
  )
}
