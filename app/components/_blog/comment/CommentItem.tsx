import React from 'react'
import dayjs from '@/app/utils/dayjs'
import { CommentUserType } from '@/app/interfaces/interface'
import CommentUpdateInput from './CommentUpdateInput'
import { useSession } from 'next-auth/react'
import Avatar from '../../common/Avatar'
import { useDeleteCommentModalActions } from '@/app/hooks/useDeleteCommentModalStore'
import { useSelectedCommentForDeletionActions } from '@/app/hooks/useSelectedCommentForDeletionStore'
import {
  useSelectedCommentForEditActions,
  useSelectedCommentIdForEdit,
} from '@/app/hooks/useSelectedCommentForEditStore'

interface CommentItemProps {
  postingId: string
  comment: CommentUserType
}

export default function CommentItem({ comment, postingId }: CommentItemProps) {
  const { data: session } = useSession()

  const { onOpen: openDeleteCommentModal } = useDeleteCommentModalActions()
  const { onChange: changeSelectedCommentIdForDeletion } =
    useSelectedCommentForDeletionActions()
  const selectedCommentIdForEdit = useSelectedCommentIdForEdit()
  const {
    onChange: changeSelectedCommentIdForEdit,
    onReset: resetSelectedCommentIdForEdit,
  } = useSelectedCommentForEditActions()

  const handleEditMode = () => {
    if (!session || comment.userId !== session.user.id) return
    if (selectedCommentIdForEdit === comment.commentId) {
      resetSelectedCommentIdForEdit()
    } else {
      changeSelectedCommentIdForEdit(comment.commentId)
    }
  }

  const handleModal = () => {
    openDeleteCommentModal()
    changeSelectedCommentIdForDeletion(comment.commentId)
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
                {selectedCommentIdForEdit === comment.commentId
                  ? '취소'
                  : '수정'}
              </button>
              <button onClick={handleModal}>삭제</button>
            </>
          )}
          <p>{dayjs(comment.createdAt).tz().format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {selectedCommentIdForEdit === comment.commentId ? (
        <CommentUpdateInput comment={comment} postingId={postingId} />
      ) : (
        <p>{comment.text}</p>
      )}
    </li>
  )
}
