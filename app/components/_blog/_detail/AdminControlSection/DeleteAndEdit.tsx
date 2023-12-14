'use client'

import React from 'react'
import Button from '../../../common/Button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useDeletePostingModalActions } from '@/app/hooks/useDeletePostingModalStore'

interface DeleteAndEditProps {
  postingId: string
}

export default function DeleteAndEdit({ postingId }: DeleteAndEditProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { onOpen: openDeletePostingModal } = useDeletePostingModalActions()

  return (
    <>
      {session && session.user.role === 'admin' && (
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
            className="border-red-400 text-red-400"
            onClick={openDeletePostingModal}
          />
        </div>
      )}
    </>
  )
}
