'use client'

import React from 'react'
import Link from 'next/link'
import LogoImage from '../../../../public/images/logo.png'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link
      href={'/'}
      className="absolute left-[50%] top-1 z-[100] size-[80px] translate-x-[-50%] rounded-full shadow-xl"
    >
      <Image src={LogoImage} alt="logo" fill className="object-cover" />
    </Link>
  )
}
