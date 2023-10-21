'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Logo() {
  const router = useRouter()

  return (
    <Image
      alt="Logo"
      className="cursor-pointer z-10 py-3"
      height="80"
      width="80"
      src="/images/logo.png"
    />
  )
}
