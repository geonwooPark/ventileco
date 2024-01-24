'use client'

import React, { useEffect, useState } from 'react'
import Rabbit from '../../../../public/svgs/Rabbit.svg'
import ChatContainer from './ChatContainer/ChatContainer'

export default function RabbitGPT() {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(false)

  const onClick = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isOpen) {
      setScale(true)
    } else {
      timer = setTimeout(() => {
        setScale(false)
      }, 200)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <div
      onClick={onClick}
      className={`fixed bottom-0 left-0 z-[200] cursor-pointer duration-200 ease-in-out ${
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
      <Rabbit />
    </div>
  )
}
