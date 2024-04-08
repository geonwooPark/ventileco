import dayjs from '@/lib/dayjs'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Spinner from '../../../common/Spinner'
import useMyCommentedPostQuery from '@/hooks/query/useMyCommentedPostQuery'

export default function MyCommentedPost() {
  const { data: session } = useSession()
  const { myCommentedPost, isPending } = useMyCommentedPostQuery(session)

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner width="w-6" height="w-6" />
      </div>
    )
  }

  return (
    <table className="w-full">
      <thead className="absolute top-0 w-full overflow-hidden rounded-t-md bg-brown-normal text-beige-light">
        <tr className="flex w-full text-center">
          <th className="flex-1 py-2">제목</th>
          <th className="w-[100px] py-2">댓글 수</th>
          <th className="w-[100px] py-2">작성일</th>
        </tr>
      </thead>
      <tbody>
        {myCommentedPost?.map((posting) => (
          <tr
            key={posting._id}
            className="flex items-center border-b border-brown-dark"
          >
            <td className="flex-1 px-4 py-3">
              <Link href={`/blog/detail/${posting.postingId}`} target="_blank">
                <p>{posting.title}</p>
              </Link>
            </td>
            <td className="w-[100px] text-center text-sm">
              {posting.user.length}
            </td>
            <td className="w-[100px] text-center text-sm">
              {dayjs(posting.createdAt).tz().format('YYYY-MM-DD')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
