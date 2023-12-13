'use client'

import React from 'react'
import { CommentUserType } from '@/app/interfaces/interface'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import getData from '@/app/actions/getData'
import CommentItem from './CommentItem'
import SkeletonCommentList from './SkeletonCommentList'
import { useSession } from 'next-auth/react'

interface CommentListProps {
  postingId: string
}

export default function CommentList({ postingId }: CommentListProps) {
  const { data: session } = useSession()
  const {
    data: comments,
    isPending,
    error,
  } = useQuery({
    queryKey: ['comments', { postingId }],
    queryFn: () =>
      getData<CommentUserType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/comment?postingId=${postingId}`,
      ),
    staleTime: 1000 * 60 * 3, // 3분
    gcTime: 1000 * 60 * 5, // 5분
  })

  if (error) {
    toast.error(error.message)
  }
  if (isPending) return <SkeletonCommentList />

  return (
    <ul>
      {comments?.map((comment) => {
        return (
          <CommentItem
            key={comment.commentId}
            session={session}
            postingId={postingId}
            comment={comment}
          />
        )
      })}
    </ul>
  )
}
