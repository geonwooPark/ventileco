import { Session } from 'next-auth'
import React from 'react'

interface UserInfoProps {
  session: Session | null
}

export default function UserInfo({ session }: UserInfoProps) {
  return (
    <h2 className="mb-4 text-xl font-semibold md:text-3xl">
      {session?.user.name}님 환영합니다
    </h2>
  )
}
