'use client'

import React, { useEffect, useState } from 'react'
import DropDownItem from './DropDownItem'

interface DropDownMenuProps {
  categories: string[]
  category: string
  label: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function DropDownMenu({
  categories,
  category,
  label,
  setCategory,
}: DropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [animation, setAnimation] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isOpen) {
      setAnimation(true)
    } else {
      timer = setTimeout(() => {
        setAnimation(false)
      }, 300)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <div className="relative text-white text-xs">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-[140px] bg-gray-700 text-center p-2 cursor-pointer"
      >
        {category ? category : label}
      </div>
      <div className="w-full absolute z-20 overflow-hidden">
        <div
          className={`${
            isOpen ? 'animate-slideFadeIn' : 'animate-slideFadeOut'
          }`}
        >
          {animation && (
            <ul>
              {categories.map((category, i) => {
                return (
                  <DropDownItem
                    key={i}
                    category={category}
                    setIsOpen={setIsOpen}
                    setCategory={setCategory}
                  />
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
