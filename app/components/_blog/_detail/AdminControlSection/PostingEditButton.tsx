import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PostingEditButtonProps {
  postingId: string
}

export default function PostingEditButton({
  postingId,
}: PostingEditButtonProps) {
  const router = useRouter()
  const { data: session } = useSession()

  const onEdit = () => {
    if (!session || session.user.role !== 'admin') return

    router.push(`/blog/edit/${postingId}`)
  }

  return (
    <button className="mr-3" onClick={onEdit}>
      <span className="text-sm text-blue-600">수정</span>
    </button>
  )
}
