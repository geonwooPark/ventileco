import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from '../../../common/ErrorMessage'

interface DescriptionInputProps {
  descriptionRegister: UseFormRegisterReturn<'description'>
  errorMessage?: string
}

export default function DescriptionInput({
  descriptionRegister,
  errorMessage,
}: DescriptionInputProps) {
  return (
    <div className="relative mb-2">
      <textarea
        {...descriptionRegister}
        placeholder=" "
        className={`hide-scroll peer h-[100px] w-full resize-none rounded-md bg-beige-light px-4 pb-2 pt-5 text-sm outline-none transition`}
      />
      <label
        className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-3.5 scale-75 text-sm text-beige-dark duration-150
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3.5
          peer-focus:scale-75
          peer-focus:text-beige-dark`}
      >
        방문후기
      </label>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
