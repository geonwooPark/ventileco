import getData from '@/app/actions/getData'
import { LikeType } from '@/app/interfaces/interface'
import { useQuery } from '@tanstack/react-query'
import dayjs from '@/app/utils/dayjs'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Spinner from '../../../common/Spinner'

export default function MyLikedPost() {
  const { data: session } = useSession()

  const { data: myLikedPost, isPending } = useQuery({
    queryKey: ['my-liked-post', { user: session?.user.id }],
    queryFn: () =>
      getData<LikeType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/my-liked-post?userId=${session?.user.id}`,
      ),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 5, // 5분
  })

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner width="w-6" height="w-6" fillColor="fill-blue-600" />
      </div>
    )
  }

  return (
    <table className="w-full">
      <thead className="absolute top-0 w-full border-b border-gray-400">
        <tr className="w-full flex bg-white text-center">
          <th className="flex-1 py-2">제목</th>
          <th className="py-2 w-[100px]">좋아요 수</th>
          <th className="py-2 w-[100px]">작성일</th>
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
            <td className="w-[100px] text-sm text-center">{posting.count}</td>
            <td className="w-[100px] text-sm text-center">
              {dayjs(posting.createdAt).tz().format('YYYY-MM-DD')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
