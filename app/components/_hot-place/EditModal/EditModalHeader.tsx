'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function EditModalHeader() {
  const router = useRouter()

  return (
    <div className="flex justify-between p-4 text-beige-normal">
      <div className="font-point text-lg">Update</div>
      <button onClick={() => router.back()}>
        <AiOutlineClose size={20} />
      </button>
    </div>
  )
}
