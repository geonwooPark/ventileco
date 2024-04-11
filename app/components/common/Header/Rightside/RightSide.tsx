import React from 'react'
import Menu from './Menu/Menu'
import Icons from './Icons'
import { useSession } from 'next-auth/react'

interface RightSideProps {
  path: string
}

export default function RightSide({ path }: RightSideProps) {
  const { data: session } = useSession()

  return (
    <div className="flex items-center gap-4 text-black">
      <Icons path={path} session={session} />
      <Menu session={session} />
    </div>
  )
}
