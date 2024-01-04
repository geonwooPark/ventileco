'use client'

import Button from '@/app/components/common/Button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function page() {
  const router = useRouter()

  const title = '서촌 맛집'
  const body = ''

  return (
    <div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center bg-black/30">
      <div className="mx-auto h-full w-full bg-white md:h-[auto] md:w-[500px]">
        {/* 헤더 */}
        <div className="flex justify-between p-4">
          <div className="text-lg font-semibold">{title}</div>
          <button onClick={() => router.back()}>
            <AiOutlineClose size={20} />
          </button>
        </div>
        {/* 바디 */}
        <div className="p-4">{body}</div>
        {/* 액션 */}
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
      </div>
    </div>
  )
}
