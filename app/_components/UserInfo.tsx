import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function UserInfo() {
  const session = await getServerSession(authOptions)

  return (
    <h2 className="mb-4 text-xl font-semibold md:text-3xl">
      {session?.user.name}님 환영합니다
    </h2>
  )
}
