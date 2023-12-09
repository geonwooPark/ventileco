'use client'

import React, { useState } from 'react'
import MyComment from './MyComment'
import MyCommentedPost from './MyCommentedPost'
import MyLikedPost from './MyLikedPost'

const menuArr = [
  {
    name: '작성 댓글',
    content: <MyComment />,
  },
  {
    name: '댓글단 글',
    content: <MyCommentedPost />,
  },
  {
    name: '좋아요한 글',
    content: <MyLikedPost />,
  },
]

export default function Tap() {
  const [currentTap, setCurrentTap] = useState(0)
  return (
    <div>
      <div className="flex gap-4 mb-4">
        {menuArr.map((menu, i) => {
          return (
            <button
              key={i}
              onClick={() => setCurrentTap(i)}
              className={
                currentTap === i
                  ? 'border-b-2 border-black'
                  : 'border-b-2 border-transparent text-gray-400'
              }
            >
              {menu.name}
            </button>
          )
        })}
      </div>
      <div className="relative pt-10">
        <div className="h-[500px] bg-gray-50 overflow-y-scroll">
          {menuArr[currentTap].content}
        </div>
      </div>
    </div>
  )
}
