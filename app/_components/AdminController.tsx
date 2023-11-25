'use client'

import React from 'react'
import Button from './Button'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import useDeletePostingModal from '../_hooks/useDeletePostingModal'
import DeletePostingModal from './modals/DeletePostingModal'

export default function AdminController() {
  const params = useParams()
  const router = useRouter()
  const { id } = useParams()
  const deletePostingModal = useDeletePostingModal()

  const onSubmit = async () => {
    try {
      await fetch('/api/posting', {
        method: 'DELETE',
        body: JSON.stringify(params.id),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            deletePostingModal.onClose()
            router.push('/')
            router.refresh()
            toast.success(result.message)
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <>
      <div className="absolute top-0 left-0">
        <DeletePostingModal onSubmit={onSubmit} />
      </div>
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
          onClick={deletePostingModal.onOpen}
        />
      </div>
    </>
  )
}
