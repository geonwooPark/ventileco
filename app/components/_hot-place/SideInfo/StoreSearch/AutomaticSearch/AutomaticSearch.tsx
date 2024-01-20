import { HotPlaceListingType } from '@/interfaces/interface'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AutomaticSearchList from './AutomaticSearchList'

interface AutomaticSearchProps {
  keyword: string
  onClick: (store: string) => void
}

export default function AutomaticSearch({
  keyword,
  onClick,
}: AutomaticSearchProps) {
  const [automaticSearchList, setAutomaticSearchList] = useState<
    HotPlaceListingType[]
  >([])

  useEffect(() => {
    if (!keyword) return

    const getAutomaticSearchList = async () => {
      try {
        await fetch(`/api/automatic-search?keyword=${keyword}`)
          .then((res) => res.json())
          .then((result) => {
            setAutomaticSearchList(result)
          })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    }

    const timer = setTimeout(() => getAutomaticSearchList(), 300)

    return () => clearTimeout(timer)
  }, [keyword])

  return (
    keyword &&
    automaticSearchList.length > 0 && (
      <div className="absolute z-10 w-full border bg-white">
        <p className="px-3 py-1 text-xs text-gray-400">추천 검색어</p>
        <AutomaticSearchList
          automaticSearchList={automaticSearchList}
          onClick={onClick}
        />
      </div>
    )
  )
}
