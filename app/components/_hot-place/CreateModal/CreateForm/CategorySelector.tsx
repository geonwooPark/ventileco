import { StoreCategory } from '@/constants'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

interface CategorySelectorProps {
  categoryRegister: UseFormRegisterReturn<'category'>
  errorMessage?: string
}

export default function CategorySelector({
  categoryRegister,
  errorMessage,
}: CategorySelectorProps) {
  return (
    <div className="mb-2">
      <div className="mb-1 flex gap-2 text-sm">
        {StoreCategory.map((item) => (
          <label
            key={item.id}
            htmlFor={item.category}
            className={`cursor-pointer rounded-full border px-4 py-2 text-gray-400 has-[:checked]:bg-gray-700 has-[:checked]:text-white`}
          >
            {item.category}
            <input
              {...categoryRegister}
              type="radio"
              value={item.category}
              id={item.category}
              className="hidden"
            />
          </label>
        ))}
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
