import dayjs from '@/lib/dayjs'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Spinner from '../../../common/Spinner'
import useMyCommentQuery from '@/hooks/query/useMyCommentQuery'

export default function MyComment() {
  const { data: session } = useSession()
  const { myComment, isPending } = useMyCommentQuery(session)

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner width="w-6" height="w-6" fillColor="fill-blue-600" />
      </div>
    )
  }

  return (
    <table className="w-full">
      <thead className="absolute top-0 w-full overflow-hidden rounded-t-md bg-brown-normal text-beige-light">
        <tr className="flex w-full text-center">
          <th className="flex-1 py-2">댓글</th>
          <th className="w-[100px] py-2">댓글 작성일</th>
        </tr>
      </thead>
      <tbody>
        {myComment
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((comment) => (
            <tr
              key={comment.commentId}
              className="flex items-center border-b border-brown-dark"
            >
              <td className="flex-1 px-4 py-3 text-brown-dark">
                <Link
                  href={`/blog/detail/${comment.postingId}`}
                  target="_blank"
                >
                  <p className="mb-2">{comment.text}</p>
                  <p className="ml-2 text-beige-dark">{comment.title}</p>
                </Link>
              </td>
              <td className="w-[100px] text-center text-sm text-beige-dark">
                {dayjs(comment.createdAt).tz().format('YYYY-MM-DD')}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
