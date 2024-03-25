'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { PiShootingStar } from 'react-icons/pi'

export default function AddReviewButton() {
  const { data: session } = useSession()

  return session ? (
    <Link
      href={'/book/write'}
      className="flex items-center gap-1 rounded-md bg-blue-600 p-3 text-white shadow-sm duration-200 hover:bg-blue-500"
    >
      <PiShootingStar size={20} />
      <span className="text-sm">리뷰 추가하기</span>
    </Link>
  ) : null
}
