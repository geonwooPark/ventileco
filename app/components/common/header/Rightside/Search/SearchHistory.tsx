import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface SearchHistoryProps {
  keywords: string[]
  onKeywordDelete: (keyword: string) => void
}

export default function SearchHistory({
  keywords,
  onKeywordDelete,
}: SearchHistoryProps) {
  return (
    <div className="absolute mt-4 flex flex-wrap gap-3 text-sm text-white">
      {keywords.map((keyword, i) => (
        <div
          key={i}
          className="flex items-center rounded-full border border-gray-600 px-4 py-2"
        >
          <div className="mr-2">{keyword}</div>
          <button onClick={() => onKeywordDelete(keyword)}>
            <AiOutlineClose className="text-red-500" />
          </button>
        </div>
      ))}
    </div>
  )
}
