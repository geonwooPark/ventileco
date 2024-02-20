import { useRouter } from 'next/navigation'
import React from 'react'

interface ReviewEditButtonProps {
  bookId: string
}

export default function ReviewEditButton({ bookId }: ReviewEditButtonProps) {
  const router = useRouter()

  const onEdit = () => {
    router.push(`/book/edit/${bookId}`)
  }

  return (
    <button className="mr-3" onClick={onEdit}>
      <span className="text-sm text-blue-600">수정</span>
    </button>
  )
}
