import React from 'react'

interface StoreHashtagsProps {
  hashtags: string[] | null
}

export default function StoreHashtags({ hashtags }: StoreHashtagsProps) {
  return (
    <ul className={`flex gap-2 overflow-x-scroll`}>
      {hashtags?.map((tag, i: number) => (
        <li
          key={i}
          className="shrink-0 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-blue-400"
        >
          #{tag}
        </li>
      ))}
    </ul>
  )
}
