import Button from '@/components/common/Button'
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
    <Button
      type="button"
      level="ghost"
      size="l"
      label="수정하기"
      fullWidth={true}
      className="border-active text-active"
      onClick={onEdit}
    />
  )
}
