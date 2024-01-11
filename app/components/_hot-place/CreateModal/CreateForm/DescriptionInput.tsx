import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

interface DescriptionInputProps {
  descriptionRegister: UseFormRegisterReturn<'description'>
  errorMessage?: string
}

export default function DescriptionInput({
  descriptionRegister,
  errorMessage,
}: DescriptionInputProps) {
  return (
    <div className="mb-2">
      <textarea
        {...descriptionRegister}
        placeholder="후기를 남겨보세요"
        className="h-[100px] w-full resize-none rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
