'use client'

import Button from '@/components/common/Button'
import useDeleteHotPlace from '@/hooks/mutation/useDeleteHotPlace'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

interface DeleteModalBodyProps {
  storeId: string
}

export default function DeleteModalBody({ storeId }: DeleteModalBodyProps) {
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
    <div>
      <p className="p-4 text-sm">정말 스토어를 삭제하시겠습니까?</p>

      <div className="p-4">
        <div className="flex justify-center gap-2">
          <Button
            type="button"
            level="outline"
            size="s"
            fullWidth={true}
            label="취소"
            onClick={() => router.back()}
          />
          <Button
            type="button"
            level="outline"
            size="s"
            fullWidth={true}
            label="삭제"
            className="border-red-400 text-red-400"
            onClick={deleteStore}
          />
        </div>
      </div>
    </div>
  )
}
