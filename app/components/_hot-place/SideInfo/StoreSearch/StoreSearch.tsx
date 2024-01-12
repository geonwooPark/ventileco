'use client'

import InputWithIcon from '@/components/common/Input/InputWithIcon'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export default function StoreSearch() {
  const [keyword, setKeyword] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setKeyword(value)
  }

  return (
    <InputWithIcon
      type="text"
      name="search"
      value={keyword}
      icon={AiOutlineSearch}
      onChange={onChange}
      className="mb-4 w-full"
    />
  )
}
