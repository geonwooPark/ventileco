'use client'

import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { useChatLog, useChatLogActions } from '@/hooks/store/useChatLogStore'
import { toast } from 'react-toastify'
import Loading from '../common/Animation/LoadingAnimation'
import { useSession } from 'next-auth/react'
import InputWithIcon from '../common/Input/InputWithIcon'

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
      <InputWithIcon
        type="text"
        name="search"
        disabled={!session && true}
        placeholder={
          session ? '피터에게 질문해보세요!' : '로그인 후 사용해보세요!'
        }
        className="w-full border-none !bg-slate-600 outline-none"
        value={text}
        icon={FiSend}
        onChange={onChange}
        iconAction={onSubmit as any}
      />
      {isLoading && <Loading />}
    </form>
  )
}
