import Avatar from '@/components/common/Avatar'
import dayjs from '@/lib/dayjs'
import { ReplyCommentUserType } from '@/interfaces/interface'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import CommentEditInput from '../CommentInput/CommentEditInput'
import ReplyCommentEditButton from './ReplyCommentEditButton'
import ReplyCommentDeleteButton from './ReplyCommentDeleteButton'
import { IconReplyArrow } from '../../../../../../public/svgs/icons'

interface ReplyCommentItemProps {
  postingId: string
  replyComment: ReplyCommentUserType
}

export default function ReplyCommentItem({
  postingId,
  replyComment,
}: ReplyCommentItemProps) {
  const { data: session } = useSession()
  const {
    replyCommentId,
    user: { userId, userImage, userName },
    createdAt,
    text,
  } = replyComment

  const [selectedCommentIdForEdit, setSelectedCommentIdForEdit] = useState('')

  return (
    <div className="list-none border-b border-gray-200 px-3 py-2 text-sm">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center">
          <IconReplyArrow className="mr-2 text-brown-dark" />
          <Avatar src={userImage} />
          <p className="ml-2">{userName}</p>
        </div>
        <small className="flex items-center gap-2 text-brown-dark">
          {session && session.user.id === userId && (
            <>
              <ReplyCommentEditButton
                replyCommentId={replyCommentId}
                userId={userId}
                selectedCommentIdForEdit={selectedCommentIdForEdit}
                setSelectedCommentIdForEdit={setSelectedCommentIdForEdit}
              />
              <ReplyCommentDeleteButton
                postingId={postingId}
                replyCommentId={replyCommentId}
                userId={userId}
              />
            </>
          )}
          <p>{dayjs(createdAt).tz().format('YYYY-MM-DD HH:mm')}</p>
        </small>
      </div>
      {selectedCommentIdForEdit === replyCommentId ? (
        <CommentEditInput
          commentText={text}
          postingId={postingId}
          commentId={replyCommentId}
          userId={userId}
          type="reply"
          setSelectedCommentIdForEdit={setSelectedCommentIdForEdit}
        />
      ) : (
        <p className="px-6">{text}</p>
      )}
    </div>
  )
}
