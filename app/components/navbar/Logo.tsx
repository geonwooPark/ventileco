'use client'

import Image from 'next/image'
import logo from '/public/images/logo.png'
import { useRouter } from 'next/navigation'

export default function Logo() {
  const router = useRouter()

  return (
    <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] cursor-pointer z-50 relative">
      <Image
        src={logo}
        alt="로고이미지"
        quality={100}
        placeholder="blur"
        fill
        className="object-cover"
        onClick={() => router.push('/')}
      />
    </div>
  )
}
