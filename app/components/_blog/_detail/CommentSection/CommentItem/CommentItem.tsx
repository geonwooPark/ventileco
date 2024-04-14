import React, { useState } from 'react'
import dayjs from '@/lib/dayjs'
import { CommentUserType } from '@/interfaces/interface'
import Avatar from '@common/Avatar'
import CommentEditInput from '../CommentInput/CommentEditInput'
import { useSession } from 'next-auth/react'
import ReplyCommentInput from '../CommentInput/ReplyCommentInput'
import CommentDeleteButton from '../../../../common/Comment/CommentDeleteButton'
import CommentEditButton from '../../../../common/Comment/CommentEditButton'

interface CommentItemProps {
  postingId: string
  comment: CommentUserType
}

export default function CommentItem({ comment, postingId }: CommentItemProps) {
  const { data: session } = useSession()
  const { commentId, userId, userImage, userName, createdAt, text } = comment

  const [selectedCommentIdForEdit, setSelectedCommentIdForEdit] = useState('')
  const [replyMode, setReplyMode] = useState(false)

  const handleReplyMode = () => {
    if (!session) return
    setReplyMode((prev) => !prev)
  }

  return (
    <div className="border-b border-gray-200 px-3 py-2 text-sm">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center">
          <Avatar src={userImage} />
          <p className="ml-2">{userName}</p>
        </div>
        <small className="flex items-center gap-2 text-brown-dark">
          {session && session.user.id === userId && (
            <>
              <CommentEditButton
                commentId={commentId}
                userId={userId}
                selectedCommentIdForEdit={selectedCommentIdForEdit}
                setSelectedCommentIdForEdit={setSelectedCommentIdForEdit}
              />
              <CommentDeleteButton
                postingId={postingId}
                commentId={commentId}
                userId={userId}
              />
            </>
          )}
          <button onClick={handleReplyMode}>답글</button>
          <p>{dayjs(createdAt).tz().format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {selectedCommentIdForEdit === commentId ? (
        <CommentEditInput
          commentText={text}
          postingId={postingId}
          commentId={commentId}
          userId={userId}
          type="origin"
          setSelectedCommentIdForEdit={setSelectedCommentIdForEdit}
        />
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
    </div>
  )
}
