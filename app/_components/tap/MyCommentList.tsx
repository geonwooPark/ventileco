import getData from '@/app/_actions/getData'
import { CommentType } from '@/app/_interfaces/interface'
import dayjs from 'dayjs'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'

interface MyCommentListProps {
  session: Session | null
}

export default async function MyCommentList({ session }: MyCommentListProps) {
  const myCommentList = await getData<CommentType[]>(
    `${process.env.NEXT_PUBLIC_FE_URL}/api/my-comment?userId=${session?.user.id}`,
  )

  return (
    <table className="w-full">
      <thead className="absolute top-0 w-full border-b border-gray-400">
        <tr className="w-full flex bg-white text-center">
          <th className="flex-1 py-2">제목</th>
          <th className="py-2 w-[100px]">작성일</th>
        </tr>
      </thead>
      <tbody>
        {myCommentList?.map((MyCommentItem) => {
          return (
            <tr key={MyCommentItem._id} className="flex items-center border-b">
              <td className="flex-1 px-4 py-3">
                <Link
                  href={`/detail/${MyCommentItem.postingId}`}
                  target="_blank"
                >
                  <p className="mb-2">{MyCommentItem.title}</p>
                  {/* <MyComment /> */}
                  {/* {MyCommentItem.user
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                    )
                    .slice(0, 3)
                    .map((comment) => (
                      <p
                        key={comment.commentId}
                        className="text-sm text-gray-400 px-2 mb-1"
                      >
                        {comment.text.length > 40
                          ? comment.text.slice(0, 40) + '...'
                          : comment.text}
                      </p>
                    ))}
                  {MyCommentItem.user.length > 3 && (
                    <div className="w-full text-gray-400">
                      <PiDotsThreeVerticalBold className="mx-auto" />
                    </div>
                  )} */}
                </Link>
              </td>
              <td className="w-[100px] text-sm text-center">
                {dayjs(MyCommentItem.createdAt).format('YYYY-MM-DD')}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
