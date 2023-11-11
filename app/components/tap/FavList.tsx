'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface Favorite {
  _id: string
  postingId: string
  userId: string[]
  title: string
  createdAt: Date
  updatedAt: Date
}

export default function CommentList() {
  const [favoriteArr, setFavoriteArr] = useState<Favorite[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('/api/favoriteList', { method: 'GET' })
          .then((res) => res.json())
          .then((result) => {
            setFavoriteArr(result)
          })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    }
    fetchData()
  }, [])

  return (
    <table className="w-full">
      <thead>
        <tr className="text-center border-b border-gray-400">
          <th>좋아요</th>
          <th className="w-[100px]">작성일</th>
        </tr>
      </thead>
      <tbody>
        {favoriteArr.map((favoriteItem) => (
          <tr key={favoriteItem._id} className="border-b">
            <td className="px-2 py-3">
              <Link href={`/detail/${favoriteItem.postingId}`}>
                <p className="text-sm">{favoriteItem.title}</p>
              </Link>
            </td>
            <td className="text-sm text-center">
              {dayjs(favoriteItem.createdAt).format('YYYY-MM-DD')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
