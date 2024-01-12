'use client'

import Button from '@/components/common/Button'
import useDeleteHotPlace from '@/hooks/mutation/useDeleteHotPlace'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

interface StoreModalButtonProps {
  storeId: string
}

export default function StoreModalButton({ storeId }: StoreModalButtonProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { mutation: deleteStoreMutation } = useDeleteHotPlace()

  const deleteStore = () => {
    deleteStoreMutation.mutate(
      {
        session,
        storeId,
      },
      {
        onSuccess: () => {
          router.back()
          toast.success('스토어 제거 성공!')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-center gap-2">
        {session && session.user.role === 'admin' && (
          <Button
            type="button"
            level="outline"
            size="s"
            fullWidth={true}
            label="삭제"
            className="border-red-400 text-red-400"
            onClick={deleteStore}
          />
        )}
        <Button
          type="button"
          level="outline"
          size="s"
          fullWidth={true}
          label="닫기"
          onClick={() => router.back()}
        />
      </div>
    </div>
  )
}
