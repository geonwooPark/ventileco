import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputWithLabelProps {
  label: string
  type: 'text' | 'name' | 'email' | 'password'
  register?: UseFormRegisterReturn<
    | 'email'
    | 'name'
    | 'password'
    | 'confirmedPassword'
    | 'store'
    | 'address'
    | 'title'
  >
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
}

export default function InputWithLabel({
  label,
  type,
  register,
  className,
  onChange,
  onClick,
}: InputWithLabelProps) {
  return (
    <div className="relative w-full">
      <input
        {...register}
        type={type}
        placeholder=" "
        autoComplete="off"
        onChange={onChange}
        onClick={onClick}
        className={`peer w-full rounded bg-beige-light px-4 pb-2 pt-5 text-sm outline-none transition placeholder:text-beige-dark
      ${className}
    `}
      />
      <label
        className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-3.5 scale-75 text-sm text-beige-dark duration-150
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3.5
          peer-focus:scale-75
          peer-focus:text-beige-dark`}
      >
        {label}
      </label>
    </div>
  )
}
