'use client'

import React, { Suspense, useState } from 'react'
import FavList from './FavList'
import CommentList from './CommentList'

const menuArr = [
  {
    name: '댓글',
    content: <CommentList />,
  },
  {
    name: '좋아요',
    content: <FavList />,
  },
]

export default function Tap() {
  const [currentTap, setCurrentTap] = useState(0)
  return (
    <div>
      <div className="flex gap-2 mb-4">
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
      <Suspense fallback={<div>로딩중...</div>}>
        <div>{menuArr[currentTap].content}</div>
      </Suspense>
    </div>
  )
}
