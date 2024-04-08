'use client'

import React from 'react'
import { useChatLog } from '@/hooks/store/useChatLogStore'
import ChatMessage from './ChatMessage'

export default function ChatView() {
  const chatLog = useChatLog()

  return (
    <div className="hide-scroll relative h-[calc(100%-44px)] overflow-y-scroll bg-beige-light p-4 text-sm">
      <div className="flex flex-col gap-4">
        {chatLog.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  )
}
