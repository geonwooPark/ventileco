import { FavoriteType } from '@/app/_interfaces/interface'
import dayjs from 'dayjs'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'

const fetchData = async (userId: string | undefined) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_FE_URL}/api/my-favorite?userId=${userId}`,
  )
  return result.json()
}

interface MyFavListProps {
  session: Session | null
}

export default async function MyFavList({ session }: MyFavListProps) {
  const myFavoriteList: FavoriteType[] = await fetchData(session?.user.id)

  return (
    <table className="w-full">
      <thead className="absolute top-0 w-full border-b border-gray-400">
        <tr className="w-full flex bg-white text-center">
          <th className="flex-1 py-2">좋아요</th>
          <th className="py-2 w-[100px]">작성일</th>
        </tr>
      </thead>
      <tbody>
        {myFavoriteList?.map((myFavoriteItem) => (
          <tr key={myFavoriteItem._id} className="flex items-center border-b">
            <td className="flex-1 px-4 py-3">
              <Link
                href={`/detail/${myFavoriteItem.postingId}`}
                target="_blank"
              >
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
