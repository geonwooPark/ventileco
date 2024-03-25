'use client'

import React from 'react'
import EmptyState from '@/components/common/EmptyState'
import dynamic from 'next/dynamic'

const BookReviewEditor = dynamic(() => import('../_write/BookReviewEditor'), {
  ssr: false,
  loading: () => (
    <EmptyState
      label="에디터를 불러오고 있어요!"
      className="!h-[500px] rounded-md border"
    />
  ),
})

interface ReviewContentProps {
  content: string
}

export default function ReviewContent({ content }: ReviewContentProps) {
  return <BookReviewEditor content={content} theme="bubble" readOnly />
}
