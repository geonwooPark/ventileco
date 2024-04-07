import React from 'react'
import ChatInput from './ChatInput'
import ChatView from './ChatView/ChatView'

export default function ChatContainer() {
  return (
    <div className="h-[360px] w-full max-w-[360px] overflow-hidden rounded-md border border-brown-dark shadow-2xl">
      <ChatView />
      <ChatInput />
    </div>
  )
}
