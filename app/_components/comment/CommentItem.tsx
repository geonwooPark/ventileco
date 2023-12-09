import React, { useState } from 'react'
import Avatar from '../common/Avatar'
import dayjs from 'dayjs'
import { CommentUserType } from '@/app/_interfaces/interface'
import CommentUpdateInput from './CommentUpdateInput'
import { useSession } from 'next-auth/react'
import useDeleteCommentModal from '@/app/_hooks/useDeleteCommentModal'
import useSelectedComment from '@/app/_hooks/useSelectedComment'

interface CommentItemProps {
  postingId: string
  comment: CommentUserType
}

export default function CommentItem({ comment, postingId }: CommentItemProps) {
  const { data: session } = useSession()

  const deleteCommentModal = useDeleteCommentModal()
  const selectedComment = useSelectedComment()

  const [editMode, setEditMode] = useState(false)

  const handleEditMode = () => {
    if (!session) return
    if (comment.userId !== session.user.id) return
    setEditMode((prev) => !prev)
    selectedComment.onChange(comment.commentId)
  }

  const handleModal = () => {
    deleteCommentModal.onOpen()
    selectedComment.onChange(comment.commentId)
  }

  return (
    <li className="mb-4 text-sm list-none">
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <Avatar src={comment.userImage} />
          <p className="ml-2">{comment.userName}</p>
        </div>
        <small className="flex items-center gap-2 text-gray-400">
          {session && session.user.id === comment.userId && (
            <>
              <button onClick={handleEditMode}>
                {editMode ? '취소' : '수정'}
              </button>
              <button onClick={handleModal}>삭제</button>
            </>
          )}
          <p>{dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {editMode && selectedComment.commentId === comment.commentId ? (
        <CommentUpdateInput
          comment={comment}
          postingId={postingId}
          setEditMode={setEditMode}
        />
      ) : (
        <p>{comment.text}</p>
      )}
    </li>
  )
}
