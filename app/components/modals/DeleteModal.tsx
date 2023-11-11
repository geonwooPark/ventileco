'use client'

import React from 'react'
import Modal from './Modal'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import useDeleteModal from '@/app/hooks/useDeleteModal'

export default function DeleteModal() {
  const router = useRouter()
  const params = useParams()
  const deleteModal = useDeleteModal()
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
            deleteModal.onClose()
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
      isOpen={deleteModal.isOpen}
      onClose={deleteModal.onClose}
      onSubmit={onSubmit}
      actionLabel="삭제"
      secondaryAction={deleteModal.onClose}
      secondaryActionLabel="취소"
    />
  )
}
