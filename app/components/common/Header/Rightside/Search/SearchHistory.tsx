import React from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'

interface SearchHistoryProps {
  keywords: string[]
  onKeywordDelete: (keyword: string) => void
  setText: React.Dispatch<React.SetStateAction<string>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchHistory({
  keywords,
  onKeywordDelete,
  setText,
  setIsOpen,
}: SearchHistoryProps) {
  const router = useRouter()

  const onClick = (keyword: string) => {
    router.push(`/blog/search?search=${keyword}`)
    setText('')
    setIsOpen(false)
  }

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    keyword: string,
  ) => {
    e.stopPropagation()
    onKeywordDelete(keyword)
  }

  return (
    <div className="absolute mt-4 flex flex-wrap gap-3 text-sm text-white">
      {keywords.map((keyword, i) => (
        <div
          key={i}
          onClick={() => onClick(keyword)}
          className="flex cursor-pointer items-center rounded-full border border-white px-4 py-2 "
        >
          <div className="mr-2 hover:opacity-70">{keyword}</div>
          <button onClick={(e) => onDelete(e, keyword)}>
            <AiOutlineClose className="text-red-500" />
          </button>
        </div>
      ))}
    </div>
  )
}
