import dayjs from '@/app/utils/dayjs'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Spinner from '../../../common/Spinner'
import useMyLikedPostQuery from '@/app/hooks/query/useMyLikedPostQuery'

export default function MyLikedPost() {
  const { data: session } = useSession()
  const { myLikedPost, isPending } = useMyLikedPostQuery(session)

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner width="w-6" height="w-6" fillColor="fill-blue-600" />
      </div>
    )
  }

  return (
    <table className="w-full">
      <thead className="absolute top-0 w-full border-b border-gray-400">
        <tr className="flex w-full bg-white text-center">
          <th className="flex-1 py-2">제목</th>
          <th className="w-[100px] py-2">좋아요 수</th>
          <th className="w-[100px] py-2">작성일</th>
        </tr>
      </thead>
      <tbody>
        {myLikedPost?.map((posting) => (
          <tr key={posting._id} className="flex items-center border-b">
            <td className="flex-1 px-4 py-3">
              <Link href={`/blog/detail/${posting.postingId}`} target="_blank">
                <p>{posting.title}</p>
              </Link>
            </td>
            <td className="w-[100px] text-center text-sm">{posting.count}</td>
            <td className="w-[100px] text-center text-sm">
              {dayjs(posting.createdAt).tz().format('YYYY-MM-DD')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
