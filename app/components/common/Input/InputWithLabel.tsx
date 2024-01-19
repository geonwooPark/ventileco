import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputWithLabelProps {
  label: string
  type: 'text' | 'name' | 'email' | 'password'
  register?: UseFormRegisterReturn<
    'email' | 'name' | 'password' | 'confirmedPassword'
  >
  className?: string
  error?: string
}

export default function InputWithLabel({
  label,
  type,
  register,
  className,
  error,
}: InputWithLabelProps) {
  return (
    <div className="relative w-full">
      <input
        {...register}
        type={type}
        placeholder=" "
        autoComplete="off"
        className={`peer w-full rounded-md border bg-white px-4 pb-2 pt-5 text-sm outline-none transition
      ${className} ${error}
    `}
      />
      <label
        className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-3.5 scale-75 text-sm text-gray-400 duration-150
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3.5
          peer-focus:scale-75
          peer-focus:text-gray-400`}
      >
        {label}
      </label>
    </div>
  )
}
