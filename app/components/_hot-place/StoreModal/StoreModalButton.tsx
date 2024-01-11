'use client'

import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function StoreModalButton() {
  const router = useRouter()

  return (
    <div className="p-4">
      <div className="flex justify-center gap-2">
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
