import React from 'react'
import dayjs from '@/app/utils/dayjs'
import { CommentUserType } from '@/app/interfaces/interface'
import CommentUpdateInput from './CommentUpdateInput'
import { useSession } from 'next-auth/react'
import useDeleteCommentModal from '@/app/hooks/useDeleteCommentModal'
import useSelectedCommentForDeletion from '@/app/hooks/useSelectedCommentForDeletion'
import useSelectedCommentForEdit from '@/app/hooks/useSelectedCommentForEdit'
import Avatar from '../../common/Avatar'

interface CommentItemProps {
  postingId: string
  comment: CommentUserType
}

export default function CommentItem({ comment, postingId }: CommentItemProps) {
  const { data: session } = useSession()

  const deleteCommentModal = useDeleteCommentModal()
  const selectedCommentForDeletion = useSelectedCommentForDeletion()
  const selectedCommentForEdit = useSelectedCommentForEdit()

  const handleEditMode = () => {
    if (!session || comment.userId !== session.user.id) return
    if (selectedCommentForEdit.commentId === comment.commentId) {
      selectedCommentForEdit.onChange('')
    } else {
      selectedCommentForEdit.onChange(comment.commentId)
    }
  }

  const handleModal = () => {
    deleteCommentModal.onOpen()
    selectedCommentForDeletion.onChange(comment.commentId)
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
                {selectedCommentForEdit.commentId === comment.commentId
                  ? '취소'
                  : '수정'}
              </button>
              <button onClick={handleModal}>삭제</button>
            </>
          )}
          <p>{dayjs(comment.createdAt).tz().format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {selectedCommentForEdit.commentId === comment.commentId ? (
        <CommentUpdateInput comment={comment} postingId={postingId} />
      ) : (
        <p>{comment.text}</p>
      )}
    </li>
  )
}
