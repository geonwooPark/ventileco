'use client'

import React, { useState } from 'react'
import MyComment from './ActionLogTabContent/MyComment'
import MyCommentedPost from './ActionLogTabContent/MyCommentedPost'
import MyLikedPost from './ActionLogTabContent/MyLikedPost'

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

export default function ActionLogTab() {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <div>
      <div className="mb-4 flex gap-4">
        {menuArr.map((menu, i) => {
          return (
            <button
              key={i}
              onClick={() => setCurrentTab(i)}
              className={
                currentTab === i
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
        <div className="h-[500px] overflow-y-scroll bg-gray-50">
          {menuArr[currentTab].content}
        </div>
      </div>
    </div>
  )
}
