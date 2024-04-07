'use client'

import React from 'react'
import { IconHome } from '../../../../public/svgs'
import { useRouter } from 'next/navigation'

export default function HomeButton() {
  const router = useRouter()

  return (
    <div>
      <div className="absolute left-[50%] top-0 w-0 translate-x-[-50%] border-x-[40px] border-t-[40px] border-x-transparent border-t-brown-dark" />
      <button
        onClick={() => router.push('/')}
        className="absolute left-[50%] top-1 size-6 translate-x-[-50%] text-beige-light"
      >
        <IconHome />
      </button>
    </div>
  )
}
