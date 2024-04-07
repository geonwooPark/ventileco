import Link from 'next/link'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

interface WriteIconProps {
  path: string
}

export default function WriteIcon({ path }: WriteIconProps) {
  return (
    <Link
      href={`${path}/write` as any}
      className="relative z-[100] cursor-pointer"
    >
      <AiOutlinePlus size={24} />
    </Link>
  )
}
