import React from 'react'
import dayjs from '@/app/utils/dayjs'
import { CommentUserType } from '@/app/interfaces/interface'
import { useDeleteCommentModalActions } from '@/app/hooks/useDeleteCommentModalStore'
import { useSelectedCommentForDeletionActions } from '@/app/hooks/useSelectedCommentForDeletionStore'
import {
  useSelectedCommentForEditActions,
  useSelectedCommentIdForEdit,
} from '@/app/hooks/useSelectedCommentForEditStore'
import Avatar from '@/app/components/common/Avatar'
import CommentUpdateInput from './CommentUpdateInput'
import { Session } from 'next-auth'

interface CommentItemProps {
  session: Session | null
  postingId: string
  comment: CommentUserType
}

export default function CommentItem({
  session,
  comment,
  postingId,
}: CommentItemProps) {
  const { commentId, userId, userImage, userName, createdAt, text } = comment
  const { onOpen: openDeleteCommentModal } = useDeleteCommentModalActions()
  const { onChange: changeSelectedCommentIdForDeletion } =
    useSelectedCommentForDeletionActions()
  const selectedCommentIdForEdit = useSelectedCommentIdForEdit()
  const {
    onChange: changeSelectedCommentIdForEdit,
    onReset: resetSelectedCommentIdForEdit,
  } = useSelectedCommentForEditActions()

  const handleEditMode = () => {
    if (!session || userId !== session.user.id) return
    if (selectedCommentIdForEdit === commentId) {
      resetSelectedCommentIdForEdit()
    } else {
      changeSelectedCommentIdForEdit(commentId)
    }
  }

  const handleModal = () => {
    openDeleteCommentModal()
    changeSelectedCommentIdForDeletion(commentId)
  }

  return (
    <li className="mb-4 list-none text-sm">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center">
          <Avatar src={userImage} />
          <p className="ml-2">{userName}</p>
        </div>
        <small className="flex items-center gap-2 text-gray-400">
          {session && session.user.id === userId && (
            <>
              <button onClick={handleEditMode}>
                {selectedCommentIdForEdit === commentId ? '취소' : '수정'}
              </button>
              <button onClick={handleModal}>삭제</button>
            </>
          )}
          <p>{dayjs(createdAt).tz().format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {selectedCommentIdForEdit === commentId ? (
        <CommentUpdateInput
          session={session}
          commentText={text}
          postingId={postingId}
        />
      ) : (
        <p>{text}</p>
      )}
    </li>
  )
}
