import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from '../../common/ErrorMessage'
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
      <div className="hide-scroll mb-1 flex justify-center gap-2 overflow-y-hidden overflow-x-scroll text-sm text-gray-700">
        {bookCategory.map((item) => (
          <label
            key={item.id}
            htmlFor={item.category}
            className={`shrink-0 cursor-pointer rounded-full bg-beige-light px-3 py-2 text-brown-dark transition duration-200 has-[:checked]:text-active`}
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
