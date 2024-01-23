import React, { useState } from 'react'
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import InputWithLabel from '@/components/common/Input/InputWithLabel'
import { HotPlaceFormDataType } from '@/interfaces/interface'
import FindAddressByStoreName from './FindAddressByStoreName'

interface StoreInputProps {
  storeRegister: UseFormRegisterReturn<'store'>
  setValue: UseFormSetValue<HotPlaceFormDataType>
  errorMessage?: string
}

export default function StoreInput({
  storeRegister,
  setValue,
  errorMessage,
}: StoreInputProps) {
  const [keyword, setKeyword] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setKeyword(value)
  }

  return (
    <div className="relative mb-2 w-full">
      <InputWithLabel
        register={storeRegister}
        label="스토어명"
        type="text"
        onChange={onChange}
        className="mb-1"
      />
      <FindAddressByStoreName setValue={setValue} keyword={keyword} />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
