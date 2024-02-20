'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

import ReviewDeleteButton from './ReviewDeleteButton'
import ReviewEditButton from './ReviewEditButton'

interface AdminButtonProps {
  bookId: string
}

export default function AdminButton({ bookId }: AdminButtonProps) {
  const { data: session } = useSession()

  if (!session || session.user.role !== 'admin') return null

  return (
    <div className="absolute left-4 top-2">
      <ReviewEditButton bookId={bookId} />
      <ReviewDeleteButton bookId={bookId} />
    </div>
  )
}
