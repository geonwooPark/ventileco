'use client'

import { CommentType } from '@/app/actions/getComments'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { toast } from 'react-toastify'

export default function CommentList() {
  const [commentArr, setCommentArr] = useState<CommentType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('/api/comment', { method: 'GET' })
          .then((res) => res.json())
          .then((result) => {
            setCommentArr(result)
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
          <th>댓글</th>
          <th className="w-[100px]">작성일</th>
        </tr>
      </thead>
      <tbody>
        {commentArr.map((doc) => {
          return (
            <tr key={doc._id} className="border-b">
              <td className="px-2 py-3">
                <Link href={`/detail/${doc.postingId}`}>
                  <p className="mb-2">{doc.title}</p>
                  {doc.user
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
                  {doc.user.length > 3 && (
                    <div className="w-full text-gray-400">
                      <PiDotsThreeVerticalBold className="mx-auto" />
                    </div>
                  )}
                </Link>
              </td>
              <td className="text-sm text-center">
                {dayjs(doc.createdAt).format('YYYY-MM-DD')}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
