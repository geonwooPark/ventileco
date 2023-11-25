'use client'

import React, { useState } from 'react'
import Avatar from '../Avatar'
import dayjs from 'dayjs'
import useDeleteCommentModal from '@/app/_hooks/useDeleteCommentModal'
import useSelectedComment from '@/app/_hooks/useSelectedComment'
import { CommentUserType, UserType } from '@/app/_interfaces/interface'
import CommentInput from './CommentInput'

interface CommentItemProps {
  comment: CommentUserType
  currentUser?: UserType | null
}

export default function CommentItem({
  comment,
  currentUser,
}: CommentItemProps) {
  const [editMode, setEditMode] = useState(false)
  const deleteCommentModal = useDeleteCommentModal()
  const selectedComment = useSelectedComment()

  const onEdit = () => {
    if (!currentUser) return
    if (comment.userId !== currentUser._id) return
    setEditMode(!editMode)
  }

  const onDelete = () => {
    deleteCommentModal.onOpen()
    selectedComment.onChange(comment.commentId)
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
        <CommentInput
          type="edit"
          comment={comment}
          currentUser={currentUser}
          buttonLabel="댓글 수정"
          setEditMode={setEditMode}
        />
      ) : (
        <p>{comment.text}</p>
      )}
    </div>
  )
}
