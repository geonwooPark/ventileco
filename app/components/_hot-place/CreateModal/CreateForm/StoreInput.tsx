import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import InputWithLabel from '@/components/common/Input/InputWithLabel'

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
      <InputWithLabel
        register={storeRegister}
        label="스토어명"
        type="text"
        className="mb-1"
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
