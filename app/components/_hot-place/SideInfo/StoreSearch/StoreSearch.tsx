'use client'

import InputWithIcon from '@/components/common/Input/InputWithIcon'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import AutomaticSearch from './AutomaticSearch/AutomaticSearch'
import SearchHeader from './SearchHeader'
import { useSearchKeywordActions } from '@/hooks/store/useSearchKeywordStore'

export default function StoreSearch() {
  const { onChange: onSearchKeywordChange } = useSearchKeywordActions()

  const [keyword, setKeyword] = useState('')
  const [searchHeader, setSearchHeader] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setKeyword(value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!keyword) return

    onSearchKeywordChange(keyword)
    setKeyword('')
    setSearchHeader((prev) => !prev)
  }

  const onReset = () => {
    onSearchKeywordChange('all')
    setSearchHeader((prev) => !prev)
  }

  const onClick = (store: string) => {
    onSearchKeywordChange(store)
    setKeyword('')
    setSearchHeader((prev) => !prev)
  }

  return (
    <form onSubmit={onSubmit} className="relative mb-4">
      {searchHeader ? (
        <SearchHeader onReset={onReset} />
      ) : (
        <InputWithIcon
          type="text"
          name="search"
          value={keyword}
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
