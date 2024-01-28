'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function FilterModalHeader() {
  const router = useRouter()

  return (
    <div className="flex justify-between p-4">
      <div className="text-lg font-semibold">필터</div>
      <button onClick={() => router.back()}>
        <AiOutlineClose size={20} />
      </button>
    </div>
  )
}
