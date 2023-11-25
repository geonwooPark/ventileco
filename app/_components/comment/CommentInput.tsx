import React, { useState } from 'react'
import Button from '../Button'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { CommentUserType } from '@/app/_interfaces/interface'
import { Session } from 'next-auth'

interface CommentInputProps {
  type: 'post' | 'edit'
  comment?: CommentUserType
  session?: Session | null
  buttonLabel: string
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CommentInput({
  type,
  comment,
  session,
  buttonLabel,
  setEditMode,
}: CommentInputProps) {
  const params = useParams()
  const router = useRouter()
  const { id: postingId } = params

  const [text, setText] = useState(comment ? comment.text : '')

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  const onSubmit = async () => {
    if (type === 'post') {
      try {
        await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({
            postingId: postingId,
            currentUser: session?.user,
            text,
          }),
        }).then(() => {
          setText('')
          router.refresh()
        })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    } else if (type === 'edit') {
      await fetch('/api/comment', {
        method: 'PATCH',
        body: JSON.stringify({
          postingId: postingId,
          commentId: comment?.commentId,
          currentUser: session?.user,
          text,
        }),
      }).then(() => {
        if (setEditMode) {
          setEditMode(false)
        }
        router.refresh()
      })
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
        className="w-full px-3 py-2 border outline-none rounded resize-none disabled:cursor-not-allowed"
        onChange={onChange}
      />
      <Button
        type="button"
        level="primary"
        size="s"
        label={buttonLabel}
        className="w-24"
        onClick={onSubmit}
        disabled={session ? false : true}
      />
    </div>
  )
}
