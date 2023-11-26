'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function UserName() {
  const { data: session } = useSession()
  return (
    <h2 className="text-xl md:text-3xl font-semibold mb-4">
      {session && session.user.name}님 환영합니다
    </h2>
  )
}
