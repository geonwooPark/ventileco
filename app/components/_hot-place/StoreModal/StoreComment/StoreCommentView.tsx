'use client'

import useCommentListQuery from '@/hooks/query/useCommentListQuery'
import { useParams } from 'next/navigation'
import React from 'react'
import StoreCommentItem from './StoreCommentItems'
import SkeletonStoreCommentList from './SkeletonStoreCommentList'

export default function StoreCommentView() {
  const params = useParams()
  const { id } = params

  const { allComment, isPending } = useCommentListQuery(id as string)
  if (isPending) return <SkeletonStoreCommentList />

  return (
    <div className="hide-scroll h-[calc(100%-40px)] w-full overflow-x-auto overflow-y-scroll border-b">
      {allComment?.comments.map((comment) => (
        <StoreCommentItem
          key={comment.commentId}
          storeId={id as string}
          comment={comment}
        />
      ))}
      {allComment?.comments.length === 0 && (
        <p className="flex h-full w-full items-center justify-center text-gray-400">
          작성된 댓글이 없습니다!
        </p>
      )}
    </div>
  )
}
