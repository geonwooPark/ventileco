import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from '../common/ErrorMessage'

interface BookCategorySelectorProps {
  categoryRegister: UseFormRegisterReturn<'category'>
  errorMessage?: string
}

export const bookCategory = [
  { id: 1, category: '경제/경영' },
  { id: 2, category: '심리학' },
  { id: 3, category: 'IT/컴퓨터' },
  { id: 4, category: '예술/문화' },
  { id: 5, category: '생물학' },
  { id: 6, category: '화학' },
]

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
