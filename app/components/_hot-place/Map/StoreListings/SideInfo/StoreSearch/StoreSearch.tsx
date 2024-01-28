import InputWithIcon from '@/components/common/Input/InputWithIcon'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import AutomaticSearch from './AutomaticSearch/AutomaticSearch'
import SearchHeader from './SearchHeader'
import { useKeywordChange } from '@/hooks/store/useHotPlaceFilterStore'

interface StoreSearchProps {
  searchKeyword: string
}

export default function StoreSearch({ searchKeyword }: StoreSearchProps) {
  const onKeywordChange = useKeywordChange()

  const [keyword, setKeyword] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setKeyword(value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!keyword) return

    onKeywordChange(keyword)
    setKeyword('')
  }

  const onReset = () => {
    onKeywordChange('')
  }

  const onClick = (store: string) => {
    onKeywordChange(store)
    setKeyword('')
  }

  return (
    <form onSubmit={onSubmit} className="relative mb-4">
      {searchKeyword ? (
        <SearchHeader onReset={onReset} />
      ) : (
        <InputWithIcon
          type="text"
          name="search"
          value={keyword}
          placeholder="맛집을 검색해보세요!"
          icon={AiOutlineSearch}
          onChange={onChange}
          iconType="submit"
          className="w-full"
        />
      )}

      <AutomaticSearch keyword={keyword} onClick={onClick} />
    </form>
  )
}
