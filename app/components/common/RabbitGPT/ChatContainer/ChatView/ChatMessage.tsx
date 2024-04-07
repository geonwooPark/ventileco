import React, { useEffect, useRef } from 'react'
import { GPTChatType } from '@/interfaces/interface'
import RefWrapper from '@/components/common/RefWrapper'
import { Rabbit } from '../../../../../../public/svgs'

interface ChatMessageProps {
  message: GPTChatType
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <RefWrapper
      innerRef={scrollRef}
      className={`flex items-center ${
        message.sender === 'user' && 'justify-end'
      }`}
    >
      {message.sender === 'gpt' && (
        <div className="mr-2 rounded-full bg-gray-200 p-1">
          <Rabbit width="28" height="28" viewBox="0 0 200 200" />
        </div>
      )}
      <p
        className={`inline-block max-w-full break-all rounded-md px-4 py-2 
  ${
    message.sender === 'user'
      ? 'bg-brown-dark text-beige-normal'
      : 'bg-beige-normal text-brown-dark'
  }`}
      >
        {message.content}
      </p>
    </RefWrapper>
  )
}
