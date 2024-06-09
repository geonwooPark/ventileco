'use client'

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { IconClose, IconHeart, IconShare } from '../../../../public/svgs/icons'
import useLikeQuery from '@/hooks/query/useLikeQuery'
import useLikeMutation from '@/hooks/mutation/useLikeMutation'
import { useSession } from 'next-auth/react'
import { useAlert } from '@/hooks/useAlert'

export default function StoreModalHeader() {
  const params = useParams()
  const { id } = params
  const router = useRouter()
  const { data: session } = useSession()
  const alert = useAlert()
  const { data, isPending, error } = useLikeQuery(id as string)
  const { mutation: likeMutation } = useLikeMutation({
    postingId: id as string,
    session,
  })

  const handleLikeButton = () => {
    if (!session) return
    likeMutation.mutate(
      { postingId: id as string },
      {
        onError: (error) => {
          alert.error(error.message)
        },
      },
    )
  }

  if (error) {
    alert.error(error.message)
  }

  const onShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert.success('링크가 복사되었습니다!')
  }

  return (
    <div className="flex justify-between p-4 text-beige-normal">
      <div className="font-point text-lg">Store</div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleLikeButton}
          disabled={isPending}
          className="size-5"
        >
          <IconHeart
            className={
              data?.isLike ? 'text-red-500' : 'fill-none stroke-beige-light'
            }
          />
        </button>
        <button onClick={onShare} className="size-5">
          <IconShare />
        </button>
        <button onClick={() => router.back()} className="size-5">
          <IconClose />
        </button>
      </div>
    </div>
  )
}
