'use client'

import React, { useState } from 'react'
import { useChatLog, useChatLogActions } from '@/hooks/store/useChatLogStore'
import LoadingAnimation from '../../Animation/LoadingAnimation'
import Input from '../../Input/Input'
import { useAlert } from '@/hooks/useAlert'

export default function ChatInput() {
  const alert = useAlert()

  const [text, setText] = useState('')
  const { onAdd: setChatLog } = useChatLogActions()
  const [isLoading, setIsLoading] = useState(false)
  const chatLog = useChatLog()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text) return

    const newId = chatLog[chatLog.length - 1].id + 1

    setText('')
    setChatLog({ id: newId, content: text, sender: 'user' })
    setIsLoading(true)

    try {
      fetch('/api/home/openai', {
        method: 'POST',
        body: JSON.stringify({ text }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setChatLog({ id: newId + 1, content: result, sender: 'gpt' })
            setIsLoading(false)
          } else {
            alert.error(result.error)
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        alert.error(error.message)
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="h-[1px] w-full bg-brown-dark" />
      <Input
        type="text"
        name="search"
        placeholder={'저에 대해 질문해보세요!'}
        className="w-full rounded-none border-none bg-transparent text-brown-dark outline-none placeholder:text-brown-dark/70"
        value={text}
        onChange={onChange}
      />
      {isLoading && <LoadingAnimation />}
    </form>
  )
}
