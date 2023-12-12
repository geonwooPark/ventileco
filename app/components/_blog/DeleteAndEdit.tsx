'use client'

import React from 'react'
import Button from '../common/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import useDeletePostingModal from '../../hooks/useDeletePostingModal'
import DeletePostingModal from '../modals/DeletePostingModal'
import { useSession } from 'next-auth/react'
import ModalContainer from '../modals/ModalContainer'

interface DeleteAndEditProps {
  postingId: string
}

export default function DeleteAndEdit({ postingId }: DeleteAndEditProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const deletePostingModal = useDeletePostingModal()

  const onSubmit = async () => {
    try {
      await fetch('/api/posting', {
        method: 'DELETE',
        body: JSON.stringify(postingId),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch data')
          }
          return res.json()
        })
        .then((result) => {
          deletePostingModal.onClose()
          router.push('/blog')
          toast.success(result.message)
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
          <ModalContainer>
            <DeletePostingModal onSubmit={onSubmit} />
          </ModalContainer>
          <div className="flex gap-4">
            <Button
              type="button"
              level="ghost"
              size="l"
              label="수정"
              fullWidth={true}
              onClick={() => router.push(`/blog/edit/${postingId}`)}
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
