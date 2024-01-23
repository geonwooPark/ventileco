'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { PiShootingStar } from 'react-icons/pi'

export default function StoreAddButton() {
  const { data: session } = useSession()

  return session &&
    (session.user.role === 'admin' || session.user.role === 'creator') ? (
    <Link
      href={'/hot-place/create'}
      className="fixed left-4 top-[96px] z-[100] md:top-[118px]"
    >
      <button className="flex items-center gap-1 rounded-md bg-blue-600 p-3 text-white duration-200 hover:bg-blue-500">
        <PiShootingStar size={20} />
        <span className="text-sm">당신의 맛집을 공유해보세요!</span>
      </button>
    </Link>
  ) : null
}
