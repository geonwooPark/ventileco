'use client'

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
import { IconClose, IconHeart, IconShare } from '../../../../public/svgs/icons'
import useLikeQuery from '@/hooks/query/useLikeQuery'
import useLikeMutation from '@/hooks/mutation/useLikeMutation'
import { useSession } from 'next-auth/react'

export default function StoreModalHeader() {
  const params = useParams()
  const { id } = params
  const router = useRouter()
  const { data: session } = useSession()
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
          toast.error(error.message)
        },
      },
    )
  }

  if (error) {
    toast.error(error.message)
  }

  const onShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('링크가 복사되었습니다!')
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
