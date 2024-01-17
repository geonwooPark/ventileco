'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function DeleteModalHeader() {
  const router = useRouter()

  return (
    <div className="flex justify-between p-4">
      <div className="text-lg font-semibold">스토어 삭제</div>
      <button onClick={() => router.back()}>
        <AiOutlineClose size={20} />
      </button>
    </div>
  )
}
