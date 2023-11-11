'use client'

import React, { useState } from 'react'
import Avatar from '../Avatar'
import { useParams, useRouter } from 'next/navigation'
import { UserType } from '@/app/actions/getCurrentUser'
import Button from '../Button'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

interface CommentItemProps {
  comment: {
    commentId: string
    userImage: string
    userId: string
    userName: string
    createdAt: Date
    text: string
  }
  currentUser?: UserType | null
}

export default function CommentItem({
  comment,
  currentUser,
}: CommentItemProps) {
  const router = useRouter()
  const params = useParams()
  const { id: postingId } = params
  const [text, setText] = useState(comment.text)
  const [editMode, setEditMode] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  const onDelete = async () => {
    if (!currentUser) return
    if (comment.userId !== currentUser._id) return

    try {
      await fetch('/api/comment', {
        method: 'DELETE',
        body: JSON.stringify({
          postingId: postingId,
          commentId: comment.commentId,
        }),
      }).then(() => {
        router.refresh()
      })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const onEdit = () => {
    if (!currentUser) return
    if (comment.userId !== currentUser._id) return
    setEditMode(!editMode)
  }

  const onSubmit = async () => {
    await fetch('/api/comment', {
      method: 'PATCH',
      body: JSON.stringify({
        postingId: postingId,
        commentId: comment.commentId,
        currentUser: currentUser,
        text,
      }),
    }).then(() => {
      setEditMode(false)
      router.refresh()
    })
  }

  return (
    <div className="text-sm mb-4">
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <Avatar src={comment.userImage} />
          <p className="ml-2">{comment.userName}</p>
        </div>
        <small className="text-gray-400 flex items-center gap-2">
          {currentUser && currentUser._id === comment.userId && (
            <>
              <button onClick={onEdit}>수정</button>
              <button onClick={onDelete}>삭제</button>
            </>
          )}
          <p>{dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {editMode ? (
        <div className="flex gap-2 mb-4">
          <textarea
            cols={30}
            rows={3}
            value={text}
            className="w-full px-3 py-2 border outline-none rounded resize-none"
            onChange={onChange}
          />
          <Button
            type="button"
            level="primary"
            size="s"
            label="댓글 수정"
            className="w-24"
            onClick={onSubmit}
          />
        </div>
      ) : (
        <p>{comment.text}</p>
      )}
    </div>
  )
}
