import React, { useState } from 'react'
import Avatar from '../Avatar'
import dayjs from 'dayjs'
import useDeleteCommentModal from '@/app/_hooks/useDeleteCommentModal'
import useSelectedComment from '@/app/_hooks/useSelectedComment'
import { CommentUserType } from '@/app/_interfaces/interface'
import { Session } from 'next-auth'
import CommentUpdateInput from './CommentUpdateInput'

interface CommentItemProps {
  postingId: string
  comment: CommentUserType
  session: Session | null
}

export default function CommentItem({
  postingId,
  comment,
  session,
}: CommentItemProps) {
  const deleteCommentModal = useDeleteCommentModal()
  const selectedComment = useSelectedComment()

  const [editMode, setEditMode] = useState(false)

  const onEdit = () => {
    if (!session) return
    if (comment.userId !== session.user.id) return
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
          {session && session.user.id === comment.userId && (
            <>
              <button onClick={onEdit}>{editMode ? '취소' : '수정'}</button>
              <button onClick={onDelete}>삭제</button>
            </>
          )}
          <p>{dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {editMode ? (
        <CommentUpdateInput
          postingId={postingId}
          comment={comment}
          setEditMode={setEditMode}
          session={session}
        />
      ) : (
        <p>{comment.text}</p>
      )}
    </div>
  )
}
