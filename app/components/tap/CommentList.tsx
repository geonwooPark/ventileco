import getData from '@/app/actions/getData'
import { CommentType } from '@/app/interfaces/interface'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'

export default async function CommentList() {
  const commentList: CommentType[] = await getData(
    'http://localhost:3000/api/commentList',
  )

  return (
    <table className="w-full">
      <thead>
        <tr className="text-center border-b border-gray-400">
          <th>댓글</th>
          <th className="w-[100px]">작성일</th>
        </tr>
      </thead>
      <tbody>
        {commentList.map((commentItem) => {
          return (
            <tr key={commentItem._id} className="border-b">
              <td className="px-2 py-3">
                <Link href={`/detail/${commentItem.postingId}`}>
                  <p className="mb-2">{commentItem.title}</p>
                  {commentItem.user
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
                  {commentItem.user.length > 3 && (
                    <div className="w-full text-gray-400">
                      <PiDotsThreeVerticalBold className="mx-auto" />
                    </div>
                  )}
                </Link>
              </td>
              <td className="text-sm text-center">
                {dayjs(commentItem.createdAt).format('YYYY-MM-DD')}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
