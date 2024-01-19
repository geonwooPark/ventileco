'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AiOutlineEdit } from 'react-icons/ai'

export default function StoreAddButton() {
  const { data: session } = useSession()

  return session && session.user.role === 'admin' ? (
    <Link href={'/hot-place/create'} className="fixed bottom-8 left-8 z-[100]">
      <button className="rounded-full bg-blue-600 p-3 text-white">
        <AiOutlineEdit size={24} />
      </button>
    </Link>
  ) : null
}
