import Link from 'next/link'
import React from 'react'
import { IconPlus } from '../../../../../../public/svgs/icons'

interface WriteIconProps {
  path: string
}

export default function WriteIcon({ path }: WriteIconProps) {
  return (
    <Link
      href={`/${path}/write` as any}
      className="relative z-[100] size-5 cursor-pointer"
    >
      <IconPlus />
    </Link>
  )
}
