'use client'

import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'
import getData from '../_actions/getData'
import { toast } from 'react-toastify'

interface LikeButtonProps {
  className?: string
  postingId: string
}

interface handleLikeButtonType {
  postingId: string
  session: Session | null
  method: 'POST' | 'DELETE'
}

const handleLikeButton = async ({
  postingId,
  session,
  method,
}: handleLikeButtonType) => {
  if (!session) return

  await fetch('/api/like', {
    method,
    body: JSON.stringify({
      postingId: postingId,
      userId: session.user.id,
    }),
  })
}

export default function LikeButton({ className, postingId }: LikeButtonProps) {
  const { data: session } = useSession()

  const queryClient = useQueryClient()
  const { data, isPending, error } = useQuery({
    queryKey: ['isLiked', { postingId }],
    queryFn: () =>
      getData<{ isLiked: boolean }>(`/api/like?postingId=${postingId}`),
  })

  if (error) {
    toast.error(error.message)
  }

  const { mutate } = useMutation({
    mutationFn: () =>
      handleLikeButton({
        postingId,
        session,
        method: data?.isLiked ? 'DELETE' : 'POST',
      }),
    onSuccess: () => {
      if (!session) return
      queryClient.invalidateQueries({ queryKey: ['isLiked', { postingId }] })
      queryClient.invalidateQueries({ queryKey: ['likeCount', { postingId }] })
    },
  })

  return (
    <button
      className={`border px-1.5 py-1 rounded transition cursor-pointer hover:opacity-70 disabled:cursor-not-allowed
        ${className}`}
      onClick={() => mutate()}
      disabled={isPending}
    >
      {data?.isLiked ? (
        <AiFillHeart size={30} className="text-rose-500" />
      ) : (
        <AiOutlineHeart size={30} />
      )}
    </button>
  )
}
