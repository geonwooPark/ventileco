import React from 'react'
import Textarea from './Textarea'
import getCurrentUser from '@/app/utils/getCurrentUser'
import CommentItem from './CommentItem'
import getComments from '@/app/utils/getComments'

interface CommentProps {
  postingId: string
}

export default async function Comment({ postingId }: CommentProps) {
  const currentUser = await getCurrentUser()
  const comments = await getComments(postingId)

  if (!comments) return

  return (
    <div>
      <h1 className="md:text-lg mb-4">댓글</h1>
      <Textarea currentUser={currentUser} />
      <div>
        {comments.map((comment) => {
          return (
            <CommentItem
              key={comment.commentId}
              comment={comment}
              currentUser={currentUser}
            />
          )
        })}
      </div>
    </div>
  )
}
