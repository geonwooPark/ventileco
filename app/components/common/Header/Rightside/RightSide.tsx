'use client'

import React from 'react'
import Menu from './Menu/Menu'
import Icons from './Icons'
import { useSession } from 'next-auth/react'

export default function RightSide() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center gap-4 text-black">
      <Icons session={session} />
      <Menu session={session} />
    </div>
  )
}
