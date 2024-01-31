import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from '../common/ErrorMessage'
import { bookCategory } from '@/constants'

interface BookCategorySelectorProps {
  categoryRegister: UseFormRegisterReturn<'category'>
  errorMessage?: string
}

export default function BookCategorySelector({
  categoryRegister,
  errorMessage,
}: BookCategorySelectorProps) {
  return (
    <div className="mb-2">
      <div className="mb-1 flex gap-2 text-sm text-gray-700">
        {bookCategory.map((item) => (
          <label
            key={item.id}
            htmlFor={item.category}
            className={`cursor-pointer rounded-full border px-3 py-2 text-gray-400 transition duration-200 has-[:checked]:border-transparent has-[:checked]:bg-blue-600 has-[:checked]:text-white`}
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
