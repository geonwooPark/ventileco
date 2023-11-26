'use client'

import React, { useState } from 'react'
import MyCommentList from './MyCommentList'
import MyFavList from './MyFavList'

const menuArr = [
  {
    name: '댓글',
    content: <MyCommentList />,
  },
  {
    name: '좋아요',
    content: <MyFavList />,
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
      <div className="relative pt-10">
        <div className="h-[500px] bg-gray-50 overflow-y-scroll">
          {menuArr[currentTap].content}
        </div>
      </div>
    </div>
  )
}
