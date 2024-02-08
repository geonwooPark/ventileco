import React, { useState } from 'react'
import dayjs from '@/lib/dayjs'
import { CommentUserType } from '@/interfaces/interface'
import { useDeleteCommentModalActions } from '@/hooks/store/useDeleteCommentModalStore'
import { useSelectedCommentForDeletionActions } from '@/hooks/store/useSelectedCommentForDeletionStore'
import {
  useSelectedCommentForEdit,
  useSelectedCommentForEditActions,
} from '@/hooks/store/useSelectedCommentForEditStore'
import Avatar from '@common/Avatar'
import CommentEditInput from './CommentEditInput'
import { useSession } from 'next-auth/react'
import ReplyCommentInput from './ReplyCommentInput'

interface CommentItemProps {
  postingId: string
  comment: CommentUserType
}

export default function CommentItem({ comment, postingId }: CommentItemProps) {
  const { data: session } = useSession()
  const { commentId, userId, userImage, userName, createdAt, text } = comment
  const { onOpen: openDeleteCommentModal } = useDeleteCommentModalActions()
  const { onChange: changeSelectedCommentForDeletion } =
    useSelectedCommentForDeletionActions()
  const { commentId: selectedCommentIdForEdit } = useSelectedCommentForEdit()
  const {
    onChange: changeSelectedCommentForEdit,
    onReset: resetSelectedCommentForEdit,
  } = useSelectedCommentForEditActions()

  const [replyMode, setReplyMode] = useState(false)

  const handleEditMode = () => {
    if (!session || userId !== session.user.id) return
    if (selectedCommentIdForEdit === commentId) {
      resetSelectedCommentForEdit()
    } else {
      changeSelectedCommentForEdit(commentId, userId, 'origin')
    }
  }

  const handleReplyMode = () => {
    if (!session) return
    setReplyMode((prev) => !prev)
  }

  const handleModal = () => {
    openDeleteCommentModal()
    changeSelectedCommentForDeletion(commentId, userId, 'origin')
  }

  return (
    <li className="list-none border-b border-b-gray-200 px-3 py-2 text-sm">
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
          <button onClick={handleReplyMode}>답글</button>
          <p>{dayjs(createdAt).tz().format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {selectedCommentIdForEdit === commentId ? (
        <CommentEditInput commentText={text} postingId={postingId} />
      ) : (
        <p>{text}</p>
      )}
      {replyMode && (
        <ReplyCommentInput
          postingId={postingId}
          commentId={commentId}
          setReplyMode={setReplyMode}
        />
      )}
    </li>
  )
}
