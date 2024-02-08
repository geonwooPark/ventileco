'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import Button from '@common/Button'
import usePostCommentMutation from '@/hooks/mutation/usePostCommentMutation'

interface CommentInputProps {
  postingId: string
}

export default function CommentInput({ postingId }: CommentInputProps) {
  const { data: session } = useSession()

  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  const { mutation: postCommentMutation } = usePostCommentMutation({
    session,
    postingId,
  })
  const postComment = () => {
    if (!session) return
    postCommentMutation.mutate(
      { postingId, text },
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
    <div className="mb-4 flex gap-2">
      <textarea
        cols={30}
        rows={3}
        placeholder={
          session ? '댓글을 남겨보세요' : '로그인 후에 댓글을 남겨보세요'
        }
        value={text}
        disabled={session ? false : true}
        className="w-full resize-none rounded border px-3 py-2 text-sm outline-none disabled:cursor-not-allowed"
        onChange={onChange}
      />
      <Button
        type="button"
        level="primary"
        size="s"
        label="댓글 작성"
        className="w-24"
        onClick={postComment}
        disabled={session ? false : true}
      />
    </div>
  )
}
