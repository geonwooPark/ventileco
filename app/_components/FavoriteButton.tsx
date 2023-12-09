'use client'

import React, { useEffect } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'
import getData from '../_actions/getData'
import { toast } from 'react-toastify'

interface FavoriteButtonProps {
  className?: string
  postingId: string
}

interface handleFavoriteButtonType {
  postingId: string
  session: Session | null
  method: 'POST' | 'DELETE'
}

const handleFavoriteButton = async ({
  postingId,
  session,
  method,
}: handleFavoriteButtonType) => {
  if (!session) return

  await fetch('/api/favorite', {
    method,
    body: JSON.stringify({
      postingId: postingId,
      userId: session.user.id,
    }),
  })
}

export default function FavoriteButton({
  className,
  postingId,
}: FavoriteButtonProps) {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { data, isPending, error } = useQuery({
    queryKey: ['isFav', { postingId }],
    queryFn: () =>
      getData<{ isFav: boolean }>(`/api/favorite?postingId=${postingId}`),
  })

  if (error) {
    toast.error(error.message)
  }

  const { mutate } = useMutation({
    mutationFn: () =>
      handleFavoriteButton({
        postingId,
        session,
        method: data?.isFav ? 'DELETE' : 'POST',
      }),
    onSuccess: () => {
      if (!session) return
      queryClient.invalidateQueries({ queryKey: ['isFav', { postingId }] })
      queryClient.invalidateQueries({ queryKey: ['favCount', { postingId }] })
    },
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['isFav', { postingId }] })
  }, [session])

  return (
    <button
      className={`border px-1.5 py-1 rounded transition cursor-pointer hover:opacity-70 disabled:cursor-not-allowed
        ${className}`}
      onClick={() => mutate()}
      disabled={isPending}
    >
      {data?.isFav ? (
        <AiFillHeart size={30} className="text-rose-500" />
      ) : (
        <AiOutlineHeart size={30} />
      )}
    </button>
  )
}
