import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface DescriptionInputProps {
  descriptionRegister: UseFormRegisterReturn<'description'>
}

export default function DescriptionInput({
  descriptionRegister,
}: DescriptionInputProps) {
  return (
    <textarea
      {...descriptionRegister}
      placeholder="후기를 남겨보세요"
      className="mb-2 h-[100px] w-full resize-none rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
    />
  )
}
