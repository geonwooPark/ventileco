'use client'

import React, { useState } from 'react'
import Button from '../Button'
import { UserType } from '@/app/utils/getCurrentUser'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface TextareaProps {
  currentUser?: UserType | null
}

export default function Textarea({ currentUser }: TextareaProps) {
  const [text, setText] = useState('')
  const params = useParams()
  const router = useRouter()
  const { id: postingId } = params

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  const onSubmit = async () => {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postingId: postingId,
        currentUser: currentUser,
        text,
      }),
    }).then(() => {
      setText('')
      router.refresh()
    })
  }

  return (
    <div className="flex gap-2 mb-4">
      <textarea
        cols={30}
        rows={3}
        placeholder={
          currentUser ? '댓글을 남겨보세요' : '로그인 후에 댓글을 남겨보세요'
        }
        value={text}
        disabled={currentUser ? false : true}
        className="w-full px-3 py-2 border outline-none rounded resize-none disabled:cursor-not-allowed"
        onChange={onChange}
      />
      <Button
        type="button"
        level="primary"
        size="s"
        label="댓글 작성"
        className="w-24"
        onClick={onSubmit}
        disabled={currentUser ? false : true}
      />
    </div>
  )
}
