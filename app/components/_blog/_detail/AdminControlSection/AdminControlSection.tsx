'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import PostingEditButton from './PostingEditButton'
import PostingDeleteButton from './PostingDeleteButton'

interface AdminControlProps {
  postingId: string
}

export default function AdminControl({ postingId }: AdminControlProps) {
  const { data: session } = useSession()

  if (!session || session.user.role !== 'admin') return null

  return (
    <div className="absolute left-4 top-2">
      <PostingEditButton postingId={postingId} />
      <PostingDeleteButton postingId={postingId} />
    </div>
  )
}
