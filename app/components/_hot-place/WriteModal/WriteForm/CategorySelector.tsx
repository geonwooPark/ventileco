import { StoreCategory } from '@/constants'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from '../../../common/ErrorMessage'

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
      <div className="hide-scroll mb-1 flex gap-2 overflow-y-hidden overflow-x-scroll text-sm">
        {StoreCategory.map((item) => (
          <label
            key={item.id}
            htmlFor={item.category}
            className={`shrink-0 cursor-pointer rounded-md bg-beige-light px-2.5 py-2 text-brown-dark has-[:checked]:text-active`}
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
