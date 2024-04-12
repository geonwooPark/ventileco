import React from 'react'
import { useRouter } from 'next/navigation'
import { IconClose } from '../../../../../../public/svgs/icons'

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
    <div className="mt-4 flex flex-wrap gap-3 text-sm text-beige-normal">
      {keywords?.map((keyword, i) => (
        <div
          key={i}
          onClick={() => onClick(keyword)}
          className="flex cursor-pointer items-center rounded-full border border-beige-normal px-4 py-2 "
        >
          <div className="mr-2 hover:opacity-70">{keyword}</div>
          <button onClick={(e) => onDelete(e, keyword)} className="size-4">
            <IconClose className="text-red-600" />
          </button>
        </div>
      ))}
    </div>
  )
}
