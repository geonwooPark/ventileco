'use client'

import Avatar from '@/components/common/Avatar'
import dayjs from '@/lib/dayjs'
import { ReplyCommentUserType } from '@/interfaces/interface'
import { useSession } from 'next-auth/react'
import React from 'react'
import CommentEditInput from './CommentEditInput'
import {
  useSelectedCommentForEdit,
  useSelectedCommentForEditActions,
} from '@/hooks/store/useSelectedCommentForEditStore'
import { useSelectedCommentForDeletionActions } from '@/hooks/store/useSelectedCommentForDeletionStore'
import { useDeleteCommentModalActions } from '@/hooks/store/useDeleteCommentModalStore'
import { IconReplyArrow } from '../../../../../public/svgs'

interface ReplyCommentItemProps {
  postingId: string
  replyComment: ReplyCommentUserType
}

export default function ReplyCommentItem({
  postingId,
  replyComment,
}: ReplyCommentItemProps) {
  const { data: session } = useSession()
  const { replyCommentId, userId, userImage, userName, createdAt, text } =
    replyComment

  const { onOpen: openDeleteCommentModal } = useDeleteCommentModalActions()
  const { onChange: changeSelectedCommentForDeletion } =
    useSelectedCommentForDeletionActions()
  const { commentId: selectedCommentIdForEdit } = useSelectedCommentForEdit()
  const {
    onChange: changeSelectedCommentForEdit,
    onReset: resetSelectedCommentForEdit,
  } = useSelectedCommentForEditActions()

  const handleEditMode = () => {
    if (!session || userId !== session.user.id) return
    if (selectedCommentIdForEdit === replyCommentId) {
      resetSelectedCommentForEdit()
    } else {
      changeSelectedCommentForEdit(replyCommentId, userId, 'reply')
    }
  }

  const handleModal = () => {
    openDeleteCommentModal()
    changeSelectedCommentForDeletion(replyCommentId, userId, 'reply')
  }

  return (
    <li className="list-none border-b border-b-gray-200 bg-gray-50 px-3 py-2 text-sm">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center">
          <IconReplyArrow className="mr-2" />
          <Avatar src={userImage} />
          <p className="ml-2">{userName}</p>
        </div>
        <small className="flex items-center gap-2 text-gray-400">
          {session && session.user.id === userId && (
            <>
              <button onClick={handleEditMode}>
                {selectedCommentIdForEdit === replyCommentId ? '취소' : '수정'}
              </button>
              <button onClick={handleModal}>삭제</button>
            </>
          )}
          <p>{dayjs(createdAt).tz().format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {selectedCommentIdForEdit === replyCommentId ? (
        <CommentEditInput commentText={text} postingId={postingId} />
      ) : (
        <p className="px-6">{text}</p>
      )}
    </li>
  )
}
