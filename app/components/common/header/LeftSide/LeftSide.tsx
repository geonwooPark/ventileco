import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

export default function LeftSide() {
  return (
    <div className="flex items-center">
      <Logo className="mr-6" />
      <div>
        <Link href={'/blog'} className="mr-4 text-sm font-light text-white">
          블로그
        </Link>
        <Link href={'/about'} className="mr-4 text-sm font-light text-white">
          소개
        </Link>
      </div>
    </div>
  )
}
