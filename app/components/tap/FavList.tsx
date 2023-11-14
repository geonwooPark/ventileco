import getMyFavList from '@/app/actions/getMyFavList'
import { FavoriteType } from '@/app/interfaces/interface'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'

export default async function CommentList() {
  const favoriteList: FavoriteType[] = await getMyFavList()
  return (
    <table className="w-full">
      <thead>
        <tr className="text-center border-b border-gray-400">
          <th>좋아요</th>
          <th className="w-[100px]">작성일</th>
        </tr>
      </thead>
      <tbody>
        {favoriteList.map((favoriteItem) => (
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
