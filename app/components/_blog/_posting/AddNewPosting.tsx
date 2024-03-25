'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { PiShootingStar } from 'react-icons/pi'

export default function AddReviewButton() {
  const { data: session } = useSession()

  return session ? (
    <Link
      href={'/blog/write'}
      className="fixed left-4 top-[96px] z-[50] flex gap-2 md:top-[118px]"
    >
      <button className="flex items-center gap-1 rounded-md bg-blue-600 p-3 text-white shadow-sm duration-200 hover:bg-blue-500">
        <PiShootingStar size={20} />
        <span className="text-sm">새로운 포스팅 작성하기</span>
      </button>
    </Link>
  ) : null
}
