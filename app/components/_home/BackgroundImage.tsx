import Image from 'next/image'
import React from 'react'
import DashedBox from '../common/DashedBox'
import bg from '../../../public/images/bg.png'

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 h-full w-full">
      <Image
        src={bg}
        alt="bg"
        placeholder="blur"
        className="h-full w-full object-cover object-center opacity-50"
      />
      <DashedBox />
    </div>
  )
}
