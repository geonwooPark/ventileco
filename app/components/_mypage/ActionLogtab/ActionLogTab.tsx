'use client'

import React, { useState } from 'react'
import MyComment from './ActionLogTabContent/MyComment'
import MyCommentedPost from './ActionLogTabContent/MyCommentedPost'
import MyLikedPost from './ActionLogTabContent/MyLikedPost'

const menuArr = [
  {
    _id: 1,
    name: '작성 댓글',
    content: <MyComment />,
  },
  {
    _id: 2,
    name: '댓글단 글',
    content: <MyCommentedPost />,
  },
  {
    _id: 3,
    name: '좋아요한 글',
    content: <MyLikedPost />,
  },
]

export default function ActionLogTab() {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <div>
      <div className="mb-4 flex gap-4">
        {menuArr.map((menu, i) => (
          <button
            key={menu._id}
            onClick={() => setCurrentTab(i)}
            className={`border-b-2 text-beige-light ${
              currentTab === i ? 'border-beige-light' : 'border-transparent'
            } `}
          >
            {menu.name}
          </button>
        ))}
      </div>
      <div className="relative pt-10">
        <div className="hide-scroll h-[500px] overflow-y-scroll rounded-b-md bg-beige-light">
          {menuArr[currentTab].content}
        </div>
      </div>
    </div>
  )
}
