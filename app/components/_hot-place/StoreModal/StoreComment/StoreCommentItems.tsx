import Avatar from '@/components/common/Avatar'
import { CommentUserType } from '@/interfaces/interface'
import React, { useState } from 'react'
import dayjs from '@/lib/dayjs'
import { useSession } from 'next-auth/react'
import CommentEditButton from '@/components/common/Comment/CommentEditButton'
import CommentDeleteButton from '@/components/common/Comment/CommentDeleteButton'
import StoreCommentEditInput from './StoreCommentEditInput'

interface StoreCommentItemProps {
  storeId: string
  comment: CommentUserType
}

export default function StoreCommentItem({
  storeId,
  comment,
}: StoreCommentItemProps) {
  const { data: session } = useSession()
  const { commentId, userId, userImage, userName, createdAt, text } = comment

  const [selectedCommentIdForEdit, setSelectedCommentIdForEdit] = useState('')

  return (
    <div className="w-full break-all border-b border-gray-200 px-3 py-2 text-sm">
      <div className="mb-1 flex items-center">
        <Avatar src={userImage} />
        <p className="ml-2">{userName}</p>
      </div>
      {selectedCommentIdForEdit === commentId ? (
        <StoreCommentEditInput
          commentText={text}
          storeId={storeId}
          commentId={commentId}
          userId={userId}
          type="origin"
          setSelectedCommentIdForEdit={setSelectedCommentIdForEdit}
        />
      ) : (
        <p>{text}</p>
      )}
      <small className="flex justify-between text-gray-400">
        <span>{dayjs(createdAt).tz().format('YYYY-MM-DD HH:mm')}</span>
        <div className="flex items-center gap-2">
          {session && session.user.id === userId && (
            <>
              <CommentEditButton
                commentId={commentId}
                userId={userId}
                selectedCommentIdForEdit={selectedCommentIdForEdit}
                setSelectedCommentIdForEdit={setSelectedCommentIdForEdit}
              />
              <CommentDeleteButton
                postingId={storeId}
                commentId={commentId}
                userId={userId}
              />
            </>
          )}
        </div>
      </small>
    </div>
  )
}
