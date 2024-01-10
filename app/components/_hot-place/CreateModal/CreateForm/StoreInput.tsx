import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

interface StoreInputProps {
  storeRegister: UseFormRegisterReturn<'store'>
  errorMessage?: string
}

export default function StoreInput({
  storeRegister,
  errorMessage,
}: StoreInputProps) {
  return (
    <div className="mb-2 w-full">
      <input
        {...storeRegister}
        placeholder="점포명을 입력해주세요"
        autoComplete="off"
        className="mb-1 w-full rounded border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-black"
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
