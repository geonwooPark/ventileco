import React from 'react'

interface InputProps {
  type: 'text' | 'name' | 'email' | 'password'
  name: string
  value: string
  maxLength?: number
  disabled?: boolean
  placeholder?: string
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        autoComplete="off"
        className={`w-full rounded bg-beige-light px-4 py-3 text-sm outline-none placeholder:text-beige-dark
        ${className}
        `}
      />
    </div>
  )
}
