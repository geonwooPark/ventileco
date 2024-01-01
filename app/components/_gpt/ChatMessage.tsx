import React, { useEffect, useRef } from 'react'
import { BiGhost } from 'react-icons/bi'
import { GPTChat } from '@/app/interfaces/interface'
import RefWrapper from '../common/RefWrapper'

interface ChatMessageProps {
  message: GPTChat
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
        <span className="mr-2 rounded-full bg-white p-1">
          <BiGhost size={20} className="text-black" />
        </span>
      )}
      <p
        className={`inline-block max-w-full break-all rounded-sm px-4 py-2 text-white 
  ${message.sender === 'user' ? 'bg-green-600' : 'bg-slate-600'}`}
      >
        {message.content}
      </p>
    </RefWrapper>
  )
}
