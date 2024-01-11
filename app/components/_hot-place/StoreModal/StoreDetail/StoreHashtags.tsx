import React from 'react'

interface StoreHashtagsProps {
  hashtags: string[] | null
}

export default function StoreHashtags({ hashtags }: StoreHashtagsProps) {
  return (
    <ul className={`flex shrink-0 gap-2`}>
      {hashtags?.map((tag, i: number) => (
        <li
          key={i}
          className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-blue-400"
        >
          #{tag}
        </li>
      ))}
    </ul>
  )
}
