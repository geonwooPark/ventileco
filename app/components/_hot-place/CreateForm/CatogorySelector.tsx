import { StoreCategory } from '@/constants'
import React from 'react'

export default function CatogorySelector() {
  return (
    <div className="mb-4 flex gap-2 text-sm">
      {StoreCategory.map((item) => (
        <label
          key={item.id}
          htmlFor={item.category}
          className={`cursor-pointer rounded-full border px-4 py-2 text-gray-400 has-[:checked]:bg-gray-700 has-[:checked]:text-white`}
        >
          {item.category}
          <input
            type="radio"
            name="categoryGroup"
            id={item.category}
            className="hidden"
          ></input>
        </label>
      ))}
    </div>
  )
}
