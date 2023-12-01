import React, { useState } from 'react'
import Button from '../common/Button'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { CommentUserType } from '@/app/_interfaces/interface'

interface CommentInputProps {
  postingId: string
  setComments: React.Dispatch<
    React.SetStateAction<CommentUserType[] | undefined>
  >
}

export default function CommentInput({
  postingId,
  setComments,
}: CommentInputProps) {
  const { data: session } = useSession()

  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  const onSubmit = async () => {
    try {
      if (!text) {
        throw new Error('댓글을 입력하세요!')
      }

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
          if (!result.error) {
            setComments(result)
            setText('')
          } else {
            throw new Error(result.error)
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

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
        onClick={onSubmit}
        disabled={session ? false : true}
      />
    </div>
  )
}
