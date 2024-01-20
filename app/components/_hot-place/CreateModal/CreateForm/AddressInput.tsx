import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import InputWithLabel from '@/components/common/Input/InputWithLabel'

interface AddressInputProps {
  addressRegister: UseFormRegisterReturn<'address'>
  errorMessage?: string
  setShowAddressResearch: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddressInput({
  addressRegister,
  errorMessage,
  setShowAddressResearch,
}: AddressInputProps) {
  return (
    <div className="mb-2 w-full">
      <InputWithLabel
        register={addressRegister}
        label="주소"
        type="text"
        className="mb-1"
        onClick={() => {
          setShowAddressResearch((prev) => !prev)
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
