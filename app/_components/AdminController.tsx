'use client'

import React from 'react'
import Button from './common/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import useDeletePostingModal from '../_hooks/useDeletePostingModal'
import DeletePostingModal from './modals/DeletePostingModal'
import { useSession } from 'next-auth/react'

interface AdminControllerProps {
  postingId: string
}

export default function AdminController({ postingId }: AdminControllerProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const deletePostingModal = useDeletePostingModal()

  const onSubmit = async () => {
    try {
      await fetch('/api/posting', {
        method: 'DELETE',
        body: JSON.stringify(postingId),
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
      {session && session.user.role === 'admin' && (
        <div>
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
              onClick={() => router.push(`/edit/${postingId}`)}
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
        </div>
      )}
    </>
  )
}
