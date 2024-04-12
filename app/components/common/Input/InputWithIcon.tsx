import React from 'react'

interface InputWithIconProps {
  type: 'text' | 'name' | 'email' | 'password'
  name: string
  value: string
  disabled?: boolean
  placeholder?: string
  className?: string
  icon: React.ReactNode
  iconAction?: () => void
  iconType?: 'button' | 'submit'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputWithIcon({
  className,
  icon,
  iconAction,
  iconType,
  ...props
}: InputWithIconProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        autoComplete="off"
        className={`w-full rounded bg-beige-light px-4 py-3 text-sm outline-none placeholder:text-beige-dark
          ${className}
        `}
      />
      <button
        type={iconType}
        onClick={iconAction}
        className="absolute right-3 top-3 size-5 cursor-pointer"
      >
        {icon}
      </button>
    </div>
  )
}
