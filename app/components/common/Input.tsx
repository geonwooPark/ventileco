import React from 'react'
import { IconType } from 'react-icons'

interface InputProps {
  type: 'text' | 'name' | 'email' | 'password'
  name: string
  value: string
  maxLength?: number
  disabled?: boolean
  placeholder?: string
  className?: string
  icon?: IconType
  iconAction?: () => void
  iconType?: 'button' | 'submit'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  className,
  icon: Icon,
  iconAction,
  iconType,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        autoComplete="off"
        className={`rounded border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black
        ${className}
        `}
      />
      {Icon && (
        <button
          type={iconType}
          onClick={iconAction}
          className="absolute right-3 top-3 cursor-pointer"
        >
          <Icon size={20} />
        </button>
      )}
    </div>
  )
}
