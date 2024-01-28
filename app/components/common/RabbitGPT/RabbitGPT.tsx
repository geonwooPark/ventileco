'use client'

import React, { useState } from 'react'
import ChatContainer from './ChatContainer/ChatContainer'
import {
  RabbitBody,
  RabbitEyeLeft,
  RabbitEyeRight,
} from '../../../../public/svgs'
import useScaleAnimation from '@/hooks/useScaleAnimation'
import useMouseCoordinates from '@/hooks/useMouseCoordinates'

interface rotateVariantsType {
  [key: number]: string
}

const rotateVariants: rotateVariantsType = {
  90: 'rotate-[-90deg]',
  100: 'rotate-[-75deg]',
  110: 'rotate-[-60deg]',
  120: 'rotate-[-45deg]',
  130: 'rotate-[-30deg]',
  140: 'rotate-[-15deg]',
  150: 'rotate-[0deg]',
  160: 'rotate-[15deg]',
  170: 'rotate-[30deg]',
  180: 'rotate-[45deg]',
}

export default function RabbitGPT() {
  const [deg, setDeg] = useState(0)

  const { isOpen, scale, setIsOpen } = useScaleAnimation()
  const { OriginRef } = useMouseCoordinates(setDeg)

  const onClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div
      onClick={onClick}
      className={`fixed bottom-0 left-0 z-[50] hidden cursor-pointer duration-200 ease-in-out md:block ${
        isOpen ? 'translate-y-[0]' : 'translate-y-[120px]'
      }`}
    >
      {scale && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-[-380px] top-[-240px] flex h-full origin-bottom-left items-center justify-center duration-200 ${
            isOpen ? 'scale-100' : 'scale-0'
          }`}
        >
          <ChatContainer />
        </div>
      )}
      <RabbitBody />
      <RabbitEyeLeft
        className={`absolute right-[78px] top-[74px] ${rotateVariants[deg]} transition duration-75`}
      />
      <RabbitEyeRight
        className={`absolute right-[14px] top-[71px] ${rotateVariants[deg]} transition duration-75`}
      />
      <div
        ref={OriginRef}
        className="absolute bottom-0 left-0 h-[1px] w-[1px]"
      ></div>
    </div>
  )
}
