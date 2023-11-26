import { FavoriteType } from '@/app/_interfaces/interface'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import EmptyState from '../common/EmptyState'

export default function MyFavList() {
  const [myFavoriteList, setMyFavoriteList] = useState<FavoriteType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`/api/myfavorite`, { method: 'GET' })
          .then((res) => res.json())
          .then((result) => {
            if (!result.error) {
              setMyFavoriteList(result)
            } else {
              throw new Error(result.error)
            }
          })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <EmptyState label="좋아요 목록을 가져오고 있어요!" />
  }

  return (
    <table className="w-full">
      <thead className="absolute top-0 w-full border-b border-gray-400">
        <tr className="w-full flex bg-white text-center">
          <th className="flex-1 py-2">좋아요</th>
          <th className="py-2 w-[100px]">작성일</th>
        </tr>
      </thead>
      <tbody>
        {myFavoriteList.map((myFavoriteItem) => (
          <tr key={myFavoriteItem._id} className="flex items-center border-b">
            <td className="flex-1 px-4 py-3">
              <Link href={`/detail/${myFavoriteItem.postingId}`}>
                <p className="text-sm">{myFavoriteItem.title}</p>
              </Link>
            </td>
            <td className="w-[100px] text-sm text-center">
              {dayjs(myFavoriteItem.createdAt).format('YYYY-MM-DD')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
