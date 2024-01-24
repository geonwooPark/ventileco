'use client'

import React, { useState } from 'react'
import { useChatLog, useChatLogActions } from '@/hooks/store/useChatLogStore'
import { toast } from 'react-toastify'
import LoadingAnimation from '../../Animation/LoadingAnimation'
import { useSession } from 'next-auth/react'
import Input from '../../Input/Input'

export default function ChatInput() {
  const { data: session } = useSession()
  const [text, setText] = useState('')
  const { onAdd: setChatLog } = useChatLogActions()
  const [isLoading, setIsLoading] = useState(false)
  const chatLog = useChatLog()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text || !session) return

    const newId = chatLog[chatLog.length - 1].id + 1

    setText('')
    setChatLog({ id: newId, content: text, sender: 'user' })
    setIsLoading(true)

    try {
      fetch('/api/openai', {
        method: 'POST',
        body: JSON.stringify({ text }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setChatLog({ id: newId + 1, content: result, sender: 'gpt' })
            setIsLoading(false)
          } else {
            toast.error(result.error)
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="h-[1px] w-full bg-gray-200"></div>
      <Input
        type="text"
        name="search"
        disabled={!session && true}
        placeholder={
          session ? '토깽이에게 질문해보세요!' : '로그인 후 사용해보세요!'
        }
        className="w-full rounded-none border-none !bg-white outline-none"
        value={text}
        onChange={onChange}
      />
      {isLoading && <LoadingAnimation />}
    </form>
  )
}
