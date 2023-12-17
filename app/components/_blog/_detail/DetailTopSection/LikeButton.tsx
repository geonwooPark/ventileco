'use client'

import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { toast } from 'react-toastify'
import useIsLikedQuery from '@/app/hooks/query/useIsLikedQuery'

interface LikeButtonProps {
  className?: string
  postingId: string
}

const handleLikeButton = async (
  postingId: string,
  session: Session | null,
  method: 'POST' | 'DELETE',
) => {
  if (!session) return

  await fetch('/api/like', {
    method,
    body: JSON.stringify({
      postingId: postingId,
      userId: session.user.id,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function LikeButton({ className, postingId }: LikeButtonProps) {
  const { data: session } = useSession()
  const { data, isPending, error } = useIsLikedQuery(postingId)
  const queryClient = useQueryClient()

  const { mutate: handleLikeMutation } = useMutation({
    mutationFn: () =>
      handleLikeButton(postingId, session, data?.isLiked ? 'DELETE' : 'POST'),
    onSuccess: () => {
      if (!session) return
      queryClient.invalidateQueries({ queryKey: ['isLiked', { postingId }] })
      queryClient.invalidateQueries({ queryKey: ['likeCount', { postingId }] })
      queryClient.invalidateQueries({
        queryKey: ['my-liked-post', { user: session.user.id }],
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  if (error) {
    toast.error(error.message)
  }

  return (
    <button
      className={`cursor-pointer rounded border px-1.5 py-1 transition hover:opacity-70 disabled:cursor-not-allowed
        ${className}`}
      onClick={() => handleLikeMutation()}
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
