'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function UserName() {
  const { data: session } = useSession()
  return (
    <h2 className="mb-4 text-xl font-semibold md:text-3xl">
      {session && session.user.name}님 환영합니다
    </h2>
  )
}
