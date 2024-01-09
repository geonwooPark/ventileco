import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

interface AddressInputProps {
  addressRegister: UseFormRegisterReturn<'address'>
  errorMessage?: string
  setShowAddressResearch: React.Dispatch<React.SetStateAction<boolean>>
  address: string
}

export default function AddressInput({
  addressRegister,
  errorMessage,
  setShowAddressResearch,
  address,
}: AddressInputProps) {
  return (
    <div className="mb-2 w-full">
      <input
        {...addressRegister}
        placeholder="주소를 입력해주세요"
        autoComplete="off"
        className="mb-1 w-full rounded border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-black"
        onClick={() => {
          setShowAddressResearch((prev) => !prev)
        }}
      />
      {!address && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  )
}
