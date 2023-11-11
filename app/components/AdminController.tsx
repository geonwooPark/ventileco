'use client'

import React from 'react'
import Button from './Button'
import useYesNoModal from '../hooks/useDeleteModal'
import { useParams, useRouter } from 'next/navigation'

export default function AdminController() {
  const yesNoModal = useYesNoModal()
  const router = useRouter()
  const { id } = useParams()

  return (
    <div className="flex gap-4">
      <Button
        type="button"
        level="ghost"
        size="l"
        label="수정"
        fullWidth={true}
        onClick={() => router.push(`/edit/${id}`)}
      />
      <Button
        type="button"
        level="ghost"
        size="l"
        label="삭제"
        fullWidth={true}
        className="text-red-400 border-red-400"
        onClick={yesNoModal.onOpen}
      />
    </div>
  )
}
