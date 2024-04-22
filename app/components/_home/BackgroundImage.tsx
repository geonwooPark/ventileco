import Image from 'next/image'
import React from 'react'
import DashedBox from '../common/DashedBox'
import bg from '../../../public/images/bg.png'

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 z-[-10] h-full w-full">
      <Image
        src={bg}
        alt="bg"
        priority
        fill
        placeholder="blur"
        className="h-full w-full object-cover opacity-50"
      />
      <DashedBox />
    </div>
  )
}
