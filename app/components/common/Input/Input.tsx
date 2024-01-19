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
        className={`rounded border border-gray-300 bg-white px-4 py-3 text-sm outline-none
        ${className}
        `}
      />
    </div>
  )
}
