'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineClose, AiOutlineShareAlt } from 'react-icons/ai'
import { toast } from 'react-toastify'

export default function StoreModalHeader() {
  const router = useRouter()

  const onShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('링크가 복사되었습니다!')
  }

  return (
    <div className="flex justify-between p-4 text-beige-normal">
      <div className="font-point text-lg">Store</div>
      <div className="flex items-center gap-3">
        <button onClick={onShare}>
          <AiOutlineShareAlt size={20} />
        </button>
        <button onClick={() => router.back()}>
          <AiOutlineClose size={20} />
        </button>
      </div>
    </div>
  )
}
