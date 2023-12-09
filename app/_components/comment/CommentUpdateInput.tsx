import React, { useState } from 'react'
import Button from '../common/Button'
import { CommentUserType } from '@/app/_interfaces/interface'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Session } from 'next-auth'
import useSelectedCommentForEdit from '@/app/_hooks/useSelectedCommentForEdit'

interface CommentInputProps {
  comment: CommentUserType
  postingId: string
}

interface editCommentType {
  session: Session | null
  postingId: string
  commentId: string
  text: string
}

const editComment = async ({
  session,
  postingId,
  commentId,
  text,
}: editCommentType) => {
  if (!session) return

  await fetch('/api/comment', {
    method: 'PATCH',
    body: JSON.stringify({
      postingId,
      commentId,
      currentUser: session?.user,
      text,
    }),
  })
}

export default function CommentUpdateInput({
  comment,
  postingId,
}: CommentInputProps) {
  const { data: session } = useSession()

  const selectedCommentForEdit = useSelectedCommentForEdit()

  const [text, setText] = useState(comment.text)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () =>
      editComment({
        session,
        postingId,
        commentId: selectedCommentForEdit.commentId,
        text,
      }),
    onSuccess: () => {
      if (!session) return
      queryClient.invalidateQueries({ queryKey: ['comments', { postingId }] })
      selectedCommentForEdit.onChange('')
    },
    onError: () => {
      toast.error('댓글 수정에 실패했습니다!')
    },
  })

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
        className="w-24 font-normal"
        onClick={() => mutate()}
        disabled={session ? false : true}
      />
    </div>
  )
}
