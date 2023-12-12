import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

export default function LeftSide() {
  return (
    <div className="flex items-center">
      <Logo className="mr-8" />
      <div>
        <Link href={'/blog'} className="text-white font-light mr-4">
          Blog
        </Link>
      </div>
    </div>
  )
}
