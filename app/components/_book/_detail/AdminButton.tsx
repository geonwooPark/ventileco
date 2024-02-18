'use client'

import { useRouter } from 'next/navigation'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import React from 'react'

interface AdminButtonProps {
  bookId: string
}

export default function AdminButton({ bookId }: AdminButtonProps) {
  const router = useRouter()

  const onEdit = () => {
    router.push(`/book/edit/${bookId}`)
  }

  const onDelete = () => {
    router.push(`/book/delete/${bookId}`)
  }

  return (
    <div className="absolute left-4 top-2">
      <button className="mr-3" onClick={onEdit}>
        <AiOutlineEdit size={20} />
      </button>
      <button onClick={onDelete}>
        <AiOutlineDelete size={20} />
      </button>
    </div>
  )
}
