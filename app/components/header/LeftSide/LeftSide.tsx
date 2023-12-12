import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

export default function LeftSide() {
  return (
    <div className="flex items-center">
      <Logo className="mr-6" />
      <div>
        <Link href={'/blog'} className="text-sm text-white font-light mr-4">
          블로그
        </Link>
        <Link href={'/about'} className="text-sm text-white font-light mr-4">
          소개
        </Link>
      </div>
    </div>
  )
}
