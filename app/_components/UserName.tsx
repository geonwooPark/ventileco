'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function UserName() {
  const { data: session } = useSession()
  return (
    <div className="text-3xl font-semibold mb-4">
      {session && session.user.name}님 환영합니다
    </div>
  )
}
