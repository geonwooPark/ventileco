'use client'

import Button from '@/components/common/Button'
import useDeleteHotPlaceMutation from '@/hooks/mutation/useDeleteHotPlaceMutation'
import { useAlert } from '@/hooks/useAlert'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface DeleteModalBodyProps {
  storeId: string
}

export default function DeleteModalBody({ storeId }: DeleteModalBodyProps) {
  const router = useRouter()
  const alert = useAlert()
  const creator = useSearchParams().get('creator')
  const { data: session } = useSession()
  const { mutation: deleteStoreMutation } = useDeleteHotPlaceMutation()

  const deleteStore = () => {
    if (!session || !creator) return
    if (creator !== session?.user.id && session?.user.role !== 'admin') return

    deleteStoreMutation.mutate(
      {
        storeId,
        creator,
      },
      {
        onSuccess: () => {
          router.back()
          alert.success('스토어 제거 성공!')
        },
        onError: (error) => {
          alert.error(error.message)
        },
      },
    )
  }

  return (
    <div>
      <p className="p-4 text-sm text-beige-light">
        정말 스토어를 삭제하시겠습니까?
      </p>

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
            level="primary"
            size="s"
            fullWidth={true}
            label="삭제"
            onClick={deleteStore}
          />
        </div>
      </div>
    </div>
  )
}
