'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Session } from 'next-auth'
import Button from '../../common/Button'

interface CommentInputProps {
  postingId: string
}

const postComment = async (
  session: Session | null,
  postingId: string,
  text: string,
) => {
  if (!session) return

  await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({
      postingId: postingId,
      currentUser: session?.user,
      text,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function CommentInput({ postingId }: CommentInputProps) {
  const { data: session } = useSession()

  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  const queryClient = useQueryClient()
  const { mutate: postCommentMutation } = useMutation({
    mutationFn: () => postComment(session, postingId, text),
    onSuccess: () => {
      if (!session) return
      queryClient.invalidateQueries({ queryKey: ['comments', { postingId }] })
      queryClient.invalidateQueries({
        queryKey: ['my-comment', { user: session.user.id }],
      })
      queryClient.invalidateQueries({
        queryKey: ['my-commented-post', { user: session.user.id }],
      })

      setText('')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <div className="flex gap-2 mb-4">
      <textarea
        cols={30}
        rows={3}
        placeholder={
          session ? '댓글을 남겨보세요' : '로그인 후에 댓글을 남겨보세요'
        }
        value={text}
        disabled={session ? false : true}
        className="w-full px-3 py-2 text-sm border rounded outline-none resize-none disabled:cursor-not-allowed"
        onChange={onChange}
      />
      <Button
        type="button"
        level="primary"
        size="s"
        label="댓글 작성"
        className="w-24"
        onClick={() => postCommentMutation()}
        disabled={session ? false : true}
      />
    </div>
  )
}
