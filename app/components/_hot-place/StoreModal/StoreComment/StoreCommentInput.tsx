'use client'

import React, { useState } from 'react'
import { IconChat } from '../../../../../public/svgs/icons'
import usePostCommentMutation from '@/hooks/mutation/usePostCommentMutation'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'

export default function StoreCommentInput() {
  const params = useParams()
  const { id } = params
  const { data: session } = useSession()

  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const { mutation: postCommentMutation } = usePostCommentMutation({
    session,
    postingId: id as string,
  })
  const postComment = () => {
    if (!session) return
    postCommentMutation.mutate(
      { postingId: id as string, text },
      {
        onSuccess: () => {
          setText('')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <div className="flex items-center">
      <input
        placeholder={
          session ? '댓글을 남겨보세요' : '로그인 후에 댓글을 남겨보세요'
        }
        value={text}
        disabled={session ? false : true}
        onChange={onChange}
        className="h-[40px] w-full p-2 text-sm outline-none"
      />
      <button
        type="button"
        onClick={postComment}
        disabled={session ? false : true}
        className="size-8 p-1 outline-none"
      >
        <IconChat />
      </button>
    </div>
  )
}
