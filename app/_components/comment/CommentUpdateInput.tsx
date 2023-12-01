import React, { useState } from 'react'
import Button from '../common/Button'
import { CommentUserType } from '@/app/_interfaces/interface'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { toast } from 'react-toastify'

interface CommentInputProps {
  postingId: string
  comment?: CommentUserType
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
  session: Session | null
  setComments: React.Dispatch<
    React.SetStateAction<CommentUserType[] | undefined>
  >
}

export default function CommentUpdateInput({
  postingId,
  comment,
  setEditMode,
  session,
  setComments,
}: CommentInputProps) {
  const [text, setText] = useState(comment?.text)

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
        method: 'PATCH',
        body: JSON.stringify({
          postingId: postingId,
          commentId: comment?.commentId,
          currentUser: session?.user,
          text,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error && setEditMode) {
            setComments(result)
            setEditMode(false)
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
        value={text}
        disabled={session ? false : true}
        className="w-full px-3 py-2 text-sm border rounded outline-none resize-none disabled:cursor-not-allowed"
        onChange={onChange}
      />
      <Button
        type="button"
        level="primary"
        size="s"
        label="댓글 수정"
        className="w-24"
        onClick={onSubmit}
        disabled={session ? false : true}
      />
    </div>
  )
}
