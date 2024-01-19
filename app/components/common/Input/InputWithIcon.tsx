import React from 'react'
import { IconType } from 'react-icons'

interface InputWithIconProps {
  type: 'text' | 'name' | 'email' | 'password'
  name: string
  value: string
  disabled?: boolean
  placeholder?: string
  className?: string
  icon: IconType
  iconAction?: () => void
  iconType?: 'button' | 'submit'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputWithIcon({
  className,
  icon: Icon,
  iconAction,
  iconType,
  ...props
}: InputWithIconProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        autoComplete="off"
        className={`rounded border border-gray-300 bg-white px-4 py-3 text-sm outline-none
          ${className}
        `}
      />
      <button
        type={iconType}
        onClick={iconAction}
        className="absolute right-3 top-3 cursor-pointer"
      >
        <Icon size={20} />
      </button>
    </div>
  )
}
